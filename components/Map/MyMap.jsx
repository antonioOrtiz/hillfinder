import React, { useState, useContext, useEffect, useRef } from 'react';
import { Button } from 'semantic-ui-react';

import L from 'leaflet';
import * as ELG from 'esri-leaflet-geocoder';
import { Map, Marker, TileLayer } from 'react-leaflet';

import Control from 'react-leaflet-control';
import LocateControl from '../LocateControl/LocateControl.jsx';
import MapboxLayer from '../MapboxLayer/MapboxLayer.jsx';
import Routing from '../RoutingMachine/RoutingMachine.jsx';
import UserContext from '../UserContext/UserContext.jsx';

export default function MyMap({}) {
  var [zoom, setZoom] = useState(18);
  var [map, setMap] = useState(null);
  var [animate, setAnimate] = useState(false);
  var [userLocation, setUserLocation] = useState(null);
  var [fromLat, setFromLat] = useState(null);
  var [fromLon, setFromLon] = useState(null);
  var [toLat, setToLat] = useState(null);
  var [toLon, setToLon] = useState(null);
  var [isRoutingVisibile, setIsRoutingVisibile] = useState(false);
  var [removeRoutingMachine, setRemoveRoutingMachine] = useState(false);
  var mapRef = useRef();
  var handleOnClickSetMarkersRef = useRef(handleOnClickSetMarkers);
  var { userMarkers, deleteUserMarkers, setUserMarkers, updateUserMarker } = useContext(
    UserContext
  );

  useEffect(() => {
    handleOnClickSetMarkersRef.current = handleOnClickSetMarkers;
  }); // update after each render

  useEffect(() => {
    if (map !== null) {
      var { current = {} } = mapRef;
      var { leafletElement: map } = current;
      setMap(map);
    }
    const searchControl = new ELG.Geosearch({
      useMapBounds: false
    }).addTo(map);
    const cb = e => handleOnClickSetMarkersRef.current(e); // then use most recent cb value

    searchControl.on('results', cb);

    return () => {
      searchControl.off('results', cb);
    };
  }, []);

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

  //   function handleGetUserMaps(userMarkerslength) {
  //   var typeOfState = {
  //     '1': function() {
  //       console.log('1 ', 0);
  //       setFromLat(userMarkers[0].lat);
  //       setFromLon(userMarkers[0].lng);
  //       // setMarkerData(markerData => [...markerData, ...userMarkers]);
  //     },
  //     '2': function() {
  //       console.log('1 ', 1);
  //       // setFromLat(userMarkers[0].lat);
  //       // setFromLon(userMarkers[0].lng);
  //       setToLat(userMarkers[1].lat);
  //       setToLon(userMarkers[1].lng);
  //       // setMarkerData(markerData => [...markerData, ...userMarkers]);

  //       setIsRoutingVisibile(() => true);
  //     },
  //     default() {
  //       console.log('default');
  //     }
  //   };

  //   return typeOfState[userMarkerslength] || typeOfState['default']();
  // }

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
      ? (fromOrTooObj = { ...{ id: 0 }, ...eventLatLongObj })
      : (fromOrTooObj = { ...{ id: 1 }, ...eventLatLongObj });
    setRemoveRoutingMachine(() => false);

    if (userMarkers.length < 1) {
      setUserMarkers(fromOrTooObj);

      setFromLat(fromLat => lat);
      setFromLon(fromLon => lng);
    }

    if (userMarkers.length === 1) {
      setUserMarkers(fromOrTooObj);
      setToLat(toLat => lat);
      setToLon(toLon => lng);
      setIsRoutingVisibile(() => true);
      deleteUserMarkers();
    }
  }

  function handleOnDragEndUpdateMarker(e) {
    var markerIndex = e.target.options.marker_index;
    var markerLatLng = e.target.getLatLng(); //get marker LatLng

    var { lat, lng } = markerLatLng;

    setFromLat(fromLat => lat);
    setFromLon(toLon => lng);

    updateUserMarker(markerLatLng, markerIndex);
  }

  function handleOnClickClearMarkers() {
    deleteUserMarkers();
    setFromLat(fromLat => null);
    setFromLon(fromLon => null);
    setToLat(toLat => null);
    setToLon(toLon => null);
    setRemoveRoutingMachine(true);
    setIsRoutingVisibile(false);
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

  function handleIfArray(a) {
    return Array.isArray(a);
  }

  return (
    <Map
      animate={animate}
      onClick={handleOnClickSetMarkers}
      onLocationFound={handleOnLocationFound}
      zoom={zoom}
      ref={mapRef}
    >
      {handleIfArray(userMarkers) &&
        userMarkers.map((element, index) => {
          return (
            <Marker
              key={index}
              marker_index={index}
              position={element}
              draggable={true}
              onClick={handleOnClickMarkerClick}
              onDragend={handleOnDragEndUpdateMarker}
              icon={element != null ? (element.id === 0 ? startIcon : endIcon) : null}
            />
          );
        })}

      <TileLayer
        attribution='copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url={`https://api.mapbox.com/styles/v1/antonioportiz/cka75143q171h1imlxaw4ywzg/tiles/256/{z}/{x}/{y}@2x?access_token=${
          process.env.MAPBOX_ACCESS_TOKEN
        }`}
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
          map={map}
          icon={{ startIcon, endIcon }}
          userLocation={userLocation}
          coords={{ fromLat, fromLon, toLat, toLon }}
        />
      ) : null}
    </Map>
  );
}
