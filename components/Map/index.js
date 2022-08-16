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

import { mapState } from "components/Context/MapContext";

import {
  getCurrentValue,
  getCurrentValueForDegree,
  max,
  min,
} from "utils/index";

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

  var { state } = mapState();

  var { topographyData } = state;
  var { dispatch } = mapState();

  const [reverseGeoCodeData, setReverseGeoCodeData] = useState([]);
  const [startingPointsRoutingMachine, startingPointsForRoutingMachine] =
    useState([]);
  const [init, setInit] = useState(true);

  const handleInitPointsInRoutingMachine = (initStartingPoints) => {
    startingPointsForRoutingMachine(initStartingPoints);
  };

  async function getTopographyData(latLang) {
    var newObj = {};
    newObj.topography = await getTopography(latLang, options);
    newObj.latlng = latLang;
    dispatch({ type: "setTopographyData", payload: newObj });
  }

  let degree = getCurrentValueForDegree(
    [
      0, 345, 330, 315, 300, 285, 270, 255, 240, 225, 210, 195, 180, 165, 150,
      135, 120, 105, 90, 75, 60, 45, 30, 15,
    ],
    3
  );

  let distance = getCurrentValue([141, 308, 475]);

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
      if (topographyData.length < amountOfMarkersOnLoad) {
        markers
          .map(() => setMarkerToSegment(degree, distance))
          .map((marker) => getTopographyData(marker));
      }
    }
    return () => setInit(false);
  }, [amountOfMarkersOnLoad]);

  useEffect(() => {
    if (topographyData?.length === amountOfMarkersOnLoad) {
      const routingInfo = [];
      const highestEl = max(topographyData, "elevation");
      const lowestEl = min(topographyData, "elevation");

      routingInfo.push({ highestEl, lowestEl });

      handleInitPointsInRoutingMachine(routingInfo);
    }
  }, [topographyData?.length]);

  return (
    <>
      <Spinner showOrHide={startingPointsRoutingMachine.length != true} />{" "}
      {startingPointsRoutingMachine.length != true ? (
        <Spinner showOrHide={startingPointsRoutingMachine.length} />
      ) : (
        <>
          <RoutingMachine
            amountOfMarkersOnLoad={amountOfMarkersOnLoad}
            startingPoints={startingPointsRoutingMachine}
            options={options}
            topographyData={topographyData}
          />
        </>
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
        amountOfMarkersOnLoad={amountOfMarkersOnLoad}
        initRadiusForCircle={initRadiusForCircle}
      />{" "}
    </MapContainer>
  );
}
