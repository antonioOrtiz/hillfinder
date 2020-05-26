// import { combineReducers } from 'redux';
// import { configureStore } from '@reduxjs/toolkit';
// import { createLogger } from 'redux-logger';

// /* imported reducers */
// import ui from './reducers/ui/index';
// import users from './reducers/users/index';

// import thunkMiddleware from 'redux-thunk';
// import { persistStore } from 'redux-persist';

// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
// import { persistReducer } from 'redux-persist';

// var reducers = combineReducers({
//   users: users,
//   ui: ui
// });

// export default () => {
//   let store;
//   const isClient = typeof window !== 'undefined';
//   if (isClient) {
//     var storage = require('redux-persist/lib/storage').default;
//     var persistConfig = {
//       key: 'root',
//       storage,
//       stateReconciler: autoMergeLevel2,

//       whitelist: ['users', 'ui'] // place to select which state you want to persist
//     };

//     var persistedReducer = persistReducer(persistConfig, reducers);

//     store = configureStore({
//       reducer: persistedReducer,
//       middleware: [thunkMiddleware, createLogger()]
//     });
//     store.__PERSISTOR = persistStore(store);
//   } else {
//     store = configureStore({
//       reducer: persistedReducer,
//       middleware: [thunkMiddleware, createLogger()]
//     });
//   }
//   return store;
// };

import { combineReducers } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

/* imported reducers */
import ui from './reducers/ui/index';
import users from './reducers/users/index';

import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';

import { createLogger } from 'redux-logger';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

var reducers = combineReducers({
  users: users,
  ui: ui
});

// var startState = Object.assign({}, uiStartState, usersStartState)

export default () => {
  let rootReducer;

  const isClient = typeof window !== 'undefined';
  if (isClient) {
    const { persistReducer } = require('redux-persist');
    const storage = require('redux-persist/lib/storage').default;
    const persistConfig = {
      key: 'root',
      storage,
      stateReconciler: autoMergeLevel2,

      whitelist: ['users', 'ui'] // place to select which state you want to persist
    };
    rootReducer = persistReducer(persistConfig, reducers);
  } else {
    rootReducer = reducers;
  }
  const store = configureStore({
    reducer: rootReducer,
    middleware: [
      ...getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
      }),
      createLogger()
    ]
  });
  store.__PERSISTOR = persistStore(store);

  return store;
};
