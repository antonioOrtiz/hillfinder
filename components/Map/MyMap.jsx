import React, { useState, useContext, useEffect, useRef } from 'react';
import { Button } from 'semantic-ui-react';

import L from 'leaflet';
import * as ELG from 'esri-leaflet-geocoder';
import { Map, Marker } from 'react-leaflet';

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

  var mapRef = useRef();
  var handleOnClickSetMarkersRef = useRef(handleOnClickSetMarkers);
  var {
    isRoutingVisibile,
    removeRoutingMachine,
    toggler,
    userMap,
    userCoords,
    userMarkers,
    setUserCurrentMap,
    setUserCoords,
    deleteUserMarkers,
    setUserMarkers,
    updateUserMarker
  } = useContext(UserContext);

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

  useEffect(() => {
    console.log('userMarkers.length ', userMarkers.length);

    console.log('userCoords ', userCoords);
    handleGetUserMaps(userMarkers);

    return () => {};
  }, []);

  function handleGetUserMaps(userMarkers) {
    var typeOfState = {
      '1': function() {
        setUserCoords(userMarkers[0], 'from');
      },
      '2': function() {
        // setFromLon(userMarkers[0].lng);
        setUserCoords(userMarkers[1], 'to');
        setIsRoutingVisibile(() => true);
      },
      default() {
        console.log('default');
      }
    };

    return typeOfState[userMarkers.length] || typeOfState['default']();
  }

  function handleOnClickSetMarkers(e) {
    if (e.latlng) {
      var { lat, lng } = e.latlng;
      var eventLatLongObj = e.latlng;
    }

    if (e.marker) {
      var { lat, lng } = e.marker._latlng;
      var eventLatLongObj = e.marker._latlng;
    }

    var fromOrTooObj;

    userMarkers.length < 1
      ? (fromOrTooObj = {
          ...{
            id: 0
          },
          ...eventLatLongObj
        })
      : (fromOrTooObj = {
          ...{
            id: 1
          },
          ...eventLatLongObj
        });
    setRemoveRoutingMachine(() => false);

    if (userMarkers.length < 1) {
      setUserMarkers(fromOrTooObj);
      setUserCoords(userMarkers[0], 'from');
    }

    if (userMarkers.length === 1) {
      setUserMarkers(fromOrTooObj);
      setUserCoords(userMarkers[1], 'to');
      toggler(isRoutingVisibile);
    }
  }

  function handleOnDragEndUpdateMarker(e) {
    var markerIndex = e.target.options.marker_index;
    var markerLatLng = e.target.getLatLng(); //get marker LatLng

    var { lat, lng } = markerLatLng;
    updateUserMarker(markerLatLng, markerIndex);

    if (markerIndex === 0) {
      markerCoordsSetter(userMarkers, 'from', 0);
    } else {
      markerCoordsSetter(userMarkers, 'to', 1);
    }
  }

  function handleOnClickClearMarkers() {
    deleteUserMarkers();
    resetUserCoords();
    toggler(removeRoutingMachine);
    toggler(isRoutingVisibile);
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

  return (
    <Map
      animate={animate}
      onClick={handleOnClickSetMarkers}
      onLocationFound={handleOnLocationFound}
      zoom={zoom}
      ref={mapRef}
    >
      {userMarkers &&
        userMarkers.map((element, index) => {
          return (
            <Marker
              key={index}
              marker_index={index}
              position={element}
              draggable={true}
              onClick={handleOnClickMarkerClick}
              onDragend={handleOnDragEndUpdateMarker}
              icon={element.id === 0 ? startIcon : endIcon}
            />
          );
        })}

      <MapboxLayer
        accessToken={process.env.MAPBOX_ACCESS_TOKEN}
        style="mapbox://styles/mapbox/streets-v9"
      />
      <LocateControl startDirectly />
      {/* <GeoSearch map={map} markerInfo={{markerData, handleOnClickSetMarkers, handleOnDragEndUpdateMarker, handleOnClickMarkerClick, startIcon, endIcon}} /> */}
      <Control position="bottomleft">
        <Button onClick={handleOnClickClearMarkers} color="red" size="small">
          clear
        </Button>
      </Control>
      {isRoutingVisibile ? (
        <Routing
          removeRoutingMachine={removeRoutingMachine}
          map={userMap}
          icon={{
            startIcon,
            endIcon
          }}
          userLocation={userLocation}
          coords={userCoords}
        />
      ) : null}
    </Map>
  );
}
