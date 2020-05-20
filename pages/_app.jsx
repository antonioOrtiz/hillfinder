import React from 'react';
import { Provider } from 'react-redux';

import App from 'next/app';
import withRedux from 'next-redux-wrapper';
import { PersistGate } from 'redux-persist/integration/react';

import reduxStore from '../store/index';

import withReactRouter from '../with-react-router/with-react-router';
import 'semantic-ui-css/semantic.min.css';
import 'leaflet/dist/leaflet.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'semantic-ui-css/semantic.css';
import 'font-awesome/css/font-awesome.min.css';
import '../styles/styles.scss';

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
      <Provider store={store}>
        <PersistGate persistor={store.__PERSISTOR} loading={null}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    );
  }
}

export default withRedux(reduxStore)(withReactRouter(MyApp));
