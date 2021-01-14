import { MapLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import { withLeaflet } from 'react-leaflet';

import { Dimmer, Loader } from 'semantic-ui-react';

class Routing extends MapLayer {
  constructor(props) {
    super(props);

    this.state = {
      from: 0,
      to: 0,
      showSpinner: false
    };
    this.handleFromIncrement = this.handleFromIncrement.bind(this);
    this.handleResetFrom = this.handleResetFrom.bind(this);

    this.handleLoader = this.handleLoader.bind(this);
  }

  handleFromIncrement() {
    this.setState(function(prevState) {
      return { from: prevState.from + 1 };
    });
  }

  handleLoader() {
    var { showSpinner } = this.state;

    // console.log('showSpinner ', showSpinner);
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

  handleResetFrom() {
    this.setState({ from: (this.state.from = 0) });
  }

  createLeafletElement(props) {
    const { markers, dispatch } = this.props;

    console.log('this.props; ', this.props);

    const { map } = this.props.leaflet;

    console.log('markers 56', markers);
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
            }).on('drag', function(e) {
              console.log('dragggon! roar!', e);
              e.latlng.alt = 'current location';

              dispatch({
                type: 'updateMarkers',
                payload: { marker: e.latlng }
              });
            });
          }
          if (i === nWps - 1) {
            return L.marker(wp.latLng, {
              icon: endIcon,
              draggable: true,
              alt: 'destination'
            }).on('drag', function(e) {
              console.log('dragggon! roar!', e);

              e.latlng.alt = 'destination';
              dispatch({
                type: 'updateMarkers',
                payload: { marker: e.latlng }
              });
            });
          }
        }
      })
        .on('routingstart', this.handleLoader.bind(this))
        .on('routeselected', function(e) {
          var route = e.route;
        })
        .on('routesfound routingerror', this.handleLoader.bind(this));

      L.Routing.errorControl(this.control).addTo(map);

      map.on(
        'click',
        function(e) {
          dispatch({
            type: 'setIsRoutingVisible',
            payload: {
              isRoutingVisible: true
            }
          });
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
              this.control.spliceWaypoints(0, 1, e.latlng);

              console.log('e ', e);
              e.latlng.alt = 'current location';
              console.log('e.latlng ', e.latlng);

              dispatch({
                type: 'addMarker',
                payload: {
                  marker: e.latlng
                }
              });
              map.closePopup();
            }.bind(this)
          );

          L.DomEvent.on(
            destBtn,
            'click',
            function() {
              this.control.spliceWaypoints(
                this.control.getWaypoints().length - 1,
                1,
                e.latlng
              );
              e.latlng.alt = 'current destination';
              console.log('e.latlng ', e.latlng);
              dispatch({
                type: 'addMarker',
                payload: {
                  marker: e.latlng
                }
              });
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

    return this.control.getPlan();
  }

  componentDidMount() {
    const { map } = this.props.leaflet;

    map.addControl(this.control);
  }

  updateLeafletElement(fromProps, toProps) {
    const { map } = this.props.leaflet;

    if (toProps.removeRoutingMachine !== false) {
      this.control.setWaypoints([]);
    }
  }

  componentWillUnmount() {
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
