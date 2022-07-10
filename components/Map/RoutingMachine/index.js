import L from "leaflet";
import { useEffect } from 'react'
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import { startIcon, finishIcon } from '../Icon/'

const createRoutineMachineLayer = ({ startingPoints, options }) => {

  console.log("L.latLng(startingPoints[0]?.highestEl?.latlng?.lat, startingPoints[0]?.highestEl?.latlng?.lng)", L.latLng(startingPoints[0]?.highestEl?.latlng?.lat, startingPoints[0]?.highestEl?.latlng?.lng));


  console.log("L.latLng(startingPoints[0]?.lowestEl?.latlng?.lat, startingPoints[0]?.lowestEl?.latlng?.lng) ", L.latLng(
    startingPoints[0]?.lowestEl?.latlng?.lat,
    startingPoints[0]?.lowestEl?.latlng?.lng
  ));

  const instance = L.Routing.control({
    addWaypoints: false,

    collapsible: true,
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
    draggableWaypoints: true,

    fitSelectedRoutes: true,

    geocoder: L.Control.Geocoder.nominatim(),

    lineOptions: {
      styles: [{ color: 'chartreuse', opacity: 1, weight: 5 }]
    },
    position: 'bottomright',
    plan: new L.Routing.plan({
      createMarker: function (i, wp, nWps) {
        if (i === 0) {
          console.log('wp', wp)
        }
        if (i === nWps - 1) {
          console.log('wp', wp)
        }
      },
    }),
    routeWhileDragging: true,


    show: true,
    showAlternatives: false,

    waypoints: [
      L.latLng(
        startingPoints[0]?.highestEl?.latlng?.lat,
        startingPoints[0]?.highestEl?.latlng?.lng),
      L.latLng(
        startingPoints[0]?.lowestEl?.latlng?.lat,
        startingPoints[0]?.lowestEl?.latlng?.lng
      ),
    ],
  });




  return instance;
};


const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
