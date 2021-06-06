import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logInUser, logOutUser } from '../store/reducers/users/index';
import { bindActionCreators } from 'redux';
import { Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import dynamic from 'next/dynamic';

import LinkNavWithLayout from './LinkNavWithLayout';
import Index from './home';
import Profile from './profile';

import Dashboard from './dashboard';

import ForgotPassword from './forgotPassword';
import UpdatePassword from './updatePassword';
import Login from './login';
import Confirmation from './confirmation';
import { modalStateOn, modalStateOff } from '../store/reducers/ui/index';

import Register from './register';

function App({ accountNotVerified, isLoggedIn }) {
  let navBars = [
    { name: 'Home', path: '/' },
    { name: 'Profile', path: '/profile' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Log in', path: '/login' },
    { name: 'Register', path: '/register' }
  ];

  function PrivateRoute({ children, ...rest }) {
    console.log('children ', children);

    return (
      <Route
        key={document.location.href}
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

        <Route
          path="/login"
          render={props => <Login accountNotVerified={accountNotVerified} {...props} />}
        />

        <Route path="/forgot_password" render={props => <ForgotPassword {...props} />} />

        <PrivateRoute path="/update_password/:token/" component={UpdatePassword} />

        <PrivateRoute
          path="/confirmed/:token"
          accountNotVerified={accountNotVerified}
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

export async function getServerSideProps({ accountNotVerified, isLoggedIn }) {
  return { props: { accountNotVerified, isLoggedIn } };
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
