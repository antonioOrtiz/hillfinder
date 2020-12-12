import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Button } from 'semantic-ui-react';

import L from 'leaflet';
import * as ELG from 'esri-leaflet-geocoder';
import { Map, Marker } from 'react-leaflet';

import Control from 'react-leaflet-control';
import LocateControl from '../LocateControl/LocateControl.jsx';
import MapboxLayer from '../MapboxLayer/MapboxLayer.jsx';
import Routing from '../RoutingMachine/RoutingMachine.jsx';

export default function MyMap({
  locationDestinationInputFields,
  getAddressFromLatLong,
  setCurrentLocation,
  setCurrentDestination
}) {
  var [zoom, setZoom] = useState(18);
  var [map, setMap] = useState(null);
  var [animate, setAnimate] = useState(false);
  var [userLocation, setUserLocation] = useState(null);
  var [fromLat, setFromLat] = useState(null);
  var [fromLon, setFromLon] = useState(null);
  var [toLat, setToLat] = useState(null);
  var [toLon, setToLon] = useState(null);
  var [from, setFrom] = useState(0);
  var [to, setTo] = useState(0);
  var [isRoutingVisibile, setIsRoutingVisibile] = useState(false);
  var [removeRoutingMachine, setRemoveRoutingMachine] = useState(false);
  var [markerData, setMarkerData] = useState([]);
  var mapRef = useRef();
  var handleOnClickSetMarkersRef = useRef(handleOnClickSetMarkers);

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

  useEffect(() => {
    console.log('markerData ', markerData);
    console.log('from, to, ', from, to);
  }, [from, to, markerData]);

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
    if (markerData === null) return null;

    if (e.latlng) {
      console.log('line 56');
      var { lat, lng } = e.latlng;
      var eventLatLongObj = e.latlng;
    }

    if (e.marker) {
      console.log('line 79');
      var { lat, lng } = e.marker._latlng;
      var eventLatLongObj = e.marker._latlng;
    }

    console.log('eventLatLongObj ', eventLatLongObj);
    var fromOrTwoObj;

    from < 1
      ? (fromOrTwoObj = { ...{ id: 0 }, ...eventLatLongObj })
      : (fromOrTwoObj = { ...{ id: 1 }, ...eventLatLongObj });
    setRemoveRoutingMachine(() => false);

    if (from < 1) {
      setMarkerData(markerData => {
        return [...markerData, ...[fromOrTwoObj]];
      });
      setFromLat(fromLat => lat);
      setFromLon(fromLon => lng);
      setFrom(from => from + 1);
    }

    if (from === 1 && to === 0) {
      setMarkerData(markerData => {
        return [...markerData, ...[fromOrTwoObj]];
      });
      setToLat(toLat => lat);
      setToLon(toLon => lng);
      setTo(to => to + 1);
      setIsRoutingVisibile(() => true);
      setMarkerData(null);
    }
  }

  function handleOnDragEndUpdateMarker(e) {
    var markerIndex = e.target.options.marker_index;
    var markerLatLng = e.target.getLatLng(); //get marker LatLng

    var { lat, lng } = markerLatLng;

    setFromLat(fromLat => lat);
    setFromLon(toLon => lng);

    setMarkerData(prevObjs => {
      return prevObjs.map(o => {
        if (markerIndex === o.id) return { ...o, ...markerLatLng };
        return o;
      });
    });
  }

  function handleOnClickClearMarkers() {
    setMarkerData(() => []);
    setFromLat(fromLat => null);
    setFromLon(fromLon => null);
    setToLat(toLat => null);
    setToLon(toLon => null);
    setFrom(from => 0);
    setTo(to => 0);
    setRemoveRoutingMachine(true);
    setIsRoutingVisibile(false);
    setCurrentLocation('');
    setCurrentDestination('');
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
      {markerData &&
        markerData.map((element, index) => {
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

      {console.log('process.env.MAPBOX_ACCESS_TOKEN ', process.env.MAPBOX_ACCESS_TOKEN)}
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
          map={map}
          icon={{ startIcon, endIcon }}
          userLocation={userLocation}
          coords={{ fromLat, fromLon, toLat, toLon }}
        />
      ) : null}
    </Map>
  );
}
