import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logOutUser } from '../store/reducers/users/index';
import { withRouter } from 'react-router-dom';

import Card from 'semantic-ui-react/dist/commonjs/views/Card/'
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider/'
import Header from 'semantic-ui-react/dist/commonjs/elements/Header'
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon'
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid'

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
