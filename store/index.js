git
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'react-thunk';

// ACTION TYPES
const GET_USER = 'GET_USER'

// ACTION CREATORS
export function getUser(user) {
    const action = {
        type: GET_USER,
        user,
    };
    return action;
}

//THUNK CREATORS

export function fetchUser(userId) {
    return function thunk(dispatch) {
        return axios
            .get('/users/' + `${userId}`)
            .then(res => res.data)
            .then(user => {
                const action = getUser(user);
                dispatch(action);
            });
    };
}

// REDUCER
const reducer = function(state = [], action) {
    switch (action.type) {
        case GET_USER:
            return action.user;
        default:
            return state;
    }
};


export var initStore = (initialState = startState) => {
    return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))))
}