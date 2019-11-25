import React from 'react'
import App from 'next/app';

import withReduxStore from '../lib/with-redux-store'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'


import withReactRouter from '../with-react-router.js/with-react-router'


class MyApp extends App {
 constructor(props) {
  super(props)
  this.persistor = persistStore(props.reduxStore)
 }

 render() {
  const { Component, pageProps, reduxStore } = this.props
  return (
   <Provider store={reduxStore}>
    <PersistGate
     loading={<Component {...pageProps} />}
     persistor={this.persistor}
    >
     <Component {...pageProps} />
    </PersistGate>
   </Provider>
  )
 }
}

export default withReduxStore(withReactRouter(MyApp))
