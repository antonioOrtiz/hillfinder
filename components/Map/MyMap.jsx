import { useState, useEffect } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import LocateControl from '../LocateControl/LocateControl.jsx';
import MapboxLayer from '../MapboxLayer/MapboxLayer.jsx';

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

  var MAPBOX_ACCESS_TOKEN = processx.env.MAPBOX_ACCESS_TOKEN;

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
      <Map animate={animate} center={latLng} onClick={e => handleClick(e)} zoom={zoom}>
        {/* <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        /> */}
        <Marker position={latLng}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
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
