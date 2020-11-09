import React from 'react';
import { CloudinaryContext } from 'cloudinary-react';

import { Provider } from 'react-redux';
import { UserProvider } from '../components/UserContext/UserContext';
import App from 'next/app';
import withRedux from 'next-redux-wrapper';
import { PersistGate } from 'redux-persist/integration/react';
import nextWithReactRouter from '../next-with-react-router/next-with-react-router';

import reduxStore from '../store/index';

import 'semantic-ui-css/semantic.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '../styles/styles.scss';
import 'leaflet/dist/leaflet.css';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};
    return { pageProps };
  }
  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <UserProvider>
        <Provider store={store}>
          <PersistGate persistor={store.__PERSISTOR} loading={null}>
            <CloudinaryContext cloudName="hillfinders">
              <Component {...pageProps} />
            </CloudinaryContext>
          </PersistGate>
        </Provider>
      </UserProvider>
    );
  }
}

export default withRedux(reduxStore)(nextWithReactRouter(MyApp));
