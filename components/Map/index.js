import L from "leaflet";
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, Circle, Marker } from "react-leaflet";
import '@geoman-io/leaflet-geoman-free';
import 'leaflet.fullscreen/Control.FullScreen.js'
import GeometryUtil from "leaflet-geometryutil";

import { Draw } from "./Draw";
import LeafletControlGeocoder from "./GeoSearch";
import { LocateComponent as Locate } from './LocateControl'
import RoutingMachine from './RoutingMachine';
// import RandomMarkers from  './Markers'
// Somewhere at the root level of your app
import 'regenerator-runtime/runtime';

// Where you want to use leaflet-topography
import Topography, { getTopography, configure, TopoLayer } from 'leaflet-topography';

const options = {
  token: process.env.MAPBOX_ACCESS_TOKEN
}

function RandomMarkers({ handleInitPointsInRoutingMachine, initRadiusForCircle, amountOfMarkersOnLoad, cirlcleRadius }) {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const updatedMarkers = [...markers]
    updatedMarkers.length = amountOfMarkersOnLoad
    setMarkers(updatedMarkers)
  }, [markers.length])


  function getCurrentValueForDegree(iter, times) {
    let i = 0
    function value() {
      while (i < iter.length * times) {
        const cur = Math.floor(i / times);
        i += 1
        return iter[cur]
      }
    }
    return value
  }


  function getCurrentValue(values) {
    let index = -1;
    let l = values.length;

    function increment() {
      ++index;
      if (index < l) {
        return values[index]
      } else {
        index = -1;
        ++index;
        return values[index]
      }
    }

    return increment;
  }

  function setMarkerToCenterOfSegment(lat, lng, degree, distance) {
    return GeometryUtil.destination(L.latLng(lat, lng), degree(), distance());
  }

  let degree = getCurrentValueForDegree([0, 315, 270, 225, 180, 135, 90], 7)
  let distance = getCurrentValue([75, 175, 275, 375, 475])

  return (
    <>
      {markers.length && markers.map((marker, index) => {
        return <Marker
          key={index}
          position={setMarkerToCenterOfSegment(...initRadiusForCircle, degree, distance)} />
      }
      )}
    </>
  );
}

const MemoizedRandomMarkers = React.memo(RandomMarkers)

export default function MyMap() {
  const [cirlcleRadius, setCircleRadius] = useState(500)
  const circleRef = useRef()
  const amountOfMarkersOnLoad = 20
  const [initRadiusForCircle, setInitialRadiusForInitCircle] = useState([])
  const [initStartingPointsForRoutingMachine, setInitStartingPointsForRoutingMachine] = useState([])

  function initPointsInRoutingMachine(initStartingPoints) {
    if (initStartingPointsForRoutingMachine.length < amountOfMarkersOnLoad) {
      setInitStartingPointsForRoutingMachine(prev => [...prev, initStartingPoints])
    } else {
      return false
    }
  }

  const handleInitPointsInRoutingMachine = useCallback(
    (initStartingPoints) => {
      initPointsInRoutingMachine(initStartingPoints)
    },
    [initStartingPointsForRoutingMachine],
  )

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
        ref={circleRef}
        center={L.latLng(initRadiusForCircle)}
        key="1"
        radius={cirlcleRadius}
      />
      <MemoizedRandomMarkers
        initRadiusForCircle={initRadiusForCircle}
        amountOfMarkersOnLoad={amountOfMarkersOnLoad}
        circleRadius={cirlcleRadius}
      />
      {initStartingPointsForRoutingMachine.map((sp, index) => {

        console.log("sp ", sp);
        return <RoutingMachine key={sp[0]} startingPoints={sp} />
      })
      }


    </MapContainer>
  )
}
