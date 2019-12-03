import { createStore, applyMiddleware } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore } from 'redux-persist';

import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk';

/* initial state */
const startState = { isLoggedIn: false, modalActive: false }

/* action types */
export const actionTypes = {
    IS_LOGGED_IN: 'IS_LOGGED_IN',
    IS_LOGGED_OUT: 'IS_LOGGED_OUT',
    MODAL_ACTIVE: 'MODAL_ACTIVE',
    MODAL_INACTIVE: 'MODAL_INACTIVE',


}

/* reducer(s) */
export const reducer = (state = startState, action) => {
    switch (action.type) {
        case actionTypes.IS_LOGGED_IN:
          return Object.assign({}, state, {
            isLoggedIn: true,
          });
        case actionTypes.IS_LOGGED_OUT:
          return Object.assign({}, state, {
            isLoggedIn: false,
          });
        case actionTypes.MODAL_ACTIVE:
          return Object.assign({}, state, {
            modalActive: true
          });
        case actionTypes.MODAL_INACTIVE:
          return Object.assign({}, state, {
            modalActive: false
      });
        default:
            return state
    }
};

/* actions */
export const logInUser = () => {
    return { type: actionTypes.IS_LOGGED_IN }
}
export const logOutUser = () => {
    return { type: actionTypes.IS_LOGGED_OUT }
}
export const modalStateOn = () => {
 return { type: actionTypes.MODAL_ACTIVE, modalActive: true}
}

export const modalStateOff = () => {
 return { type: actionTypes.MODAL_INACTIVE, modalActive: false }
}




export default () => {
 let store;
 const isClient = typeof window !== 'undefined';
 if (isClient) {
  const { persistReducer } = require('redux-persist');
  const storage = require('redux-persist/lib/storage').default;
  const persistConfig = {
   key: 'primary',
   storage,
   whitelist: ['isLoggedIn', 'modalActive'], // place to select which state you want to persist

  }
  store = createStore(
   persistReducer(persistConfig, reducer),
   startState,
     composeWithDevTools(applyMiddleware(
            thunkMiddleware,
            createLogger({ collapsed: false })
        ))
  );
  store.__PERSISTOR = persistStore(store);
 } else {
  store = createStore(
   reducer,
   startState,
     composeWithDevTools(applyMiddleware(
            thunkMiddleware,
            createLogger({ collapsed: false })
        ))
  );
 }
 return store;
};


