import { MapLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import { withLeaflet } from 'react-leaflet';

class Routing extends MapLayer {
  constructor(props) {
    super(props);
  }

  createLeafletElement(props) {
    const { userMarkers, icon, userLocation } = this.props;
    const { map } = this.props.leaflet;

    if (map && !this.routing) {
      this.routing = L.Routing.control({
        collapsible: true,
        show: true,
        position: 'bottomleft',
        lineOptions: {
          styles: [{ color: 'chartreuse', opacity: 1, weight: 5 }]
        },
        waypoints: [null],

        createMarker: function(i, wp, nWps) {
          console.log('i', i);
          if (i === 0) {
            return L.marker(wp.latLng, {
              icon: icon.startIcon,
              draggable: true
            });
          }
          if (i === nWps - 1) {
            return L.marker(wp.latLng, {
              icon: icon.endIcon,
              draggable: true
            });
          }
        }
      });

      map.on(
        'click',
        function(e) {
          var container = L.DomUtil.create('div'),
            startBtn = createButton('Start from this location', container),
            destBtn = createButton('Go to this location', container);

          L.popup()
            .setContent(container)
            .setLatLng(e.latlng)
            .openOn(map);

          L.DomEvent.on(
            startBtn,
            'click',
            function() {
              this.spliceWaypoints(0, 1, e.latlng);
              map.closePopup();
            }.bind(this)
          );
          L.DomEvent.on(
            destBtn,
            'click',
            function() {
              this.spliceWaypoints(this.getWaypoints().length - 1, 1, e.latlng);
              map.closePopup();
            }.bind(this)
          );
        }.bind(this.routing)
      );
    }

    function createButton(label, container) {
      var btn = L.DomUtil.create('button', '', container);
      btn.setAttribute('type', 'button');
      btn.innerHTML = label;
      return btn;
    }

    return this.routing.getPlan();
  }

  componentDidMount() {
    const { map } = this.props.leaflet;

    console.log('map ', map);

    map.addControl(this.routing);
  }

  updateLeafletElement(fromProps, toProps) {
    if (toProps.removeRoutingMachine !== false) {
      this.routing.setWaypoints([]);
    }
  }

  componentWillUnmount() {
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
