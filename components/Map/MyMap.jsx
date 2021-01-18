import React, { useState, useContext, useEffect, useRef, useCallback } from 'react';
import { Button, Dimmer, Loader } from 'semantic-ui-react';

import L from 'leaflet';
import * as ELG from 'esri-leaflet-geocoder';
import { Map } from 'react-leaflet';

import Control from 'react-leaflet-control';
import LocateControl from '../LocateControl/LocateControl.jsx';
import MapboxLayer from '../MapboxLayer/MapboxLayer.jsx';
import Routing from '../RoutingMachine/RoutingMachine.jsx';

import { stringify } from 'flatted';

import { userState, userDispatch } from '../Context/UserContext.jsx';
import UIContext from '../Context/UIContext.jsx';

export default function MyMap({}) {
  var [zoom, setZoom] = useState(18);
  var [animate, setAnimate] = useState(false);
  var [userLocation, setUserLocation] = useState(null);

  var mapRef = useRef();
  var { state } = userState();
  var { dispatch } = userDispatch();
  var {
    currentMap,
    isMapLoading,
    isRoutingVisible,
    removeRoutingMachine,
    isLengthOfMarkersLessThanTwo,
    markers
  } = state;

  var { isMobile, isDesktop } = useContext(UIContext);

  // useEffect(() => {
  //   console.log('markers ', markers);
  //   return () => {
  //   };
  // }, [stringify(markers)]);

  useEffect(() => {
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
    var searchControl = new ELG.Geosearch({
      useMapBounds: false
    });
    var { current = {} } = mapRef;
    var { leafletElement: map } = current;

    searchControl.addTo(map);

    var cb = e => handleOnClickSetMarkersRef.current(e); // then use most recent cb value

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

  useEffect(() => {
    console.log('markers ', markers);

    dispatch({
      type: 'setIsRoutingVisible',
      payload: {
        isRoutingVisible: true
      }
    });
    if (markers.length === 2) {
      dispatch({
        type: 'isLengthOfMarkersLessThanTwoFalse',
        payload: { isLengthOfMarkersLessThanTwo: false }
      });
    }
  }, [JSON.stringify(markers)]);

  function handleOnClickClearOneMarkerAtTime() {
    dispatch({
      type: 'deleteUserMarkers',
      payload: 1
    });
  }

  function handleOnClickClearAllMarkers() {
    dispatch({
      type: 'resetUserMarkers'
    });
  }

  function handleOnLocationFound(e) {
    setUserLocation(e.latlng);
  }

  function handleOnClickMarkerClick(e) {
    e.originalEvent.view.L.DomEvent.stopPropagation(e);
  }

  return (
    <Map
      preferCanvas={true}
      id="myMap"
      animate={animate}
      onLocationFound={handleOnLocationFound}
      zoom={zoom}
      ref={mapRef}
    >
      <MapboxLayer
        accessToken={process.env.MAPBOX_ACCESS_TOKEN}
        style="mapbox://styles/mapbox/streets-v9"
      />

      <LocateControl isMapLoading={isMapLoading} startDirectly />
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
          isLengthOfMarkersLessThanTwo={isLengthOfMarkersLessThanTwo}
          removeRoutingMachine={removeRoutingMachine}
          userLocation={userLocation}
          isMobile={isMobile}
          isDesktop={isDesktop}
        />
      )}
    </Map>
  );
}
