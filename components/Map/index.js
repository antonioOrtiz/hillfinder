// import { MapContainer, TileLayer } from 'react-leaflet'
import { useCallback, useEffect, useState, } from 'react'
import ReactMapboxGl, { Layer, RotationControl, Source, ScaleControl, ZoomControl } from "react-mapbox-gl";

import { userState } from 'components/Context/UserContext'

import mapboxgl from 'mapbox-gl';

import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import * as turf from '@turf/turf'

const Map = ReactMapboxGl({
  accessToken: process.env.MAPBOX_ACCESS_TOKEN,
  logoPosition: 'bottom-right',
  pitchWithRotate: true,
});

export default function MyMap() {
  const { state: userstate } = userState();
  const [lng, setLong] = useState(0)
  const [lat, setLat] = useState(0)

  let { currentMapCenter } = userstate;

  var radius = 5;
  var options = { steps: 10, units: 'miles', properties: { foo: 'bar' } };


  function handleLoadedMap(map) {
    var foo = turf.point([lng, lat], radius, options)

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      position: 'top-right'
    })
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      // When active the map will receive updates to the device's location as it changes.
      trackUserLocation: true,
      // Draw an arrow next to the location dot to indicate which direction the device is heading.
      showUserHeading: true,
      showAccuracyCircle: true,
    })
      .on('geolocate', locateUser)

    function locateUser(e) {
      setLong(e.coords.longitude)
      setLat(e.coords.latitude)
      console.log('A geolocate event has occurred.');
      console.log("lng:" + e.coords.longitude + ", lat:" + e.coords.latitude)
      geolocate.off('geolocate', null);
    }


    map.setZoom(12)
      .addSource('mapbox-dem', {
        'type': 'raster-dem',
        'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
        'tileSize': 512,
        'maxzoom': 14
      })
      .addSource('point', {
        "type": "geojson",
        "data": turf.point([lng, lat], radius, options)
      })

      .addLayer({
        "id": "point",
        "type": "circle",
        "source": "point",
        "paint": {
          "circle-radius": 100,
          "circle-color": "#3887be",
          "circle-opacity": .25

        }
      })

      .setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 2 })
      .addLayer({
        'id': 'sky',
        'type': 'sky',
        'paint': {
          'sky-type': 'atmosphere',
          'sky-atmosphere-sun': [0.0, 0.0],
          'sky-atmosphere-sun-intensity': 15
        }
      })
      .addControl(geocoder)
      .addControl(geolocate, 'top-left');

  }

  const handleMapLoad = useCallback(map => {
    map.on('style.load', handleLoadedMap(map))
  }, []);

  return (
    <>
      <Map
        center={[-73.7801611653395, 40.73373854851843]}
        onStyleLoad={handleMapLoad}
        style="mapbox://styles/mapbox/streets-v9"
      >
        <RotationControl
          className="mt-16"
          position="top-left"
        />
        <ZoomControl
          className="mt-11"
          position="top-left"
        />
        <ScaleControl
          maxWidth={100}
          measurement={"mi"}
          position="bottom-left"

        />

      </Map>
    </>
  )
}
