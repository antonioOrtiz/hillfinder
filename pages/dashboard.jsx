import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logOutUser } from '../store/reducers/users/index';
import { withRouter } from 'react-router-dom';
import dynamic from 'next/dynamic';
import { Card, Header, Icon, Grid, Divider } from 'semantic-ui-react';
import MyHeader from '../components/Header/Header.jsx';
import Map from '../components/Map';

import { userState } from '../components/Context/UserContext.jsx';

var Dashboard = () => {
  var { state } = userState();
  var { currentMapZoom, currentMapCenter } = state;
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
              <Map currentMapCenter={currentMapCenter} currentMapZoom={currentMapZoom} />
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
