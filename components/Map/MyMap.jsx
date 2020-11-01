import React, { useState, useEffect, useRef } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import LocateControl from '../LocateControl/LocateControl.jsx';
import MapboxLayer from '../MapboxLayer/MapboxLayer.jsx';
import L from "leaflet";


import "leaflet/dist/leaflet.css";

export default function MyMap() {
  var [latLng, setlatlng] = useState(null);
  var [zoom, setZoom] = useState(4);
  var [map, setData] = useState([]);
  var [animate, setAnimate] = useState(false);

  useEffect(() => {
  }, []);


const customMarker = new L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
});

  function handleClick(e) {
    setlatlng(e.latlng)
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

      <Map animate={animate} zoom={zoom} onClick={handleClick}>

         {latLng && <Marker draggable={true} position={latLng} icon={customMarker}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
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
