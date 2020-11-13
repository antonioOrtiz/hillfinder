import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logInUser, logOutUser } from '../store/reducers/users/index';
import { bindActionCreators } from 'redux';
import { Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router';

import LinkNavWithLayout from './LinkNavWithLayout-b';
import Index from './home';
import Profile from './profile';
import Dashboard from './dashboard';
import ForgotPassword from './forgotPassword';
import UpdatePassword from './updatePassword';
import Login from './login';
import Confirmation from './confirmation';
import { modalStateOn, modalStateOff } from '../store/reducers/ui/index';

import Register from './register';

class App extends Component {
  static getInitialProps({
    store,
    accountNotVerified,
    isLoggedIn,
    logInUser,
    logOutUser
  }) {
    return {
      store,
      accountNotVerified,
      isLoggedIn,
      logInUser,
      logOutUser
    };
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { isLoggedIn, accountNotVerified } = this.props;

    let navBars = [
      { name: 'Home', path: '/' },
      { name: 'Profile', path: '/profile' },
      { name: 'Dashboard', path: '/dashboard' },
      { name: 'Log in', path: '/login' },
      { name: 'Register', path: '/register' }
    ];

    function PrivateRoute({ children, ...rest }) {
      return (
        <Route
          {...rest}
          render={({ location }) =>
            isLoggedIn && !accountNotVerified ? (
              { ...children }
            ) : (
              <Redirect
                to={{
                  pathname: '/',
                  state: { from: location }
                }}
              />
            )
          }
        />
      );
    }

    return (
      <>
        <Switch>
          <Route
            path="/"
            isLoggedIn={isLoggedIn}
            exact
            render={props => (
              <LinkNavWithLayout {...props} data={navBars}>
                <Index />
              </LinkNavWithLayout>
            )}
          />

          <PrivateRoute path="/profile/" isLoggedIn={isLoggedIn}>
            <LinkNavWithLayout data={navBars}>
              <Profile user />
            </LinkNavWithLayout>
          </PrivateRoute>

          <PrivateRoute path="/dashboard/" isLoggedIn={isLoggedIn}>
            <LinkNavWithLayout data={navBars}>
              <Dashboard />
            </LinkNavWithLayout>
          </PrivateRoute>

          <Route
            path="/login/"
            render={props => <Login accountNotVerified={accountNotVerified} {...props} />}
          />

          <Route
            path="/forgot_password/"
            render={props => <ForgotPassword {...props} />}
          />

          <PrivateRoute path="/update_password/:token/" component={UpdatePassword} />

          <PrivateRoute
            path="/confirmed/:token/"
            accountNotVerified={accountNotVerified}
            component={Confirmation}
          />

          <Route path="/register/" render={props => <Register {...props} />} />

          <Route
            component={({ location }) => (
              <h1>
                Sorry but the page{' '}
                <p style={{ fontWeight: 'strong' }}>{location.pathname.substring(1)} </p>{' '}
                Page, Could Not be found
              </h1>
            )}
          />
        </Switch>
      </>
    );
  }
}

function mapStateToProps(state) {
  const { ui, users } = state;
  const { isLoggedIn, accountNotVerified } = users;
  const { modalActive } = ui;
  return { isLoggedIn, accountNotVerified, modalActive };
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({ modalStateOn, modalStateOff, logInUser, logOutUser }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
