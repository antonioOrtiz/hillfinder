import L from "leaflet";
import React, { useCallback, useEffect, useState } from 'react'
import { MapContainer, TileLayer, Circle, Marker } from "react-leaflet";
import '@geoman-io/leaflet-geoman-free';
import 'leaflet.fullscreen/Control.FullScreen.js'

import { Draw } from "./Draw";
import LeafletControlGeocoder from "./GeoSearch";
import { LocateComponent as Locate } from './LocateControl'
import RoutingMachine from './RoutingMachine';

// Somewhere at the root level of your app
import 'regenerator-runtime/runtime';

// Where you want to use leaflet-topography
import Topography, { getTopography, configure, TopoLayer } from 'leaflet-topography';

const options = {
  token: process.env.MAPBOX_ACCESS_TOKEN
}

function RandomMarkers({ handleInitPointsInRoutingMachine, initialRadiusForInitCircle, amountOfMarkersOnLoad = 5 }) {
  const [theArray, setTheArray] = useState([]);

  useEffect(() => {
    let updatedArray = [...theArray]
    updatedArray.length = amountOfMarkersOnLoad
    setTheArray(updatedArray)
  }, [])

  function randomMarkersInCirclee(originalLat, originalLng) {
    var r = 500 / 111300,
      y0 = originalLat,
      x0 = originalLng,
      u = Math.random(),
      v = Math.random(),
      w = r * Math.sqrt(u),
      t = 2 * Math.PI * v,
      x = w * Math.cos(t),
      y1 = w * Math.sin(t),
      x1 = x / Math.cos(y0);

    const newY = y0 + y1;
    const newX = x0 + x1

    return [
      newY,
      newX
    ]
  }


  return (
    <>
      {theArray.map((marker, index) => {
        handleInitPointsInRoutingMachine(randomMarkersInCirclee(...initialRadiusForInitCircle))
        return <Marker key={index} position={randomMarkersInCirclee(...initialRadiusForInitCircle)
        } ></Marker>
      }
      )}
    </>
  );
}

const MemoizedRandomMarkers = React.memo(RandomMarkers)

export default function MyMap() {
  const [initialRadiusForInitCircle, setInitialRadiusForInitCircle] = useState([])
  const [initialRadiusForRoutingMachine, setInitialRadiusForRoutingMachine] = useState([])


  function handleInitPointsInRoutingMachineForUseCallBack(initStartingPoints) {
    setInitialRadiusForRoutingMachine(prev => [...prev, initStartingPoints])
  }

  const handleInitPointsInRoutingMachine = useCallback((initStartingPoints) => {
    handleInitPointsInRoutingMachineForUseCallBack(initStartingPoints);
  }, []);

  useEffect(() => {

    console.log("initialRadiusForRoutingMachine ", initialRadiusForRoutingMachine);


  }, [initialRadiusForRoutingMachine])

  return (
    <MapContainer
      center={[40.74097760020495, -73.76170149999999]}
      scrollWheelZoom={false}
      zoom={15}
      whenReady={(e) => {
        const { lat, lng } = e.target._lastCenter
        setInitialRadiusForInitCircle([lat, lng])
        // Topography.getTopography(e.target._lastCenter, options)
        //   .then((results) => console.log(results));
      }}>
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/${process.env.MAPBOX_USERNAME}/${process.env.MAPBOX_STYLE_ID
          }/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.MAPBOX_ACCESS_TOKEN}`}
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
      />

      <Locate startDirectly />
      <LeafletControlGeocoder />
      <Draw />
      <Circle
        center={L.latLng(initialRadiusForInitCircle)}
        key="1"
        radius={500}
      />
      <MemoizedRandomMarkers
        handleInitPointsInRoutingMachine={handleInitPointsInRoutingMachine}
        initialRadiusForInitCircle={initialRadiusForInitCircle}
        amountOfMarkersOnLoad={5}
      />
      <RoutingMachine
        startingPoints={initialRadiusForRoutingMachine}
      />
    </MapContainer>
  )
}
