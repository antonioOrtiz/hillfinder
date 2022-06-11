import L from "leaflet";
import { useEffect, useState } from 'react'
import GeometryUtil from "leaflet-geometryutil";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutineMachineLayer = ({ startingPoints }) => {
  const [pointsOnLoad, setPointsOnLoad] = useState([])

  function addDistanceToMaker(lat, lng) {
    return GeometryUtil.destination(L.latLng(lat, lng), 180, 20);
  }

  useEffect(() => {
    console.log("startingPoints ", startingPoints);
  }, [])


  const instance = L.Routing.control({
    waypoints: [
      L.latLng(...startingPoints),
      L.latLng(addDistanceToMaker(...startingPoints))
    ],
    lineOptions: {
      styles: [{ color: "#6FA1EC", weight: 4 }]
    },
    show: false,
    addWaypoints: false,
    routeWhileDragging: true,
    draggableWaypoints: true,
    fitSelectedRoutes: true,
    showAlternatives: false
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
