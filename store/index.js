import { applyMiddleware, combineReducers, createStore } from 'redux';

/* imported reducers */
import ui, { uiStartState } from './reducers/ui/index';
import users, { usersStartState } from './reducers/users/index';

import { composeWithDevTools } from 'redux-devtools-extension';
import { createMigrate, persistStore } from 'redux-persist';

import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

var rootReducer = combineReducers({
  users: users,
  ui: ui
});

var state = { ...uiStartState, ...usersStartState };

// var startState = Object.assign({}, uiStartState, usersStartState)

export default (initialState = state) => {
  let store;

  const isClient = typeof window !== 'undefined';
  if (isClient) {
    const { persistReducer } = require('redux-persist');
    const storage = require('redux-persist/lib/storage').default;
    const persistConfig = {
      key: 'root',
      storage,
      stateReconciler: autoMergeLevel2,
      whitelist: ['users', 'ui']
    };
    store = createStore(
      persistReducer(persistConfig, rootReducer),
      initialState,
      composeWithDevTools(
        applyMiddleware(thunkMiddleware, createLogger({ collapsed: false }))
      )
    );
    store.__PERSISTOR = persistStore(store);
  } else {
    store = createStore(
      rootReducer,
      initialState,
      composeWithDevTools(
        applyMiddleware(thunkMiddleware, createLogger({ collapsed: false }))
      )
    );
  }
  return store;
};
