import React from 'react';
import { CloudinaryContext } from 'cloudinary-react';

import { Provider } from 'react-redux';
import { UserProvider, userState } from '../components/Context/UserContext';
import { UIProvider } from '../components/Context/UIContext';
import App from 'next/app';
import withRedux from 'next-redux-wrapper';
import { PersistGate } from 'redux-persist/integration/react';
import nextWithReactRouter from '../next-with-react-router/next-with-react-router';

import reduxStore from '../store/index';

import 'semantic-ui-css/semantic.min.css';
import 'font-awesome/css/font-awesome.min.css';

import 'leaflet/dist/leaflet.css';
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css';

import '../styles/styles.scss';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

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
        <UIProvider>
          <Provider store={store}>
            <PersistGate persistor={store.__PERSISTOR} loading={null}>
              <CloudinaryContext cloudName="hillfinders">
                <Component {...pageProps} />
              </CloudinaryContext>
            </PersistGate>
          </Provider>
        </UIProvider>
      </UserProvider>
    );
  }
}

export default withRedux(reduxStore)(nextWithReactRouter(MyApp));
