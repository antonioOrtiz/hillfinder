import React from 'react'
import App, { Container } from 'next/app';

import withReduxStore from '../lib/with-redux-store'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'


import withReactRouter from '../with-next-router/with-next-router'


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
    <Container>
      <Component {...pageProps} />
    </Container>
    </PersistGate>
   </Provider>
  )
 }
}

export default withReduxStore(withReactRouter(MyApp))
