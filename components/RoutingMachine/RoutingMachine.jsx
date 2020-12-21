import { MapLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import { withLeaflet } from 'react-leaflet';

class Routing extends MapLayer {
  constructor(props) {
    super(props);
    this.state = {
      waypointLength: 0
    };
  }

  createLeafletElement(props) {
    const { map, userCoords, icon } = this.props;

    if (Array.isArray(userCoords) && userCoords.length === 2) {
      var dStart = L.latLng(userCoords[0].lat, userCoords[0].lng);
      var dGoal = L.latLng(userCoords[1].lat, userCoords[1].lng);
    }

    if (map && !this.routing) {
      this.routing = L.Routing.control({
        collapsible: true,
        position: 'bottomleft',
        lineOptions: {
          styles: [{ color: 'chartreuse', opacity: 1, weight: 5 }]
        },
        waypoints: [dStart, dGoal],
        createMarker: function(i, waypoints, n) {
          var marker_icon;

          if (i === 0) {
            marker_icon = icon.startIcon;
          } else if (i == n - 1) {
            marker_icon = icon.endIcon;
          }
          var marker = L.marker(i === 0 ? dStart : dGoal, {
            draggable: true,
            icon: marker_icon
          });
          return marker;
        }
      });
    }

    return this.routing.getPlan();
  }

  componentDidMount() {
    const { map } = this.props.leaflet;

    map.addControl(this.routing);
  }

  updateLeafletElement(fromProps, toProps) {
    if (toProps.removeRoutingMachine !== false) {
      this.routing.setWaypoints([]);
    }
  }

  componentWillUnmount() {
    this.setState(() => {
      this.waypointLength = 2;
    });
    this.destroyRouting();
  }

  destroyRouting() {
    const { map } = this.props.leaflet;
    if (map) {
      map.removeControl(this.routing);
    }
  }
}

export default withLeaflet(Routing);
