import { MapLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import { withLeaflet } from 'react-leaflet';
import UserContextDispatch from '../Context/UserContext.jsx';
import { Dimmer, Loader } from 'semantic-ui-react';
import { isEqual } from 'lodash';

class Routing extends MapLayer {
  static contextType = UserContextDispatch;

  constructor(props) {
    super(props);
    this.state = {
      showSpinner: false,
      localDispatch: null,
      markerIsBeingDragged: false,
      currentMarker: {}
    };

    this.handleLoader = this.handleLoader.bind(this);
    this.handleRemoveWayPoint = this.handleRemoveWayPoint.bind(this);
    this.handleClearWayPoints = this.handleClearWayPoints.bind(this);
    this.handleSpliceWaypoints = this.handleSpliceWaypoints.bind(this);
    this.handleSetMarker = this.handleSetMarker.bind(this);
  }

  handleSetMarker(marker) {
    var { markers } = this.props;

    if (markers[0] !== undefined && markers[0].alt === 'current location') {
      this.setState(prevState => ({
        currentMarker: { ...prevState.currentMarker, ...marker }
      }));
    }
    if (markers[1] !== undefined && markers[1].alt === 'current destination') {
      this.setState(prevState => ({
        currentMarker: { ...prevState.currentMarker, ...marker }
      }));
    }

    console.log('this.state ', this.state);
  }

  handleSpliceWaypoints(start, end, obj) {
    this.control.spliceWaypoints(start, end, obj);
  }

  handleLoader() {
    var { showSpinner } = this.state;

    if (this.state.showSpinner === false) {
      this.setState(function(prevState) {
        return { showSpinner: !prevState.showSpinner };
      });
      return (
        <Dimmer active inverted>
          <Loader />
        </Dimmer>
      );
    }
    this.setState(function(prevState) {
      return { showSpinner: (prevState.showSpinner = true) };
    });
  }

  handleRemoveWayPoint() {
    var waypoints = this.control.getWaypoints();

    for (let i = waypoints.length - 1; i >= 0; i--) {
      console.log('waypoints[i].latLng !== null ', waypoints[i].latLng !== null);
      if (waypoints[i].latLng !== null) {
        waypoints[i].latLng = null;
        break;
      }
    }
    console.log('waypoints ', waypoints);
    this.control.setWaypoints(waypoints);
  }

  handleClearWayPoints() {
    this.control.setWaypoints([L.latLng(null, null), L.latLng(null, null)]);
  }

  componentDidMount() {
    const { map } = this.props.leaflet;

    var { markers } = this.props;

    this.control.setWaypoints([L.latLng(markers[0]), L.latLng(markers[1])]);
    this.setState(prevState => {
      localDispatch: prevState.localDispatch = this.context.dispatch;
    });

    map.addControl(this.control);
  }

  createLeafletElement(props) {
    const { map } = this.props.leaflet;

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

    if (map && !this.control) {
      var RoutingMachineRef = this;

      this.control = L.Routing.control({
        collapsible: true,
        show: false,
        position: 'bottomleft',
        lineOptions: {
          styles: [{ color: 'chartreuse', opacity: 1, weight: 5 }]
        },
        waypoints: [null],
        createMarker: function(i, wp, nWps) {
          if (i === 0) {
            return L.marker(wp.latLng, {
              icon: startIcon,
              draggable: true,
              keyboard: true,
              alt: 'current location'
            }).on('move', function(e) {
              e.target._latlng.alt = 'current location';
              console.log('e.target._latlng', e.target._latlng);

              console.log('there be dragons start!!', e);
              RoutingMachineRef.setState(prevState => ({
                markerIsBeingDragged: !prevState.markerIsBeingDragged
              }));
              RoutingMachineRef.handleSetMarker(e.target._latlng);
            });
          }
          if (i === nWps - 1) {
            return L.marker(wp.latLng, {
              icon: endIcon,
              draggable: true,
              alt: 'current destination'
            }).on('move', function(e) {
              e.target._latlng.alt = 'current destination';

              console.log(' e.target._latlng', e.target._latlng);
              RoutingMachineRef.setState(prevState => ({
                markerIsBeingDragged: !prevState.markerIsBeingDragged
              }));
              console.log('there be dragons dest!!', e);
              RoutingMachineRef.handleSetMarker(e.target._latlng);
            });
          }
        }
      });

      L.Routing.errorControl(this.control).addTo(map);
    }

    return this.control.getPlan();
  }

  updateLeafletElement(fromProps, toProps) {
    var { currentMarker, localDispatch, markerIsBeingDragged } = this.state;

    // console.log('fromProps, toProps ', fromProps, toProps);
    if (markerIsBeingDragged && currentMarker.hasOwnProperty('alt')) {
      if (isEqual(toProps.markers[0], currentMarker) === false) {
        localDispatch({
          type: 'updateMarkers',
          payload: {
            marker: currentMarker
          }
        });
      }
      if (isEqual(toProps.markers[1], currentMarker) === false) {
        localDispatch({
          type: 'updateMarkers',
          payload: {
            marker: currentMarker
          }
        });
      }

      this.setState(prevState => ({
        markerIsBeingDragged: !prevState.markerIsBeingDragged
      }));
    }

    if (toProps.removeRoutingMachine !== false) {
      this.control.setWaypoints([]);
    }
  }

  componentWillUnmount() {
    console.log("'unmount' ", 'unmount');
    this.destroyRouting();
  }

  destroyRouting() {
    const { map } = this.props.leaflet;
    if (map) {
      map.removeControl(this.control);
    }
  }
}

export default withLeaflet(Routing);
