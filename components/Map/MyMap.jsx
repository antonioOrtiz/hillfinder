import React, { useState, useEffect, useRef } from 'react'
import { Map, Marker } from 'react-leaflet';
import LocateControl from '../LocateControl/LocateControl.jsx';
import MapboxLayer from '../MapboxLayer/MapboxLayer.jsx';
import L from "leaflet";
import LCG from 'leaflet-control-geocoder';
import Routing from '../RoutingMachine/RoutingMachine.jsx'

export default function MyMap({getAddressFromLatLong, hillfinderFormButtonRef, setCurrentLocation, setCurrentDestination}) {
  var [zoom, setZoom] = useState(4);
  var [map, setMap] = useState(null);
  var [animate, setAnimate] = useState(false);
  var [draggable, setDraggable] = useState(true);
  var [markerData, setMarkerData] = useState([]);
  var [amountOfMarkers, setAmountOfMarkers] = useState(0);
  var [markerPointsForRouting, setMarkerPointsForRouting] = useState(null)
  var [mapCenter, setMapCenter] = useState(null)
  var [isMapInit, setIsMapInit] = useState(false)

  useEffect(() => {
    hillfinderFormButtonRef.current = clearMarkers;

    return() => {
     hillfinderFormButtonRef.current = null;
    }
  });

  useEffect(() => {
     if (map ){

      map.on('load', function (result) {
        setMapCenter(mapCenter=> result.sourceTarget._lastCenter)
      })

     }
  });

  useEffect(() => {
    if (markerData.length === 2){
      setMarkerPointsForRouting(markerData);
    }
  });

var greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function addMarker(e){
  // setShowMarkers(showMarkers => !showMarkers)
  var coords = e.latlng;
  if (amountOfMarkers < 2) {
    setAmountOfMarkers(amountOfMarkers => amountOfMarkers + 1)
    updateAddressFromMarker(amountOfMarkers, coords);
    setMarkerData(markerData => [...markerData, coords]);
  }
  else null;
}

function updateMarker(e){
  var markerLatLng = e.target.getLatLng(); //get marker LatLng
  var markerIndex = e.target.options.marker_index;
  updateAddressFromMarker(markerIndex, markerLatLng)

  setMarkerData(markerData => {
   markerData[markerIndex] = markerLatLng;
   return markerData;
  })
}

function updateAddressFromMarker(marker, latLng){
    var geocoder = new L.Control.geocoder();
     geocoder.options.geocoder.reverse(latLng, 5, (address)=>{
      getAddressFromLatLong(marker, address[0].name)
    }, null)
}

function clearMarkers(){
  setMarkerData(markerData => [], ...markerData);
  setAmountOfMarkers(0);
  setCurrentLocation(''), setCurrentDestination('')
}

function toggleAnimate() {
  setAnimate(animate => !animate);
}

  var MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;

  var locateOptions = {
    position: 'topright',
    strings: {
      title: 'Show me where I am, yo!'
    },
    onActivate: () => {} // callback before engine starts retrieving locations
  };

    var mapRef = useRef();

    useEffect(()=>{
      var {current = {}} = mapRef;
      var { leafletElement: map } = current;
      setIsMapInit(isMapInit=> !isMapInit)
      setMap(map);
    },[])

  return (
        <Map center={markerPointsForRouting} animate={animate} zoom={zoom} onClick={addMarker} ref={mapRef}>
        { markerData.map((element, index) => (
            <Marker
              key={index}
              marker_index={index}
              position={element}
              draggable={draggable}
              onDragend={updateMarker}
              icon={index === 0 ? greenIcon : redIcon}
            />
          ))}

          <MapboxLayer
            accessToken={MAPBOX_ACCESS_TOKEN}
            style="mapbox://styles/mapbox/streets-v9"
          />
          <LocateControl options={locateOptions} startDirectly />

           {markerPointsForRouting && <Routing myMapRef={map} latLng={markerPointsForRouting} />}
        </Map>

  )
}
