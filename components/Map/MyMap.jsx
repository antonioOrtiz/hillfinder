import React, { useState, useContext, useEffect, useRef, useCallback } from 'react';
import { Button } from 'semantic-ui-react';

import L from 'leaflet';
import * as ELG from 'esri-leaflet-geocoder';
import { Map } from 'react-leaflet';
import { Dimmer, Loader } from 'semantic-ui-react';

import Control from 'react-leaflet-control';
import LocateControl from '../LocateControl/LocateControl.jsx';
import MapboxLayer from '../MapboxLayer/MapboxLayer.jsx';
import Routing from '../RoutingMachine/RoutingMachine.jsx';
import { userState, userDispatch } from '../Context/UserContext.jsx';

import UIContext from '../Context/UIContext.jsx';

import { stringify } from 'flatted';

export default function MyMap({}) {
  var [zoom, setZoom] = useState(18);
  var [animate, setAnimate] = useState(false);
  var [userLocation, setUserLocation] = useState(null);

  var mapRef = useRef();

  console.log('userState() ', userState());
  var {
    avatar,
    currentMap,
    id,
    isLengthOfMarkersLessThanTwo,
    isRoutingVisible,
    markers,
    removeRoutingMachine
  } = userState();

  var dispatch = userDispatch();

  var { isMobile, isDesktop } = useContext(UIContext);

  useEffect(() => {
    var searchControl = new ELG.Geosearch({
      useMapBounds: false
    });
    var { current = {} } = mapRef;
    var { leafletElement: map } = current;

    console.log('map ', map);

    searchControl.addTo(map);

    var cb = e => handleOnClickSetMarkersRef.current(e); // then use most recent cb value

    searchControl.on('results', cb);

    if (Object.keys(currentMap).length === 0) {
      dispatch({
        type: 'setMap',
        payload: {
          curerntMap: stringify(map)
        }
      });
    }

    return () => {
      searchControl.off('results', cb);
    };
  }, []);

  useEffect(() => {
    if (isRoutingVisible === false) {
      dispatch({
        type: 'setIsRoutingVisible',
        payload: {
          isRoutingVisible: true
        }
      });
    }
  });

  useEffect(() => {
    if (markers.length === 2) {
      dispatch({
        type: 'isLengthOfMarkersLessThanTwoFalse',
        payload: { isLengthOfMarkersLessThanTwo: false }
      });
    }
  }, [JSON.stringify(markers)]);

  function handleOnClickClearOneMarkerAtTime() {
    console.log(`handleOnClickClearMarkers click`);
    dispatch({
      type: 'deleteUserMarkers'
    });
  }

  function handleOnClickClearAllMarkers() {
    console.log(`handleOnClickClearMarkers click`);
    dispatch({
      type: 'resetUserMarkers'
    });
  }

  function handleOnLocationFound(e) {
    setUserLocation(e.latlng);
  }

  function handleOnClickMarkerClick(e) {
    console.log('e ', e);
    e.originalEvent.view.L.DomEvent.stopPropagation(e);
  }

  return (
    <Map
      animate={animate}
      onLocationFound={handleOnLocationFound}
      zoom={zoom}
      ref={mapRef}
    >
      <MapboxLayer
        accessToken={process.env.MAPBOX_ACCESS_TOKEN}
        style="mapbox://styles/mapbox/streets-v9"
      />
      <LocateControl startDirectly />
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

      {isRoutingVisible && (
        <Routing
          markers={markers}
          dispatch={dispatch}
          removeRoutingMachine={removeRoutingMachine}
          map={currentMap}
          userLocation={userLocation}
          isMobile={isMobile}
          isDesktop={isDesktop}
        />
      )}
    </Map>
  );
}
