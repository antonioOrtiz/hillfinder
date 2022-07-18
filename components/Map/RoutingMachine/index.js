import L from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import "leaflet-routing-machine";
import { startIcon, finishIcon } from "../Icon/";

export function RoutingMachine({ startingPoints }) {
  const map = useMap();

  const customCallback = (callback) => (context, error, routes) => {
    for (const route of routes) {
      route.coordinates = [...route.coordinates, L.latLng(12.33, 49.6753)];
    }

    callback(context, error, routes);
  };

  const router = L.Routing.OSRMv1.extend({
    initialize: function (options) {
      L.Routing.OSRMv1.prototype.initialize.call(this, options);
    },

    route: function (waypoints, callback, context, options) {
      console.log("waypoints ", waypoints);
      console.log("callback ", callback);
      console.log("context", context);
      console.log("options ", options);
      const originalCallback = options.callback;

      L.Routing.OSRMv1.prototype.route.call(
        waypoints,
        customCallback(originalCallback),
        this,
        options
      );
    },
  });

  useEffect(() => {
    if (!map) return;

    const waypoints = [
      L.latLng(
        startingPoints[0]?.highestEl?.latlng?.lat,
        startingPoints[0]?.highestEl?.latlng?.lng
      ),
      L.latLng(
        startingPoints[0]?.lowestEl?.latlng?.lat,
        startingPoints[0]?.lowestEl?.latlng?.lng
      ),
    ];

    const routingControl = L.Routing.control({
      addWaypoints: false,

      collapsible: true,
      createMarker: function (i, wp, nWps) {
        if (i === 0) {
          return L.marker(wp.latLng, {
            icon: startIcon,
            draggable: true,
            keyboard: true,
            alt: "current location",
          });
        }
        if (i === nWps - 1) {
          return L.marker(wp.latLng, {
            icon: finishIcon,
            draggable: true,
            alt: "current destination",
          });
        }
      },
      draggableWaypoints: true,

      fitSelectedRoutes: true,

      geocoder: L.Control.Geocoder.nominatim(),

      lineOptions: {
        styles: [{ color: "chartreuse", opacity: 1, weight: 5 }],
      },
      position: "bottomright",

      routeWhileDragging: true,
      router: new router(),

      show: true,
      showAlternatives: false,

      waypoints,
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map]);

  return null;
}
