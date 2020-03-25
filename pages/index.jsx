import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logInUser, logOutUser } from '../store/reducers/users/index';
import { bindActionCreators } from 'redux';

import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import LinkNavWithLayout from './LinkNavWithLayout';
import Index from './home';
import Profile from './profile';
import Dashboard from './dashboard';
import ForgotPassword from './forgotPassword';
import ResetPassword from './resetPassword';
import Login from './login';
import Confirmation from './confirmation';
import { modalStateOn, modalStateOff } from '../store/reducers/ui/index';

import Register from './register';

class App extends Component {
  static getInitialProps({
    store,
    isAccountVerified,
    isLoggedIn,
    logInUser,
    logOutUser
  }) {
    console.log('store', store);

    return { store, isAccountVerified, isLoggedIn, logInUser, logOutUser };
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { isLoggedIn, isAccountVerified } = this.props;
    console.log('isAccountVerified ', isAccountVerified);

    console.log('this.props ', this.props);

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
            isLoggedIn || isAccountVerified ? (
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

          <PrivateRoute path="/profile" isLoggedIn={isLoggedIn}>
            <LinkNavWithLayout data={navBars}>
              <Profile user />
            </LinkNavWithLayout>
          </PrivateRoute>

          <PrivateRoute path="/dashboard" isLoggedIn={isLoggedIn}>
            <LinkNavWithLayout data={navBars}>
              <Dashboard />
            </LinkNavWithLayout>
          </PrivateRoute>

          <Route path="/login" render={props => <Login {...props} />} />

          <Route
            path="/forgot_password"
            render={props => <ForgotPassword {...props} />}
          />

          <Route path="/reset_password" render={props => <ResetPassword {...props} />} />

          <PrivateRoute
            path="/confirmed/:token"
            isAccountVerified={isAccountVerified}
            component={Confirmation}
          />

          <Route path="/register" render={props => <Register {...props} />} />

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
  const { isLoggedIn, userAvatar, isAccountVerified } = users;
  const { modalActive } = ui;
  return { isLoggedIn, isAccountVerified, userAvatar, modalActive };
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({ modalStateOn, modalStateOff, logInUser, logOutUser }, dispatch);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
