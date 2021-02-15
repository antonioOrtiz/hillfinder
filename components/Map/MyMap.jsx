import React, { useState, useEffect, useRef } from 'react';
import { Button, Dimmer, Loader } from 'semantic-ui-react';

import L from 'leaflet';
import * as ELG from 'esri-leaflet-geocoder';

import Control from 'react-leaflet-control';
// import MapboxLayer from '../MapboxLayer/MapboxLayer.jsx';
import Routing from '../RoutingMachine/RoutingMachine.jsx';

import { parse, stringify } from 'flatted';

import { userState, userDispatch } from '../Context/UserContext.jsx';

import { isEqual } from 'lodash';

function currentMapViewPropsAreEqual(prevProps, nextProps) {
  console.log('prevProps, nextProps ', prevProps, nextProps);

  console.log(
    'prevProps.currentMapCenter === nextProps.currentMapCenter && prevProps.initMapZoom === nextProps.initMapZoom && prevProps.Map === nextProps.Map &&prevProps.TileLayer === nextProps.TileLayer ',
    prevProps.currentMapCenter === nextProps.currentMapCenter &&
      prevProps.initMapZoom === nextProps.initMapZoom
  );
  return (
    prevProps.currentMapCenter === nextProps.currentMapCenter &&
    prevProps.initMapZoom === nextProps.initMapZoom
  );
}

function MyMap({ initMapZoom, currentMapCenter, Map, TileLayer }) {
  var [animate, setAnimate] = useState(false);
  var [userLocation, setUserLocation] = useState(null);

  var handleWaypointsOnMapRef = useRef(handleWaypointsOnMap);
  var mapRef = useRef();
  var mapRefForRoutingMachine = useRef();
  var { state } = userState();
  var { dispatch } = userDispatch();
  var {
    currentMap,
    isRoutingVisible,
    removeRoutingMachine,
    isLengthOfMarkersLessThanTwo,
    currentMapAccuracy,
    markers
  } = state;

  useEffect(() => {
    handleWaypointsOnMapRef.current = handleWaypointsOnMap;
  }); // update after each render

  useEffect(() => {
    var { current = {} } = mapRef;
    var { leafletElement: map } = current;

    // console.log('currentMap ', initMapZoom);
    if (map !== null) {
      map.locate({
        locateOptions: {
          watch: true,
          enableHighAccuracy: true,
          setView: true
        }
      });
      map.on('locationfound', handleOnLocationFound);
      map.on('locationerror', handleOnLocationError);
    }

    return () => {
      map.off('locationfound', handleOnLocationFound);
      map.off('locationerror', handleOnLocationError);
    };
  }, []);

  useEffect(() => {
    var searchControl = new ELG.Geosearch({
      useMapBounds: false
    });
    var { current = {} } = mapRef;
    var { leafletElement: map } = current;

    console.log('mapRef ', mapRef);

    searchControl.addTo(map);

    var cb = e => handleWaypointsOnMapRef.current(e); // then use most recent cb value

    searchControl.on('results', cb);

    if (Object.keys(map).length === 0) {
      dispatch({
        type: 'setMap',
        payload: {
          currentMap: stringify(map)
        }
      });
    }

    return () => {
      searchControl.off('results', cb);
    };
  }, []);

  function handleOnClickClearOneMarkerAtTime(e) {
    L.DomEvent.stopPropagation(e);

    dispatch({
      type: 'setIsRoutingVisible',
      payload: {
        isRoutingVisible: false
      }
    });
    mapRefForRoutingMachine.current.handleRemoveWayPoint();
    dispatch({
      type: 'deleteUserMarkers'
    });
  }

  function handleOnClickClearAllMarkers(e) {
    L.DomEvent.stopPropagation(e);

    mapRefForRoutingMachine.current.handleClearWayPoints();
    dispatch({
      type: 'resetUserMarkers'
    });
  }

  function handleOnClickMarkerClick(e) {
    e.originalEvent.view.L.DomEvent.stopPropagation(e);
  }

  function handleWaypointsOnMap(e) {
    var { current = {} } = mapRef;
    var { leafletElement: map } = current;
    dispatch({
      type: 'setIsRoutingVisible',
      payload: {
        isRoutingVisible: true
      }
    });
    dispatch({
      type: 'setRemoveRoutingMachine',
      payload: {
        removeRoutingMachine: false
      }
    });

    function createButton(label, container) {
      var btn = L.DomUtil.create('button', '', container);
      btn.setAttribute('type', 'button');
      btn.innerHTML = label;
      return btn;
    }
    var container = L.DomUtil.create('div'),
      startBtn = createButton('Start from this location', container),
      destBtn = createButton('Go to this location', container);

    L.popup()
      .setContent(container)
      .setLatLng(e.latlng)
      .openOn(map);

    L.DomEvent.on(startBtn, 'click', function() {
      if (markers.length === 0) {
        e.latlng.alt = 'current location';

        console.log('adding current location', e.latlng);

        dispatch({
          type: 'addMarker',
          payload: {
            marker: e.latlng
          }
        });
      }

      if (markers[0] != undefined) {
        e.latlng.alt = 'current location';
        console.log('updating current location', e.latlng);

        dispatch({
          type: 'updateMarkers',
          payload: {
            marker: e.latlng
          }
        });
      }

      mapRefForRoutingMachine.current.handleSpliceWaypoints(0, 1, e.latlng);

      map.closePopup();
    });

    L.DomEvent.on(
      destBtn,
      'click',
      function() {
        console.log('e', e);
        if (markers.length === 1) {
          e.latlng.alt = 'current destination';
          console.log('adding destination ', e.latlng);
          dispatch({
            type: 'addMarker',
            payload: {
              marker: e.latlng
            }
          });
        }
        if (markers.length === 2 && markers[1] !== undefined) {
          e.latlng.alt = 'current destination';
          console.log('updating destination', e.latlng);

          dispatch({
            type: 'updateMarkers',
            payload: {
              marker: e.latlng
            }
          });
        }

        mapRefForRoutingMachine.current.handleSpliceWaypoints(1, 1, e.latlng);

        map.closePopup();
      }.bind(this)
    );
  }

  function handleOnLocationFound(e) {
    console.log('fire handleOnLocationFound', e);

    console.log('currentMapCenter ', currentMapCenter);

    var { current = {} } = mapRef;
    var { leafletElement: map } = current;

    if (map != null) {
      if (currentMapCenter[0] == null) {
        console.log('fo');
        dispatch({
          type: 'setCurrentMapCenter',
          payload: {
            currentMapCenter: e.latlng
          }
        });
        dispatch({
          type: 'setCurrentMapAccuracy',
          payload: {
            currentMapAccuracy: e.accuracy
          }
        });

        L.circleMarker(e.latlng, {
          radius: e.accuracy,
          className: 'circle-transition',
          fillOpacity: 0.5
        }).addTo(map);
      } else {
        if (isEqual(currentMapCenter[0], e.latlng) === false) {
          dispatch({
            type: 'setCurrentMapCenter',
            payload: {
              currentMapCenter: e.latlng
            }
          });

          L.circleMarker(e.latlng, {
            radius: e.accuracy,
            className: 'circle-transition',
            fillOpacity: 0.5
          }).addTo(map);
        }
      }
    }
  }

  function handleOnLocationError(e) {
    console.log('error happend! ', e);

    console.log('currentMapCenter[0]; ', currentMapCenter[0]);
    console.log('currentMapCenter[0] === true ', currentMapCenter[0] === true);
    var { current = {} } = mapRef;
    var { leafletElement: map } = current;
    map.setZoom(initMapZoom);
    L.circle(currentMapCenter, currentMapAccuracy).addTo(map);
  }

  console.log('mapRef; ', mapRef);
  return !mapRef ? (
    <Dimmer active inverted>
      <Loader />
    </Dimmer>
  ) : (
    <Map
      preferCanvas={true}
      id="myMap"
      center={currentMapCenter}
      animate={animate}
      zoom={initMapZoom}
      ref={mapRef}
      onClick={e => handleWaypointsOnMap(e)}
    >
      <Dimmer active inverted>
        <Loader />
      </Dimmer>{' '}
      ||
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/${process.env.MAPBOX_USERNAME}/${
          process.env.MAPBOX_STYLE_ID
        }/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.MAPBOX_ACCESS_TOKEN}`}
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
      />
      <Control position="bottomleft">
        <div className="leaflet-bar leaflet-control remove-marker-container">
          <a
            onClick={e => handleOnClickClearOneMarkerAtTime(e)}
            className="remove-marker leaflet-bar-part leaflet-bar-part-single"
            title="Remove one marker!"
            alt="Remove one marker!"
            role="button"
            href="#"
          />
        </div>
      </Control>
      <Control position="bottomright">
        <div className="leaflet-bar leaflet-control remove-all-markers-container">
          <i
            onClick={e => handleOnClickClearAllMarkers(e)}
            className="trash alternate large icon leaflet-bar-part leaflet-bar-part-single"
            title="Remove all markers!"
            alt="Remove all markers!"
            role="button"
            href="#"
          />
        </div>
      </Control>
      {mapRef && (
        <Routing
          isRoutingVisible={isRoutingVisible}
          ref={mapRefForRoutingMachine}
          markers={markers}
          stringify={stringify}
          isLengthOfMarkersLessThanTwo={isLengthOfMarkersLessThanTwo}
          removeRoutingMachine={removeRoutingMachine}
          userLocation={userLocation}
        />
      )}
    </Map>
  );
}

var MemoizedMyMap = React.memo(MyMap, currentMapViewPropsAreEqual);

export default MemoizedMyMap;
