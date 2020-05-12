import React, { useState, useEffect } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';

export default function MyMap() {
  var [latLng, setlatlng] = useState({ lat: 51.505, lng: -0.09 });
  var [zoom, setZoom] = useState(13);
  var [map, setData] = useState([]);
  var [animate, setAnimate] = useState(false);

  useEffect(() => {
    // const res = axios.get('', {
    //   params: {}
    // });
    // setData(map => [...map, res.data]);
  }, []);

  function handleClick(e) {
    console.log('e ', e);
    setlatlng({ ...latLng, ...e.latlng });
  }

  function toggleAnimate() {
    setAnimate(animate => !animate);
  }

  return map ? (
    <>
      <label>
        <input checked={animate} onChange={toggleAnimate} type="checkbox" />
        Animate panning
      </label>
      <Map animate={animate} center={latLng} onClick={e => handleClick(e)} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <Marker position={latLng}>
          <Popup>Expected: This popup can get out of the maps viewport</Popup>
        </Marker>
      </Map>
      );
    </>
  ) : (
    'Data is Loading...'
  );
}
