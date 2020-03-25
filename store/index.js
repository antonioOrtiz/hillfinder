import { applyMiddleware, combineReducers, createStore } from 'redux'



/* imported reducers */
import ui from './reducers/ui/index'
import users from './reducers/users/index'

import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore } from 'redux-persist';

import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

var rootReducer = combineReducers({
  users: users,
  ui: ui
})

// var startState = Object.assign({}, uiStartState, usersStartState)

export default () => {
  let store;
  const isClient = typeof window !== 'undefined';
  if (isClient) {
    const { persistReducer } = require('redux-persist');
    const storage = require('redux-persist/lib/storage').default;
    const persistConfig = {
      key: 'root',
      storage,
      stateReconciler: autoMergeLevel2,

      whitelist: ['users', 'ui'], // place to select which state you want to persist

    }
    store = createStore(
      persistReducer(persistConfig, rootReducer),
      composeWithDevTools(applyMiddleware(
        thunkMiddleware,
        createLogger({ collapsed: false })
      ))
    );
    store.__PERSISTOR = persistStore(store);
  } else {
    store = createStore(
      rootReducer,
      composeWithDevTools(applyMiddleware(
        thunkMiddleware,
        createLogger({ collapsed: false })
      ))
    );
  }
  return store;
};
