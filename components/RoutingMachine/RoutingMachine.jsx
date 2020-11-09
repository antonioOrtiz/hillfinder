import L from "leaflet";
import "leaflet-routing-machine";
import { withLeaflet } from "react-leaflet";


function Routing({myMapRef, latLng}){
 console.log("latLng ", latLng);

  //  useEffect(() => {

  // }),[startingCoords.lat, startingCoords.lng, endingCoords.lat, endingCoords.lng];


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

  let leafletElement = L.Routing.control({
    waypoints: [L.latLng(startingCoords.lat, startingCoords.lng), L.latLng(endingCoords.lat, endingCoords.lng)]
  }).addTo(myMapRef)

    return leafletElement;
}

export default withLeaflet(Routing);
