import React, { useState, useEffect, useRef, useContext } from 'react';

import L from 'leaflet';
import * as ELG from 'esri-leaflet-geocoder';

import { stringify } from 'flatted';
import * as ReactLeaflet from 'react-leaflet';

import { userState, userDispatch } from '../Context/UserContext.jsx';
import UIContext from '../Context/UIContext.jsx';
const { Map } = ReactLeaflet;

function MyMap({ children, currentMapZoom, currentMapCenter, ...rest }) {
  var [animate, setAnimate] = useState(false);

  var [map, setMap] = useState({});

  var mapRef = useRef();

  var handleWaypointsOnMapRef = useRef(handleWaypointsOnMap);
  var { isMobile, isDesktop } = useContext(UIContext);
  var { state } = userState();
  var { dispatch } = userDispatch();
  var { markers } = state;

  var [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
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
      {...rest}
    >
      {children(ReactLeaflet)}
    </Map>
  );
}

export default MyMap;
