import React, { useState, useEffect, useRef } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import LocateControl from '../LocateControl/LocateControl.jsx';
import MapboxLayer from '../MapboxLayer/MapboxLayer.jsx';
import L from "leaflet";
import LCG from 'leaflet-control-geocoder';
import "leaflet/dist/leaflet.css";

export default function MyMap({getAddressFromLatLong}) {
  var [latLng, setlatlng] = useState(null);
  var [zoom, setZoom] = useState(4);
  var [map, setData] = useState([]);
  var [animate, setAnimate] = useState(false);
   var [markerOneLatLng, setMarkerOneLatLng] =  useState(null);
   var [markerTwoLatLng, setMarkerTwoLatLng] =  useState(null);

  useEffect(() => {
    if (latLng != null){
    var geocoder = new L.Control.geocoder();
    var latLngParser = new L.Control.Geocoder.latLng();

     geocoder.options.geocoder.reverse(latLng, 5, (address)=>{
        getAddressFromLatLong(address[0].name)
       }, null)
  }
  }, [latLng]);


var customMarker = new L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
});

function handleClick(e) {
  if (e.target.options.name === "myMap" && markerTwoLatLng === null){
      setMarkerOneLatLng(e.latlng)
  }

    if (e.target.options.name === "myMap" && markerOneLatLng !== null){
      setMarkerTwoLatLng(e.latlng)
  }

}

// function handleDrag(e) {
//     if (e.target.options.name === 'markerOne'){
//         console.log("markerOne");
//       setMarkerOneLatLng(e.latlng)
//     }
//     if (e.target.options.name === 'markerTwo'){
//       setMarkerTwoLatLng(e.latlng)
//     }
// }

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

  return map ? (
    <>
      <label>
        <input
          className="animate-panning"
          checked={animate}
          onChange={toggleAnimate}
          type="checkbox"
        />
        Animate panning
      </label>

      <Map  name="myMap" animate={animate} zoom={zoom} onClick={handleClick}>
         {markerOneLatLng && <Marker name="markerOne" onDrag={(e)=>  setMarkerOneLatLng(e.latlng)} draggable={true} position={markerOneLatLng} icon={customMarker}>
          <Popup>
            This is your starting point!
          </Popup>
        </Marker>}
         {markerTwoLatLng && <Marker name="markerTwo" onDrag={(e)=> setMarkerTwoLatLng(e.latlng)} draggable={true} position={markerTwoLatLng} icon={customMarker}>
          <Popup>
            This is your ending point!
          </Popup>
        </Marker>}
        <MapboxLayer
          accessToken={MAPBOX_ACCESS_TOKEN}
          style="mapbox://styles/mapbox/streets-v9"
        />
        <LocateControl options={locateOptions} startDirectly />
      </Map>
    </>
  ) : (
    'Data is Loading...'
  );
}


// import React, { useState, useEffect, useRef } from 'react'
// import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
// import LocateControl from '../LocateControl/LocateControl.jsx';
// import MapboxLayer from '../MapboxLayer/MapboxLayer.jsx';
// import L from "leaflet";
// import LCG from 'leaflet-control-geocoder';
// import "leaflet/dist/leaflet.css";

// export default function MyMap({getAddressFromLatLong}) {
//   var [latLng, setlatlng] = useState(null);
//   var [zoom, setZoom] = useState(4);
//   var [map, setData] = useState([]);
//   var [animate, setAnimate] = useState(false);
//   var [markerOneLatLng, setMarkerOneLatLng] =  useState(null);


//   useEffect(() => {
//     if (latLng != null){
//     var geocoder = new L.Control.geocoder();
//     var latLngParser = new L.Control.Geocoder.latLng();

//      geocoder.options.geocoder.reverse(latLng, 5, (address)=>{
//         getAddressFromLatLong(address[0].name)
//        }, null)
//   }
//   }, [latLng]);


// var customMarker = new L.icon({
//   iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
// });

// function handleClick(e) {
//   console.log("e.latlng ", e.target);
//    if (markerOneLatLng === null){
//          setMarkerOneLatLng(e.latlng);
//    }
// }

// function handleDrag(e) {
//     if (e.target.options.name === 'markerOne'){
//         console.log("markerOne");
//       setMarkerOneLatLng(e.latlng)
//     }
//     if (e.target.options.name === 'markerTwo'){
//       setMarkerOneLatLng(e.latlng)
//     }
// }

// function toggleAnimate() {
//   setAnimate(animate => !animate);
// }

//   var MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;

//   var locateOptions = {
//     position: 'topright',
//     strings: {
//       title: 'Show me where I am, yo!'
//     },
//     onActivate: () => {} // callback before engine starts retrieving locations
//   };

//   return map ? (
//     <>
//       <label>
//         <input
//           className="animate-panning"
//           checked={animate}
//           onChange={toggleAnimate}
//           type="checkbox"
//         />
//         Animate panning
//       </label>

//       <Map animate={animate} zoom={zoom} onClick={(e)=> handleClick(e)}>
//         {markerOneLatLng && <Marker name="markerOne" onDrag={(e)=> handleDrag(e)} draggable={true} position={markerOneLatLng} icon={customMarker}>
//           <Popup>
//             This is your starting point!
//           </Popup>
//         </Marker>}


//         <MapboxLayer
//           accessToken={MAPBOX_ACCESS_TOKEN}
//           style="mapbox://styles/mapbox/streets-v9"
//         />
//         <LocateControl options={locateOptions} startDirectly />
//       </Map>
//     </>
//   ) : (
//     'Data is Loading...'
//   );
// }
