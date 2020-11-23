import React, { useState, useEffect, useRef } from 'react'
import { Map, Marker } from 'react-leaflet';
import LocateControl from '../LocateControl/LocateControl.jsx';
import MapboxLayer from '../MapboxLayer/MapboxLayer.jsx';
import Routing from '../RoutingMachine/RoutingMachine.jsx'

export default function MyMap({getAddressFromLatLong, hillfinderFormButtonRef, setCurrentLocation, setCurrentDestination}) {
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
var [isRoutingDone, setIsRoutingDone] = useState(false);
var [markerData, setMarkerData] = useState([]);
var [removeFrom, setRemoveFrom] = useState(null);
var [removeTo, setRemoveTo] = useState(null);
var myMapRef = useRef();

  useEffect(()=>{
    console.log("from ", from);
    console.log("to ", to);
    console.log("fromLat ", fromLat);
    console.log("fromLon ", fromLon);

   console.log("toLat  toLon  ", toLat,  toLon );
   console.log("markerData ", markerData);

   console.log("isRoutingDone ", isRoutingDone);
 console.log("map ", map);

  },[from, to, fromLat, fromLon, toLat, toLon, markerData, isRoutingDone]);



  useEffect(() => {
   hillfinderFormButtonRef.current = clearMarkers;

    return() => {
      hillfinderFormButtonRef.current = null;
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

    if (from < 1 ){
      setMarkerData(markerData => {
         return  [...markerData, ...[fromOrTwoObj]]
      });
      setFromLat(fromLat => lat);
      setFromLon(fromLon => lng)
      setFrom(from => from + 1)
    }

    if (from == 1 && to === 0) {
      setMarkerData(markerData => {
         return  [...markerData, ...[fromOrTwoObj]]
      });
      setToLat(toLat => lat);
      setToLon(toLon => lng)
      setTo(to => to + 1);
      setIsRoutingDone(()=>true)
      setMarkerData(markerData => {
         return  []
      });
    }

  }

  function updateMarker(e){
    var markerLatLng = e.target.getLatLng(); //get marker LatLng
    var markerIndex = e.target.options.marker_index;

    console.log("markerLatLng ", markerLatLng);

    console.log("markerIndex ", markerIndex);
    var {lat, lng} = markerLatLng;


     console.log("lat, lng ", lat, lng);
      setFromLat(fromLat => lat);
      setFromLon(toLon => lng);

      setMarkerData(prevObjs => {
       return prevObjs.map((o)=>{
          if (markerIndex === o.id) return {...o, ...markerLatLng};
          return o;
        })
      })
  }


function resetHandler (){
    return myMapRef.current();
  };


function clearMarkers(){
  console.log("markerData ", markerData);
  setMarkerData(markerData => [], ...markerData);
  setFromLat(fromLat => null);
  setFromLon(fromLon => null);
  setToLat(toLat => null)
  setToLon(toLon => null)
  setFrom(from => 0);
  setTo(to => 0);
  setIsRoutingDone(false);
  // setRemoveFrom(removeFrom => null)
  // setRemoveTo(removeTo => null)
}


  function saveMap(map){
    setMap(map);
  }

  function handleOnLocationFound(e){
   setUserLocation(e.latlng)
  }

  // const marker = useRef(null);

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
     {/* {console.log("fromLat, fromLon, toLat, toLon, isRoutingDone ", fromLat, fromLon, toLat, toLon, isRoutingDone)} */}

     {isRoutingDone &&  <Routing isRoutingDone={isRoutingDone} map={map} myMapRef={myMapRef} icon={{startIcon, endIcon}} userLocation={userLocation}  coords={{fromLat, fromLon, toLat, toLon}}  />}
  </Map>

  )
}
