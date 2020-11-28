import React, { useState, useEffect } from 'react'
import { Map, Marker } from 'react-leaflet';
import LocateControl from '../LocateControl/LocateControl.jsx';
import MapboxLayer from '../MapboxLayer/MapboxLayer.jsx';
import Routing from '../RoutingMachine/RoutingMachine.jsx'
import Search from '../Search/SearchBox.jsx'

import L from "leaflet";
import LCG from 'leaflet-control-geocoder';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

export default function MyMap({locationDestinationInputFields, getAddressFromLatLong, hillfinderRefs, setCurrentLocation, setCurrentDestination}) {
  var [zoom, setZoom] = useState(18);
  var [map, setMap] = useState(null);
  var [animate, setAnimate] = useState(false);
  var [userLocation, setUserLocation] = useState(null)
  var [fromLat, setFromLat]  = useState(null);
  var [fromLon, setFromLon]  = useState(null);
  var [toLat, setToLat]  = useState(null);
  var [toLon, setToLon]  = useState(null);
  var [from, setFrom] = useState(0);
  var [to, setTo] = useState(0);
  var [isRoutingVisibile, setIsRoutingVisibile] = useState(false);
  var [removeRoutingMachine, setRemoveRoutingMachine] = useState(false)
  var [markerData, setMarkerData] = useState([]);
  var geocoder = new L.Control.geocoder();
  var geoSearch = L.Control.Geocoder.nominatim();

  useEffect(()=>{

   console.log("locationDestinationInputFields ", locationDestinationInputFields);

  },[locationDestinationInputFields]);

  useEffect(() => {
    hillfinderRefs.hillfinderClearButtonRef.current = clearMarkers;

    return() => {
      hillfinderRefs.hillfinderClearButtonRef.current = null;
    }
  }, []);

    useEffect(() => {
    hillfinderRefs.hillfinderFindMyHillButtonRef.current = setMarkersAndInputFieldsFromGeoFunction;

    return() => {
      hillfinderRefs.hillfinderFindMyHillButtonRef.current = null;
    }
  }, []);

  var startIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  var endIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  function setMarkers(e){
    var {lat, lng} = e.latlng
    var eventLatLong = e.latlng;
    var fromOrTwoObj;

    from  < 1  ?  fromOrTwoObj = {...{id: 0}, ...eventLatLong} : fromOrTwoObj = {...{id: 1}, ...eventLatLong}
   setRemoveRoutingMachine(()=> false)
    if (from < 1 ){
      setMarkerData(markerData => {
         return  [...markerData, ...[fromOrTwoObj]]
      });
      setFromLat(fromLat => lat);
      setFromLon(fromLon => lng);
      setFrom(from => from + 1);
      setMarkersAndInputFieldsFromGeoFunction(markerData.length, e.latlng)
    }

    if (from == 1 && to === 0) {
      setMarkerData(markerData => {
         return  [...markerData, ...[fromOrTwoObj]]
      });
      setToLat(toLat => lat);
      setToLon(toLon => lng)
      setTo(to => to + 1);
      setIsRoutingVisibile(() => true);
      setMarkersAndInputFieldsFromGeoFunction(markerData.length, e.latlng)
      setMarkerData(markerData => {
         return  []
      });
    }
  }

  function updateMarker(e){
    var markerIndex = e.target.options.marker_index;
    var markerLatLng = e.target.getLatLng(); //get marker LatLng

    setMarkersAndInputFieldsFromGeoFunction(markerIndex, markerLatLng);

    var {lat, lng} = markerLatLng;

      setFromLat(fromLat => lat);
      setFromLon(toLon => lng);

      setMarkerData(prevObjs => {
       return prevObjs.map((o)=>{
          if (markerIndex === o.id) return {...o, ...markerLatLng};
          return o;
        })
      })
  }

  function setMarkersAndInputFieldsFromGeoFunction(marker, latLng){
   if (Number.isInteger(marker)) {
     geocoder.options.geocoder.reverse(latLng, 5, (address)=>{
      getAddressFromLatLong(marker, address[0].name)
    }, null)
  } else {
   if (setCurrentDestination){

//  console.log("geoSearch.geocode ", geoSearch);
     geoSearch.geocode(locationDestinationInputFields.current_location, function(address){
    //  console.log('address', address)
   }, null )
   }
  }
}

function clearMarkers(){
  setMarkerData(markerData => [], ...markerData);
  setFromLat(fromLat => null);
  setFromLon(fromLon => null);
  setToLat(toLat => null)
  setToLon(toLon => null)
  setFrom(from => 0);
  setTo(to => 0);
  setRemoveRoutingMachine(true);
  setIsRoutingVisibile(false);
  setCurrentLocation(''); setCurrentDestination('')
}

function saveMap(map){
  setMap(map);
}

function handleOnLocationFound(e){
  setUserLocation(e.latlng)
}

function markerClick(e){
  e.originalEvent.view.L.DomEvent.stopPropagation(e)
}

var MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;


  return (
    <Map animate={animate} center={userLocation} onClick={setMarkers} onLocationFound={handleOnLocationFound} zoom={zoom} ref={saveMap}>

      {markerData && markerData.map((element, index) => {
      return (
        <Marker
          key={index}
          marker_index={index}
          position={element}
          draggable={true}
          onClick={markerClick}
          onDragend={updateMarker}
          icon={element.id === 0 ? startIcon : endIcon}
        />
      )
      })}

    <MapboxLayer
      accessToken={MAPBOX_ACCESS_TOKEN}
      style="mapbox://styles/mapbox/streets-v9"
    />
    <LocateControl startDirectly />
      <Search provider={new OpenStreetMapProvider()} />
      {/* {console.log("fromLat, fromLon, toLat, toLon, isRoutingDone ", fromLat, fromLon, toLat, toLon, isRoutingDone)} */}

      {isRoutingVisibile ?  <Routing removeRoutingMachine={removeRoutingMachine} map={map} icon={{startIcon, endIcon}} userLocation={userLocation}  coords={{fromLat, fromLon, toLat, toLon}}  /> : null}
    </Map>
  )
}
