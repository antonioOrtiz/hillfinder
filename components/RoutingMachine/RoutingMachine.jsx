// import L from "leaflet";
// import "leaflet-routing-machine";

// function Routing({map, latLng}){

//  console.log("myMapRef ", map);
//   var startingCoords = {
//     lat: latLng[0].lat,
//     lng: latLng[0].lng
//   }

//  console.log("startingCoords.lat ", startingCoords.lat);
//  console.log("startingCoords.lng", startingCoords.lng);

//   var endingCoords = {
//     lat: latLng[0].lat,
//     lng: latLng[1].lng
//   }

//   let leafletElement =  L.Routing.control({
//     waypoints: [L.latLng(startingCoords.lat, startingCoords.lng), L.latLng(endingCoords.lat, endingCoords.lng)]
//   }).addTo(map)

//   return leafletElement.getPlan();
// }

// export default Routing;


import { MapLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { withLeaflet } from "react-leaflet";

class Routing extends MapLayer {




  createLeafletElement() {
    const { map, latLng } = this.props;
    // console.log("map ", map);
  var startingCoords = {
    lat: latLng[0].lat,
    lng: latLng[0].lng
  }

//  console.log("startingCoords.lat ", startingCoords.lat);
//  console.log("startingCoords.lng", startingCoords.lng);

  var endingCoords = {
    lat: latLng[0].lat,
    lng: latLng[1].lng
  }

  let leafletElement = new L.Routing.control({
    waypoints: [L.latLng(startingCoords.lat, startingCoords.lng), L.latLng(endingCoords.lat, endingCoords.lng)],
    routeWhileDragging: true,
    geocoder: L.Control.Geocoder.nominatim(),
    createMarker: function(i, wp, nWps) {
  var greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  var redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
 console.log("i", i);
 console.log("wp", wp);
 console.log("nWps", nWps);
    if (i === 0 || i === nWps - 1) {
      // here change the starting and ending icons
      return L.marker(wp.latLng, {
        icon: greenIcon // here pass the custom marker icon instance
      });
    } else {
      // here change all the others
      return L.marker(wp.latLng, {
        icon: redIcon
      });
    }
  }


  }).addTo(map.leafletElement);

  return leafletElement.getPlan();

}
}
export default withLeaflet(Routing);
