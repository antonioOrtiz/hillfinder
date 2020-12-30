import React, { useState, useContext, useEffect, useRef, useCallback } from 'react';
import { Button } from 'semantic-ui-react';

import L from 'leaflet';
import * as ELG from 'esri-leaflet-geocoder';
import { Map, Marker } from 'react-leaflet';
import { Dimmer, Loader } from 'semantic-ui-react';

import Control from 'react-leaflet-control';
import LocateControl from '../LocateControl/LocateControl.jsx';
import MapboxLayer from '../MapboxLayer/MapboxLayer.jsx';
import Routing from '../RoutingMachine/RoutingMachine.jsx';
import UserContext from '../UserContext/UserContext.jsx';

import { parse, stringify } from 'flatted';
import { string } from 'prop-types';

export default function MyMap({}) {
  var [zoom, setZoom] = useState(18);
  var [animate, setAnimate] = useState(false);
  var [userLocation, setUserLocation] = useState(null);
  var [from, setFrom] = useState(0);
  var [to, setTo] = useState(0);

  var mapRef = useRef();
  var handleOnClickSetMarkersRef = useRef(handleOnClickSetMarkers);

  var {
    userMarkers,
    setUserMarkers,
    deleteUserMarkers,
    resetUserMarkers,
    setUserMarkersToNull,
    userMap,
    setUserCurrentMap,
    userCoords,
    setUserCoords,
    removeRoutingMachine,
    setRemoveRoutingMachine,
    isRoutingVisibile,
    setIsRoutingVisibileToTrue,
    setIsRoutingVisibileToFalse,
    updateUserCoords,
    updateUserMarker
  } = useContext(UserContext);
  var userCoordsRef = useRef(userCoords);

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

  useEffect(() => {
    handleOnClickSetMarkersRef.current = handleOnClickSetMarkers;
  }); // update after each render

  var startIcon = new L.Icon({
    iconUrl:
      'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  var endIcon = new L.Icon({
    iconUrl:
      'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  function handleOnClickSetMarkers(e) {
    userMarkersRef.current = userMarkers;
    if (userMarkers === null) return null;

    if (e.latlng) {
      var eventLatLongObj = e.latlng;
    }

    if (e.marker) {
      var eventLatLongObj = e.marker._latlng;
    }

    var fromOrToObj;

    if (from < 1) {
      fromOrToObj = {
        ...{
          id: 0
        },
        ...eventLatLongObj
      };

      setUserMarkers(fromOrToObj);
      setFrom(from => from + 1);
    }
    if (from === 1 && to === 0) {
      fromOrToObj = {
        ...{
          id: 1
        },
        ...eventLatLongObj
      };
      setUserMarkers(fromOrToObj);
      setTo(to => to + 1);
    }
  }

  function handleOnDragEndUpdateMarker(e) {
    console.log('e ', e);
    var markerIndex = e.target.options.marker_index;
    var markerLatLng = e.target.getLatLng(); //get marker LatLng
    markerLatLng.id = markerIndex;
    updateUserMarker(markerLatLng, markerIndex);
  }

  function handleOnClickClearOneMarkerAtTime() {
    console.log(`handleOnClickClearMarkers click`);
    deleteUserMarkers();
  }

  function handleOnClickClearAllMarkers() {
    console.log(`handleOnClickClearMarkers click`);
    resetUserMarkers();
  }

  function saveMap(map) {
    setMap(map);
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

      {console.log('userLocation ', userLocation)}
      {true && (
        <Routing
          removeRoutingMachine={removeRoutingMachine}
          map={userMap}
          icon={{
            startIcon,
            endIcon
          }}
          userLocation={userLocation}
        />
      )}
    </Map>
  );
}
