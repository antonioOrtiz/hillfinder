import L from "leaflet";
import { useEffect, useState } from 'react'
import GeometryUtil from "leaflet-geometryutil";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutineMachineLayer = ({ startingPoints }) => {
  const [pointsOnLoad, setPointsOnLoad] = useState({})

  function addDistanceToMaker(lat, lng) {
    return GeometryUtil.destination(L.latLng(lat, lng), 180, 10);
  }

  useEffect(() => {
    var updatedPointsOnLoad = startingPoints.map(sp => {
      return {
        starting: L.latLng(...sp),
        end: addDistanceToMaker(...sp)
      }
    })
    setPointsOnLoad(updatedPointsOnLoad)
  }, [startingPoints])



  console.log("pointsOnLoad ", pointsOnLoad);
  const instance = L.Routing.control({
    waypoints: [
      L.latLng(40.74128501730291, -73.76121707494242),
      L.latLng(40.74216368204567, -73.7596824213515)
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


  console.log("instance ", instance);

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
