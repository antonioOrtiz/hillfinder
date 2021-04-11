import React, { useState, useEffect, useRef, useContext } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

import L from 'leaflet';
import * as ELG from 'esri-leaflet-geocoder';

import Control from 'react-leaflet-control';
// import MapboxLayer from '../MapboxLayer/MapboxLayer.jsx';
import Routing from '../RoutingMachine/RoutingMachine.jsx';
import LocateControl from '../LocateControl/LocateControl.jsx';
import { stringify } from 'flatted';
import * as ReactLeaflet from 'react-leaflet';

import { userState, userDispatch } from '../Context/UserContext.jsx';
import UIContext from '../Context/UIContext.jsx';

function MyMap({ currentMapZoom, currentMapCenter }) {
  var [animate, setAnimate] = useState(false);
  var [userLocation, setUserLocation] = useState(null);

  const [map, setMap] = useState({});

  var mapRef = useRef();

  var handleWaypointsOnMapRef = useRef(handleWaypointsOnMap);
  var mapRefForRoutingMachine = useRef();
  var { isMobile, isDesktop } = useContext(UIContext);
  var { state } = userState();
  var { dispatch } = userDispatch();
  var {
    isRoutingVisible,
    removeRoutingMachine,
    isLengthOfMarkersLessThanTwo,
    markers
  } = state;

  var [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    console.log('isMobile isDesktop ', isMobile, isDesktop);
    if (mapRef != null) {
      if (map.getCenter) {
        if (isMobile) {
          dispatch({
            type: 'setCurrentMapCenter',
            payload: {
              currentMapCenter: map.getCenter()
            }
          });
          dispatch({
            type: 'setMapZoom',
            payload: {
              currentMapZoom: map.getZoom()
            }
          });
        }
        if (isDesktop) {
          dispatch({
            type: 'setCurrentMapCenter',
            payload: {
              currentMapCenter: map.getCenter()
            }
          });
          dispatch({
            type: 'setMapZoom',
            payload: {
              currentMapZoom: map.getZoom()
            }
          });
        }
      }
    }
  }, [isMobile, isDesktop]);

  useEffect(() => {
    console.log('mounted');
    if (mapRef && mapRef.current) {
      if (mapRef != null) {
        const map = mapRef.current.leafletElement;

        var searchControl = new ELG.Geosearch({
          useMapBounds: false
        }).addTo(map);

        var cb = e => handleWaypointsOnMapRef.current(e); // then use most recent cb value

        searchControl.on('results', cb);

        if (Object.keys(map).length === 0) {
          dispatch({
            type: 'setMap',
            payload: {
              currentMap: stringify(map)
            }
          });
        }
        setMap(map); //hook to set map
        //this.setState({map: map});

        console.log('map:', { map });
      }
    }

    return () => {
      searchControl.off('results', cb);
    };
  }, []);

  useEffect(() => {
    handleWaypointsOnMapRef.current = handleWaypointsOnMap;
  }); //

  function handleOnClickClearOneMarkerAtTime(e) {
    L.DomEvent.stopPropagation(e);

    dispatch({
      type: 'setIsRoutingVisible',
      payload: {
        isRoutingVisible: false
      }
    });
    mapRefForRoutingMachine.current.handleRemoveWayPoint();
    dispatch({
      type: 'deleteUserMarkers'
    });
  }

  function handleOnClickClearAllMarkers(e) {
    L.DomEvent.stopPropagation(e);

    mapRefForRoutingMachine.current.handleClearWayPoints();
    dispatch({
      type: 'resetUserMarkers'
    });
  }

  function handleOnClickMarkerClick(e) {
    e.originalEvent.view.L.DomEvent.stopPropagation(e);
  }

  function handleWaypointsOnMap(e) {
    dispatch({
      type: 'setIsRoutingVisible',
      payload: {
        isRoutingVisible: true
      }
    });
    dispatch({
      type: 'setRemoveRoutingMachine',
      payload: {
        removeRoutingMachine: false
      }
    });

    function createButton(label, container) {
      var btn = L.DomUtil.create('button', '', container);
      btn.setAttribute('type', 'button');
      btn.innerHTML = label;
      return btn;
    }
    var container = L.DomUtil.create('div'),
      startBtn = createButton('Start from this location', container),
      destBtn = createButton('Go to this location', container);

    L.popup()
      .setContent(container)
      .setLatLng(e.latlng)
      .openOn(map);

    L.DomEvent.on(startBtn, 'click', function() {
      if (markers.length === 0) {
        e.latlng.alt = 'current location';

        console.log('adding current location', e.latlng);

        dispatch({
          type: 'addMarker',
          payload: {
            marker: e.latlng
          }
        });
      }

      if (markers[0] != undefined) {
        e.latlng.alt = 'current location';
        console.log('updating current location', e.latlng);

        dispatch({
          type: 'updateMarkers',
          payload: {
            marker: e.latlng
          }
        });
      }

      mapRefForRoutingMachine.current.handleSpliceWaypoints(0, 1, e.latlng);

      map.closePopup();
    });

    L.DomEvent.on(
      destBtn,
      'click',
      function() {
        console.log('e', e);
        if (markers.length === 1) {
          e.latlng.alt = 'current destination';
          console.log('adding destination ', e.latlng);
          dispatch({
            type: 'addMarker',
            payload: {
              marker: e.latlng
            }
          });
        }
        if (markers.length === 2 && markers[1] !== undefined) {
          e.latlng.alt = 'current destination';
          console.log('updating destination', e.latlng);

          dispatch({
            type: 'updateMarkers',
            payload: {
              marker: e.latlng
            }
          });
        }

        mapRefForRoutingMachine.current.handleSpliceWaypoints(1, 1, e.latlng);

        map.closePopup();
      }.bind(this)
    );
  }

  if (!isBrowser) {
    return null;
  }

  return (
    <Map
      preferCanvas={true}
      id="myMap"
      center={currentMapCenter}
      animate={animate}
      zoom={currentMapZoom}
      ref={mapRef}
      onClick={e => handleWaypointsOnMap(e)}
    >
      {(LocateControl, TileLayer, Control, Routing) => {
        <>
          <LocateControl map={map} startDirectly />
          <TileLayer
            url={`https://api.mapbox.com/styles/v1/${process.env.MAPBOX_USERNAME}/${
              process.env.MAPBOX_STYLE_ID
            }/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.MAPBOX_ACCESS_TOKEN}`}
            attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
          />
          <Control position="bottomleft">
            <div className="leaflet-bar leaflet-control remove-marker-container">
              <a
                onClick={e => handleOnClickClearOneMarkerAtTime(e)}
                className="remove-marker leaflet-bar-part leaflet-bar-part-single"
                title="Remove one marker!"
                alt="Remove one marker!"
                role="button"
                href="#"
              />
            </div>
          </Control>
          <Control position="bottomright">
            <div className="leaflet-bar leaflet-control remove-all-markers-container">
              <i
                onClick={e => handleOnClickClearAllMarkers(e)}
                className="trash alternate large icon leaflet-bar-part leaflet-bar-part-single"
                title="Remove all markers!"
                alt="Remove all markers!"
                role="button"
                href="#"
              />
            </div>
          </Control>
          {map && (
            <Routing
              isRoutingVisible={isRoutingVisible}
              ref={mapRefForRoutingMachine}
              markers={markers}
              stringify={stringify}
              isLengthOfMarkersLessThanTwo={isLengthOfMarkersLessThanTwo}
              removeRoutingMachine={removeRoutingMachine}
              userLocation={userLocation}
            />
          )}
        </>;
      }}
    </Map>
  );
}

export default MyMap;
