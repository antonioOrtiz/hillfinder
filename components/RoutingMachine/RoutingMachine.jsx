import { MapLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import { withLeaflet } from 'react-leaflet';
import UserContextDispatch from '../Context/UserContext.jsx';
import { Dimmer, Loader } from 'semantic-ui-react';

class Routing extends MapLayer {
  static contextType = UserContextDispatch;

  constructor(props) {
    super(props);
    this.state = {
      from: 0,
      to: 0,
      showSpinner: false,
      localDispatch: null,
      routing: null,
      markerStart: null
    };
    this.handleFromIncrement = this.handleFromIncrement.bind(this);
    this.handleResetFrom = this.handleResetFrom.bind(this);

    this.handleLoader = this.handleLoader.bind(this);

    this.handleSpliceWaypoints = this.handleSpliceWaypoints.bind(this);
    this.handleMySetState = this.handleMySetState.bind(this);
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

  handleMySetState(context, event) {
    this.setState(prevState => {
      markers: prevState.markers.start = {
        this: context,
        event: event
      };
    });
  }

  handleResetFrom() {
    this.setState({ from: (this.state.from = 0) });
  }

  handleSpliceWaypoints(s, f, e) {
    this.routing.spliceWaypoints(s, f, e.latlng);
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
      if (this.state != undefined) {
        if (this.state.routing !== null) {
          var { routing } = this.state;
        }
      }
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
            });
          }
          if (i === nWps - 1) {
            return L.marker(wp.latLng, {
              icon: endIcon,
              draggable: true,
              alt: 'destination'
            });
          }
        }
      })
        .on('routingstart', function(e) {
          console.log('e ', e);
        })
        .on('routesfound', function(e) {
          console.log('routers found ', e);
        })

        .on('routeselected', function(e) {
          console.log('e ', e);
        })
        .on('waypointschanged', function(e) {
          console.log('waypoint changed', e);
        });

      L.Routing.errorControl(this.control).addTo(map);
    }

    return this.control.getPlan();
  }

  componentDidMount() {
    const { map } = this.props.leaflet;
    var { markers } = this.props;

    console.log('markers ', markers);
    this.setState(prevState => {
      localDispatch: prevState.localDispatch = this.context.dispatch;
    });

    this.setState(prevState => {
      routing: prevState.routing = this.control;
    });

    console.log('this.getWaypoints() ', this.control.getWaypoints());

    var waypoints = this.control.getWaypoints();

    waypoints.forEach((waypoint, i, arr) => {
      if (markers != undefined) {
        if (
          arr[0].latLng == null &&
          markers[0] !== undefined &&
          (arr[1].latLng == null && markers[1] !== undefined)
        ) {
          this.control.setWaypoints([
            L.latLng(markers[0] || null),
            L.latLng(markers[1] || null)
          ]);
        }
      }
    });

    map.addControl(this.control);
  }

  updateLeafletElement(fromProps, toProps) {
    const { map } = this.props.leaflet;

    var { markers } = this.props;

    function createButton(label, container) {
      var btn = L.DomUtil.create('button', '', container);
      btn.setAttribute('type', 'button');
      btn.innerHTML = label;
      return btn;
    }

    var { localDispatch } = this.state;
    var container = L.DomUtil.create('div'),
      startBtn = createButton('Start from this location', container),
      destBtn = createButton('Go to this location', container);
    map.on(
      'click',
      function(e) {
        localDispatch({
          type: 'setIsRoutingVisible',
          payload: {
            isRoutingVisible: true
          }
        });

        if (markers.length === 2) {
          console.log("Can't add anymore markers");
        } else {
          L.popup()
            .setContent(container)
            .setLatLng(e.latlng)
            .openOn(map);

          L.DomEvent.on(
            startBtn,
            'click',
            function() {
              console.log('e ', e);

              if (markers[0] != undefined) {
                if (markers[0].alt == 'current location') {
                  localDispatch({
                    type: 'updateMarkers',
                    payload: {
                      marker: e.latlng
                    }
                  });
                }
              } else {
                e.latlng.alt = 'current location';

                localDispatch({
                  type: 'addMarker',
                  payload: {
                    marker: e.latlng
                  }
                });
              }
              this.control.spliceWaypoints(0, 1, e.latlng);
              map.closePopup();
            }.bind(this)
          );

          L.DomEvent.on(
            destBtn,
            'click',
            function() {
              if (markers[1] != undefined) {
                if (markers[1].alt == 'current destination') {
                  localDispatch({
                    type: 'updateMarkers',
                    payload: {
                      marker: e.latlng
                    }
                  });
                }
              } else {
                e.latlng.alt = 'current destination';

                localDispatch({
                  type: 'addMarker',
                  payload: {
                    marker: e.latlng
                  }
                });
              }

              this.control.spliceWaypoints(
                this.control.getWaypoints().length - 1,
                1,
                e.latlng
              );
              // e.latlng.alt = 'current destination';
              // console.log('e.latlng ', e.latlng);
              // localDispatch({
              //   type: 'addMarker',
              //   payload: {
              //     marker: e.latlng
              //   }
              // });
              map.closePopup();
            }.bind(this)
          );
        }
      }.bind(this)
    );

    this.control.on('waypointschanged', function(e) {
      console.log('waypoint changed', e);
      e.waypoints.forEach((waypoint, i, arr) => {
        if (waypoint.latLng !== null) {
          if (i === 0) {
            waypoint.latLng.alt = 'current location';
          } else {
            waypoint.latLng.alt = 'current destination';
          }

          console.log('waypoint.latLng ', waypoint.latLng);
          localDispatch({
            type: 'updateMarkers',
            payload: {
              marker: waypoint.latLng
            }
          });
        }
      });
    });

    if (toProps.removeRoutingMachine !== false) {
      this.control.setWaypoints([]);
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('nextProps, nextState ', nextProps, nextState);
    // return this.state.value != nextState.value;
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
