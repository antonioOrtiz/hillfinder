import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

/* initial state */
var startState = { isLoggedIn: false }


/* actions */

export const logInUser = () => {
    return {
        type: 'LOGINUSER',
        isLoggedIn: true
    }
}

/* reducer */

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGINUSER':
            return {
                isLoggedIn: action.isLoggedIn,
            }
        default:
            return state
    }
};
const middleware = composeWithDevTools(applyMiddleware(
    thunkMiddleware,
    createLogger({ collapsed: true })
))


// create a store
export const initializeStore = (initialState = startState) => {
    return createStore(
        reducer,
        initialState,
        middleware
    )
}

// export const initStore = (initialState = startState) => {
//     return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));
// }
