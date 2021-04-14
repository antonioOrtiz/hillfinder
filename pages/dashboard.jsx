pimport React, { useState, useEffect, Children } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logOutUser } from '../store/reducers/users/index';
import { withRouter } from 'react-router-dom';
import dynamic from 'next/dynamic';
import { Card, Header, Icon, Grid, Divider } from 'semantic-ui-react';
import MyHeader from '../components/Header/Header.jsx';

import Control from 'react-leaflet-control';
// import MapboxLayer from '../MapboxLayer/MapboxLayer.jsx';
import Routing from '../components/RoutingMachine/RoutingMachine.jsx';
import LocateControl from '../components/LocateControl/LocateControl.jsx';
import { userState, userDispatch } from '../components/Context/UserContext.jsx';


const MyMap = dynamic(() => import('../components/Map/MyMap'), {
  loading: () => <p>Loading ...</p>,
  ssr: false
});


var {
  isRoutingVisible,
  removeRoutingMachine,
  isLengthOfMarkersLessThanTwo,
  markers
} = state;

var mapRefForRoutingMachine = useRef();

var Dashboard = ({ props }) => {
  var { state } = userState();

  var [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
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
  if (!isBrowser) {
    return null;
  }

  return (
    <>
      <Grid container columns={1} stackable style={{ height: '100vh' }}>
        <Grid.Column>
          <MyHeader content="Go find a hill!" margin={'0'} textAlign={'center'} />
          <Card fluid>
            <Card.Content>
              <Divider horizontal>
                <Header as="h4">
                  <Icon name="map" color="green" />
                  Your map!
                </Header>
              </Divider>
              <MyMap>
                {TileLayer => {
                  <>
                    <LocateControl map={map} startDirectly />
                    <TileLayer
                      url={`https://api.mapbox.com/styles/v1/${
                        process.env.MAPBOX_USERNAME
                      }/${
                        process.env.MAPBOX_STYLE_ID
                      }/tiles/256/{z}/{x}/{y}@2x?access_token=${
                        process.env.MAPBOX_ACCESS_TOKEN
                      }`}
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
                    {map && (
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
                  </>;
                }}
              </MyMap>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    </>
  );
};

function mapStateToProps(state) {
  const { users } = state;
  const { isLoggedIn } = users;
  return { isLoggedIn };
}
const mapDispatchToProps = dispatch => bindActionCreators({ logOutUser }, dispatch);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Dashboard)
);
