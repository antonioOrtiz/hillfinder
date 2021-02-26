import React from 'react';
import { CloudinaryContext } from 'cloudinary-react';

import { Provider } from 'react-redux';
import { UserProvider } from '../components/Context/UserContext';
import { UIProvider } from '../components/Context/UIContext';
import App from 'next/app';
import withRedux from 'next-redux-wrapper';
import { PersistGate } from 'redux-persist/integration/react';
import nextWithReactRouter from '../next-with-react-router/next-with-react-router';

import reduxStore from '../store/index';

import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

// after calling LogRocket.init()
setupLogRocketReact(LogRocket);
LogRocket.getSessionURL(sessionURL => {
  Sentry.configureScope(scope => {
    scope.setExtra('sessionURL', sessionURL);
  });
});

import 'semantic-ui-css/semantic.min.css';
import 'font-awesome/css/font-awesome.min.css';

import 'leaflet/dist/leaflet.css';
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css';

import '../styles/styles.scss';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

Sentry.init({
  dsn: 'https://022c1229a0bb4d69a5401b4616d1dd23@o534748.ingest.sentry.io/5653848',
  integrations: [new Integrations.BrowserTracing()],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0
});

class MyApp extends App {
  componentDidMount() {
    /* initial kickOff of Service Worker !*/
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js').then(
          function(registration) {
            console.log(
              'Service Worker registration successful with scope: ',
              registration.scope
            );
          },
          function(err) {
            console.log('Service Worker registration failed: ', err);
          }
        );
      });
    }
  }

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
