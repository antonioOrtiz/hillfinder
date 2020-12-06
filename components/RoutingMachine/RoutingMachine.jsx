import { MapLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { withLeaflet } from "react-leaflet";


class Routing extends MapLayer {
 constructor(props) {
    super(props);
  }

  createLeafletElement(props) {
    const { map, coords, icon } = this.props;

    var dStart = L.latLng(coords.fromLat, coords.fromLon);
    var dGoal = L.latLng(coords.toLat, coords.toLon);


     if (map && !this.routing) {

    this.routing = L.Routing.control({
      collapsible: true,
      position: 'bottomleft',
       lineOptions: {
      styles: [{color: 'chartreuse', opacity: 1, weight: 5}]
     },
      waypoints: [dStart, dGoal],
      createMarker: function(i, waypoints, n) {
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
    });

    }

    return this.routing.getPlan();
  }

  componentDidMount(){
    const { map } = this.props;

 console.log("map ", map);
    map.addControl(this.routing);
  }

  updateLeafletElement(fromProps, toProps){
    if (toProps.removeRoutingMachine !== false){
      this.routing.setWaypoints([]);
    }
  }

  componentWillUnmount() {
    this.destroyRouting();
  }

  destroyRouting() {
    if (this.props.map) {
      this.props.map.removeControl(this.routing);
    }
  }
}

export default withLeaflet(Routing);
