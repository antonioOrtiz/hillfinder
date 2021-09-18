import React, { useState, useEffect, useRef, useContext } from 'react';



import L from 'leaflet';
import { geosearch } from 'esri-leaflet-geocoder';

import Control from 'react-leaflet-control';
// import MapboxLayer from '../MapboxLayer/MapboxLayer.jsx';
import Routing from '../RoutingMachine/RoutingMachine.jsx';
import LocateControl from '../LocateControl/LocateControl.jsx';
import { stringify } from 'flatted';
import { Map, TileLayer } from 'react-leaflet';

import { userState, userDispatch } from '../Context/UserContext.jsx';
import UIContext from '../Context/UIContext.jsx';

function MyMap() {
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
    currentMapZoom,
    currentMapCenter,
    isRoutingVisible,
    removeRoutingMachine,
    isLengthOfMarkersLessThanTwo,
    markers
  } = state;

  useEffect(() => {
    const { current = {} } = mapRef;
    const { leafletElement: map } = current;


    if (!map) return;

    const control = geosearch({ position: 'topright', useMapBounds: false });

    console.log("control ", control);
    control.addTo(map);

    var cb = e => handleWaypointsOnMapRef.current(e); // then use most recent cb value

    control.on('results', cb);


    setMap(map);

    return () => {
      control.off('results', cb);
    };
  }, []);

  useEffect(() => {

    const { current = {} } = mapRef;
    const { leafletElement: map } = current;

    currentMapCenter
    if (currentMapCenter) {
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
  }, [isMobile, isDesktop]);

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
      btn.setAttribute('class', 'ui olive basic button');
      btn.innerHTML = label;
      return btn;
    }
    var container = L.DomUtil.create('div'),

      startBtn = createButton('Start from this location', container),
      destBtn = createButton('Go to this location', container);
    container.setAttribute('class', 'start-goto-container');
    L.popup()
      .setContent(container)
      .setLatLng(e.latlng)
      .openOn(map);

    L.DomEvent.on(startBtn, 'click', function () {
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
      function () {
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
      <LocateControl map={map} startDirectly />
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/${process.env.MAPBOX_USERNAME}/${process.env.MAPBOX_STYLE_ID
          }/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.MAPBOX_ACCESS_TOKEN}`}
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
      />
      <Control position="bottomleft">
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
      <Control position="bottomleft">
        <div className="leaflet-bar leaflet-control remove-one-marker-container">
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
    </Map>
  );
}

export default MyMap;
