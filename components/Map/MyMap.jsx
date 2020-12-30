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
import UserContext from '../UserContext/UserContext.jsx';

import { parse, stringify } from 'flatted';

export default function MyMap({}) {
  var [zoom, setZoom] = useState(18);
  var [animate, setAnimate] = useState(false);
  var [userLocation, setUserLocation] = useState(null);
  var [from, setFrom] = useState(0);
  var [to, setTo] = useState(0);

  var mapRef = useRef();

  var {
    userMarkers,
    setUserMarkers,
    deleteUserMarkers,
    resetUserMarkers,
    userMap,
    setUserCurrentMap,
    removeRoutingMachine,
    setRemoveRoutingMachine,
    isRoutingVisibile,
    setIsRoutingVisibileToTrue,
    setIsRoutingVisibileToFalse,
    updateUserCoords,
    setUpdateUserMarker
  } = useContext(UserContext);

  var userMarkersRef = useRef(userMarkers);

  useEffect(() => {
    console.log('userMarkers; ', userMarkers);
    if (userMarkers === null) {
      setIsRoutingVisibileToTrue();
    }
    return () => {};
  }, [stringify(userMarkers)]);

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

    if (Object.keys(userMap).length === 0) {
      setUserCurrentMap(stringify(map));
    }

    return () => {
      searchControl.off('results', cb);
    };
  }, []);

  function handleOnClickClearOneMarkerAtTime() {
    console.log(`handleOnClickClearMarkers click`);
    deleteUserMarkers();
  }

  function handleOnClickClearAllMarkers() {
    console.log(`handleOnClickClearMarkers click`);
    resetUserMarkers();
  }

  function handleOnLocationFound(e) {
    setUserLocation(e.latlng);
  }

  function handleOnClickMarkerClick(e) {
    e.originalEvent.view.L.DomEvent.stopPropagation(e);
  }

  return !mapRef ? (
    <Dimmer active inverted>
      <Loader />
    </Dimmer>
  ) : (
    <Map
      onClick={setIsRoutingVisibileToTrue}
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

      {isRoutingVisibile && (
        <Routing
          userMarkers={userMarkers}
          setUserMarkers={setUserMarkers}
          removeRoutingMachine={removeRoutingMachine}
          map={userMap}
          userLocation={userLocation}
        />
      )}
    </Map>
  );
}
