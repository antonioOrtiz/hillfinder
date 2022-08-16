import L from "leaflet";
import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import "leaflet-routing-machine";
import * as esriLeafletGeocoder from "esri-leaflet-geocoder";

import axios from "axios";

import { startIcon, finishIcon } from "../Icon/";
import { mapState } from "components/Context/MapContext";

import tt from "@tomtom-international/web-sdk-services";

export function RoutingMachine({ amountOfMarkersOnLoad, startingPoints }) {
  const map = useMap();

  var { state } = mapState();

  var { topographyData } = state;
  var { dispatch } = mapState();

  var [reverseGeocodeData, setReverseGeoCodeData] = useState([]);

  const customCallback = (callback) => (context, error, routes) => {
    if (!routes) return;
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
      const originalCallback = options.callback;

      L.Routing.OSRMv1.prototype.route.call(
        this,
        waypoints,
        customCallback(originalCallback),
        options
      );
    },
  });

  useEffect(() => {
    const updated = [...topographyData];

    updated.map((typoObj, index) => {
      setTimeout(async () => {
        /*

        // Also tried this

         function callbackFn(response) {
           console.log("response", response);
         }
         tt.services
           .reverseGeocode({
             key: process.env.TOM_TOM_API,
             position: typoObj.latlng,
           })
           .then(callbackFn);
           */
        var { latitude, longitude } = typoObj.latlng;
        var res = await axios(
          `https://api.tomtom.com/search/2/reverseGeocode/crossStreet/${latitude},${longitude}.json?limit=1&spatialKeys=false&radius=10000&allowFreeformNewLine=false&view=Unified&key=${process.env.TOM_TOM_API}`
        );
        var { addresses } = res.data;
        var { address, position } = addresses[0];
        var [lat, lng] = position.split(",").map((p) => +p);

        return { ...typoObj, ...{ latlng: { lat, lng }, address } };

        // dispatch({
        //   type: "setTopographyData",
        //   payload: {
        //     ...typoObj,
        //     latlng: { lat, lng },
        //     address,
        //   },
      }, 5000);
    });
  }, []);

  useEffect(() => {
    console.log("topographyData ", topographyData);
  }, [topographyData.length]);

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
      // router: new router(),

      show: true,
      showAlternatives: false,

      waypoints,
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, []);

  return null;
}
