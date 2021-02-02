import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logOutUser } from '../store/reducers/users/index';
import { withRouter } from 'react-router-dom';
import dynamic from 'next/dynamic';
import { Card, Header, Icon, Grid, Divider } from 'semantic-ui-react';
import MyHeader from '../components/Header/Header.jsx';
import { Map, TileLayer } from 'react-leaflet';

import { userState, userDispatch } from '../components/Context/UserContext.jsx';

const MyMap = dynamic(() => import('../components/Map/MyMap.jsx'), {
  ssr: false
});

var Dashboard = ({ props }) => {
  var { state } = userState();
  var { dispatch } = userDispatch();
  var { currentMapView } = state;
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
              <MyMap Map={Map} TileLayer={TileLayer} currentMapView={currentMapView} />
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
