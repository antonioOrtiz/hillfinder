import L from "leaflet";
import { useEffect } from 'react'
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import { startIcon, finishIcon } from '../Icon/'

const createRoutineMachineLayer = ({ startingPoints, options }) => {

  const instance = L.Routing.control({
    collapsible: true,
    position: 'bottomright',
    waypoints: [
      L.latLng(
        startingPoints[0]?.highestEl?.latlng?.lat,
        startingPoints[0]?.highestEl?.latlng?.lng),
      L.latLng(
        startingPoints[0]?.lowestEl?.latlng?.lat,
        startingPoints[0]?.lowestEl?.latlng?.lng
      ),
    ],
    lineOptions: {
      styles: [{ color: 'chartreuse', opacity: 1, weight: 5 }]
    },
    createMarker: function (i, wp, nWps) {
      if (i === 0) {
        return L.marker(wp.latLng, {
          icon: startIcon,
          draggable: true,
          keyboard: true,
          alt: 'current location'
        })
      }
      if (i === nWps - 1) {
        return L.marker(wp.latLng, {
          icon: finishIcon,
          draggable: true,
          alt: 'current destination'
        })
      }
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
