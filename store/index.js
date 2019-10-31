import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk';

/* initial state */
const startState = { isLoggedIn: false }

/* action types */
export const actionTypes = {
   IS_LOGGED_IN: 'IS_LOGGED_IN',
   IS_LOGGED_OUT: 'IS_LOGGED_OUT'
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
        })
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


const persistConfig = {
    key: 'root',
    storage,

}

const persistedReducer = persistReducer(persistConfig, reducer)

// create a store
export const initializeStore = (initialState = startState) => {
    return createStore(
        persistedReducer,
        initialState,
        composeWithDevTools(applyMiddleware(
            thunkMiddleware,
            createLogger({ collapsed: false })
        ))
    )
}
