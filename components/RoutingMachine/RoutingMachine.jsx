import { MapLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { withLeaflet } from "react-leaflet";

class Routing extends MapLayer {
  createLeafletElement() {
    var { myMapRef, latLng } = this.props;

    var startingCoords = {
      lat: latLng[0].lat,
      lng: latLng[0].lng
    }

    console.log("startingCoords.lat ", startingCoords.lat);
    console.log("startingCoords.lng", startingCoords.lng);

    var endingCoords = {
      lat: latLng[0].lat,
      lng: latLng[1].lng
    }

    var leafletElement = new L.Routing.control({
    waypoints: [L.latLng(startingCoords.lat, startingCoords.lng), L.latLng(endingCoords.lat, endingCoords.lng)]
        }).addTo(myMapRef.leafletElement);
        return leafletElement.getPlan();
      }
    }

export default withLeaflet(Routing);
