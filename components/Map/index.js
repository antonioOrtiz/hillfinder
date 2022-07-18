import L from "leaflet";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Circle } from "react-leaflet";
import "@geoman-io/leaflet-geoman-free";
import "leaflet.fullscreen/Control.FullScreen.js";
import "leaflet-geometryutil";
import { getTopography } from "leaflet-topography";
import "regenerator-runtime/runtime";

import { Draw } from "./Draw";
import LeafletControlGeocoder from "./GeoSearch";
import { LocateComponent as Locate } from "./LocateControl";
import { RoutingMachine } from "./RoutingMachine";
import { Spinner } from "./Spinner";

const options = {
  token: process.env.MAPBOX_ACCESS_TOKEN,
};

function IntialMarkers({ amountOfMarkersOnLoad, initRadiusForCircle }) {
  const [markers, setMarkers] = useState(() =>
    Array.apply(null, Array(amountOfMarkersOnLoad)).map(function () {
      return 0;
    })
  );
  const [topographyData, setTopographyData] = useState([]);
  const [startingPointsRoutingMachine, startingPointsForRoutingMachine] =
    useState([]);
  const [init, setInit] = useState(true);

  const handleInitPointsInRoutingMachine = useCallback(
    (initStartingPoints) => {
      startingPointsForRoutingMachine(initStartingPoints);
    },
    [startingPointsRoutingMachine]
  );

  function getCurrentValueForDegree(iter, times) {
    let i = 0;

    function value() {
      while (i < iter.length * times) {
        const cur = Math.floor(i / times);
        i += 1;
        return iter[cur];
      }
    }
    return value;
  }

  function getCurrentValue(values) {
    let index = -1;
    let l = values.length;

    function increment() {
      ++index;
      if (index < l) {
        return values[index];
      } else {
        index = -1;
        ++index;
        return values[index];
      }
    }

    return increment;
  }

  async function getTopographyData(latLang) {
    var newObj = {};
    newObj.topography = await getTopography(latLang, options);
    newObj.latlng = latLang;
    setTopographyData((prev) => [...prev, newObj]);
  }

  let degree = getCurrentValueForDegree(
    [
      0, 345, 330, 315, 300, 285, 270, 255, 240, 225, 210, 195, 180, 165, 150,
      135, 120, 105, 90, 75, 60, 45, 30, 15,
    ],
    3
  );

  let distance = getCurrentValue([141, 308, 475]);
  let max = (a, f) =>
    a.reduce((m, x) => (m["topography"][f] > x["topography"][f] ? m : x));
  let min = (a, f) =>
    a.reduce((m, x) => (m["topography"][f] < x["topography"][f] ? m : x));

  function setMarkerToSegment(degree, distance) {
    const { lat, lng } = initRadiusForCircle;
    const marker = L.GeometryUtil.destination(
      { lat, lng },
      degree(),
      distance()
    );
    return marker;
  }

  useEffect(() => {
    if (init) {
      markers
        .map(() => setMarkerToSegment(degree, distance))
        .map((marker) => getTopographyData(marker));
      setInit(false);
    }
    return () => setInit(true);
  }, []);

  useEffect(() => {
    // console.log("topographyData ", topographyData);
    if (topographyData.length === amountOfMarkersOnLoad) {
      const routingInfo = [];
      const highestEl = max(topographyData, "elevation");
      const lowestEl = min(topographyData, "elevation");

      routingInfo.push({ highestEl, lowestEl });

      handleInitPointsInRoutingMachine(routingInfo);
    }
  }, [topographyData.length]);

  return (
    <>
      <Spinner showOrHide={startingPointsRoutingMachine.length != true} />{" "}
      {startingPointsRoutingMachine.length != true ? (
        <Spinner showOrHide={startingPointsRoutingMachine.length} />
      ) : (
        <RoutingMachine
          startingPoints={startingPointsRoutingMachine}
          options={options}
          topographyData={topographyData}
        />
      )}{" "}
    </>
  );
}

const MemoizedInitialMarkers = React.memo(IntialMarkers);

export default function MyMap() {
  const [cirlcleRadius, setCircleRadius] = useState(500);
  const circleRef = useRef();
  const amountOfMarkersOnLoad = 72;
  const [initRadiusForCircle, setInitialRadiusForInitCircle] = useState([]);

  return (
    <MapContainer
      center={[40.74097760020495, -73.76170149999999]}
      scrollWheelZoom={false}
      zoom={15}
      whenReady={(e) => {
        const { lat, lng } = e.target._lastCenter;
        setInitialRadiusForInitCircle({ lat, lng });
        // Topography.getTopography(e.target._lastCenter, options)
        //   .then((results) => console.log(results));
      }}
    >
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/${process.env.MAPBOX_USERNAME}/${process.env.MAPBOX_STYLE_ID}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.MAPBOX_ACCESS_TOKEN}`}
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
      />{" "}
      <MemoizedInitialMarkers
        initRadiusForCircle={initRadiusForCircle}
        amountOfMarkersOnLoad={amountOfMarkersOnLoad}
      />{" "}
    </MapContainer>
  );
}
