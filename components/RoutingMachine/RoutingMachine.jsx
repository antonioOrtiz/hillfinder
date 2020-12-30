import { MapLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import { withLeaflet } from 'react-leaflet';

class Routing extends MapLayer {
  constructor(props) {
    super(props);

    this.state = {
      from: 0,
      to: 0
    };
    this.handleFromIncrement = this.handleFromIncrement.bind(this);
    this.handleResetFrom = this.handleResetFrom.bind(this);
    this.handleOnClickSetMarkers = this.handleOnClickSetMarkers.bind(this);
  }

  handleFromIncrement() {
    this.setState(function(prevState) {
      return { from: prevState.from + 1 };
    });
  }

  handleResetFrom() {
    this.setState({ from: (this.state.from = 0) });
  }

  handleOnClickSetMarkers(e) {
    var { from, to } = this.state;

    console.log('this.state ', this.state);
    var { setUpdateUserMarker, setUserMarkers } = this.props;

    console.log('e ', e);

    if (e.latlng) {
      var eventLatLongObj = e.latlng;
    }
    setUserMarkers(eventLatLongObj);
    // console.log('eventLatLongObj ', eventLatLongObj);
    // if (from < 1) {
    //   setUserMarkers(eventLatLongObj, 0);
    //   this.handleFromIncrement();
    // }
    // if (from === 1 && to === 0) {
    //   setUpdateUserMarker(eventLatLongObj, 1);
    //   this.handleResetFrom();
    // }
  }

  createLeafletElement(props) {
    const { userMarkers } = this.props;
    const { map } = this.props.leaflet;

    console.log('userMarkers ', userMarkers);
    var startIcon = new L.Icon({
      iconUrl:
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    var endIcon = new L.Icon({
      iconUrl:
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    if (map && !this.routing) {
      this.routing = L.Routing.control({
        collapsible: true,
        show: false,
        position: 'bottomleft',
        lineOptions: {
          styles: [{ color: 'chartreuse', opacity: 1, weight: 5 }]
        },
        waypoints: [null],

        createMarker: function(i, wp, nWps) {
          console.log('i', i);
          if (i === 0) {
            return L.marker(wp.latLng, {
              icon: startIcon,
              draggable: true
            });
          }
          if (i === nWps - 1) {
            return L.marker(wp.latLng, {
              icon: endIcon,
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
              this.routing.spliceWaypoints(0, 1, e.latlng);
              this.handleOnClickSetMarkers(e);
              map.closePopup();
            }.bind(this)
          );

          L.DomEvent.on(
            destBtn,
            'click',
            function() {
              this.routing.spliceWaypoints(
                this.routing.getWaypoints().length - 1,
                1,
                e.latlng
              );
              this.handleOnClickSetMarkers(e);

              map.closePopup();
            }.bind(this)
          );
        }.bind(this)
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

    console.log('this', this);

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
