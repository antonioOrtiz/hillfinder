import { MapLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { withLeaflet } from "react-leaflet";


class Routing extends MapLayer {
 constructor(props) {
    super(props);
  }

  createLeafletElement() {
    const { map, coords, icon,  removeFrom, removeTo } = this.props;


    var dStart = L.latLng(coords.fromLat, coords.fromLon);
    var dGoal = L.latLng(coords.toLat, coords.toLon);


    this.leafletElement = L.Routing.control({
      collapsible: true,
       lineOptions: {
      styles: [{color: 'chartreuse', opacity: 1, weight: 5}]
     },
      waypoints: [dStart, dGoal],
      createMarker: function(i, waypoints, n) {
        if (i === 0) {
         marker_icon = icon.startIcon;
        }


       var marker_icon;
        if (i === 0) {
         marker_icon = icon.startIcon;
        }
        else if (i == n - 1) {
         marker_icon = icon.endIcon
        }
        var marker = L.marker(i === 0 ? dStart : dGoal,{
         draggable: true,
         icon: marker_icon
        });
        return marker;
     }
    }).addTo(map.leafletElement);

    return this.leafletElement.getPlan();
  }


  updateLeafletElement(props) {
    if(this.leafletElement){
          const { isRoutingDone } = this.props;

      if(isRoutingDone === false){

 console.log("isRoutingDone ", isRoutingDone);
        this.leafletElement.routing.spliceWaypoints(0, 2);
        return this.leafletElement.getPlan();
      }
    }
  }


}
export default withLeaflet(Routing);
