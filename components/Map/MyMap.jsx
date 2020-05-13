import { useState, useEffect } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import LocateControl from '../LocateControl/LocateControl.jsx';

export default function MyMap() {
  var [latLng, setlatlng] = useState({ lat: 39.74739, lng: -105 });
  var [zoom, setZoom] = useState(4);
  var [map, setData] = useState([]);
  var [animate, setAnimate] = useState(false);

  useEffect(() => {}, []);

  function handleClick(e) {
    console.log('e ', e);
    setlatlng({ ...latLng, ...e.latlng });
  }

  function toggleAnimate() {
    setAnimate(animate => !animate);
  }

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
        <input checked={animate} onChange={toggleAnimate} type="checkbox" />
        Animate panning
      </label>
      <Map animate={animate} center={latLng} onClick={e => handleClick(e)} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />

        <LocateControl options={locateOptions} startDirectly latLng={latLng} />
      </Map>
    </>
  ) : (
    'Data is Loading...'
  );
}
