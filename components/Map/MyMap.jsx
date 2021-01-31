import React, { useState, useEffect, useRef } from 'react';
import { Button, Dimmer, Loader } from 'semantic-ui-react';

import L from 'leaflet';
import * as ELG from 'esri-leaflet-geocoder';
import { Map, TileLayer } from 'react-leaflet';

import Control from 'react-leaflet-control';
// import MapboxLayer from '../MapboxLayer/MapboxLayer.jsx';
import Routing from '../RoutingMachine/RoutingMachine.jsx';

import { parse, stringify } from 'flatted';

import { userState, userDispatch } from '../Context/UserContext.jsx';
import UIContext from '../Context/UIContext.jsx';

function currentMapViewPropsAreEqual(prevZoom, nextZoom) {
  return prevZoom.currentMapView === nextZoom.currentMapView;
}

function MyMap({ currentMapView }) {
  var [animate, setAnimate] = useState(false);
  var [userLocation, setUserLocation] = useState(null);
  // const [viewport, setViewport] = useState(DEFAULT_VIEWPORT);
  var handleWaypointsOnMapRef = useRef(handleWaypointsOnMap);

  var mapRef = useRef();
  var mapRefForRoutingMachine = useRef();
  var { state } = userState();
  var { dispatch } = userDispatch();
  var {
    currentMap,
    isRoutingVisible,
    removeRoutingMachine,
    isLengthOfMarkersLessThanTwo,
    markers
  } = state;

  useEffect(() => {
    handleWaypointsOnMapRef.current = handleWaypointsOnMap;
  }); // update after each render

  useEffect(() => {
    console.log('mapRefForRoutingMachine ', mapRefForRoutingMachine);
    dispatch({
      type: 'isMapLoading',
      payload: { isMapLoading: false }
    });

    return () => {
      dispatch({
        type: 'isMapLoading',
        payload: { isMapLoading: true }
      });
    };
  }, []);

  useEffect(() => {
    var { current = {} } = mapRef;
    var { leafletElement: map } = current;

    console.log('foo');

    console.log('currentMap ', currentMapView);
    map.locate({ setView: true });
    map.on('locationfound', handleOnLocationFound);
  }, []);

  useEffect(() => {
    var searchControl = new ELG.Geosearch({
      useMapBounds: false
    });
    var { current = {} } = mapRef;
    var { leafletElement: map } = current;

    console.log('mapRef ', mapRef);

    searchControl.addTo(map);

    var cb = e => handleWaypointsOnMapRef.current(e); // then use most recent cb value

    searchControl.on('results', cb);

    if (Object.keys(currentMap).length === 0) {
      dispatch({
        type: 'setMap',
        payload: {
          currentMap: stringify(map)
        }
      });
    }

    return () => {
      searchControl.off('results', cb);
    };
  }, []);

  function handleOnClickClearOneMarkerAtTime() {
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

  function handleOnClickClearAllMarkers() {
    mapRefForRoutingMachine.current.handleClearWayPoints();
    dispatch({
      type: 'resetUserMarkers'
    });
  }

  function handleOnClickMarkerClick(e) {
    e.originalEvent.view.L.DomEvent.stopPropagation(e);
  }

  function handleWaypointsOnMap(e) {
    var { current = {} } = mapRef;
    var { leafletElement: map } = current;
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

  function handleOnViewportChanged(e) {
    console.log('viewport change', e);

    console.log('currentMapView ', currentMapView);
    var { current = {} } = mapRef;
    var { leafletElement: map } = current;

    map.on('zoomend', function() {
      var zoom = map.getZoom();
      console.log('zoom ', zoom);

      console.log("'dispatch setMapZoom'; ");
      dispatch({
        type: 'setMapZoom',
        payload: {
          currentMapView: zoom
        }
      });
    });
  }

  function handleOnLocationFound(e) {
    console.log('e ', e);
    var { current = {} } = mapRef;
    var { leafletElement: map } = current;
    map.setZoom(currentMapView);

    var latlng = e.latlng;
    var radius = e.accuracy;
    var circle = L.circle(latlng, radius);
    circle.addTo(map);
  }

  useEffect(() => {
    console.log(
      'process.env.MAPBOX_USERNAME, process.env.MAPBOX_STYLE_ID, process.env.MAPBOX_ACCESS_TOKEN, process.env.MAILGUN_PUBLIC_KEY, process.env.EMAIL_ADDRESS; ',
      process.env.MAPBOX_USERNAME,
      process.env.MAPBOX_STYLE_ID,
      process.env.MAPBOX_ACCESS_TOKEN,
      process.env.MAILGUN_PUBLIC_KEY,
      process.env.EMAIL_ADDRESS
    );
    return () => {};
  }, []);
  return (
    <Map
      preferCanvas={true}
      id="myMap"
      animate={animate}
      zoom={currentMapView}
      ref={mapRef}
      onViewportChanged={handleOnViewportChanged}
      onClick={e => handleWaypointsOnMap(e)}
    >
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/${process.env.MAPBOX_USERNAME}/${
          process.env.MAPBOX_STYLE_ID
        }/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.MAPBOX_ACCESS_TOKEN}`}
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
      />

      <Control position="bottomleft">
        <Button onClick={handleOnClickClearOneMarkerAtTime} color="orange" size="small">
          delete one marker!
        </Button>
      </Control>
      <Control position="bottomright">
        <Button onClick={handleOnClickClearAllMarkers} color="red" size="small">
          clear all!
        </Button>
      </Control>

      {mapRef && (
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

var MemoizedMyMap = React.memo(MyMap, currentMapViewPropsAreEqual);

export default MemoizedMyMap;
