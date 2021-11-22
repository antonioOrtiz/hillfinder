/* eslint-disable object-shorthand */
import React, { useContext, useReducer } from 'react';

const initialState = { showModal: false, avatarModalActive: false, token: '' };


const UserStateContext = React.createContext();
const UserContextDispatch = React.createContext();


function UIProvider({ children }) {
  function userReducer(state, action) {

    switch (action.type) {

      case 'showModal': {
        return { ...state, ...{ showModal: true } }
      }

      case 'hideModal': {
        return { ...state, ...{ showModal: false } }
      }

      case 'token': {
        return { ...state, ...{ token: action.payload.token } }
      }

      default: {
        throw new Error(`Unhandled action type: ${action.type}`);
      }
    }
  }

  const [state, dispatch] = useReducer(userReducer, initialState);


  return (
    <UserStateContext.Provider value={{ state: state }}>
      <UserContextDispatch.Provider value={{ dispatch: dispatch }}>
        {children}
      </UserContextDispatch.Provider>
    </UserStateContext.Provider>
  );
}

function uiState() {
  const context = useContext(UserStateContext);
  if (context === undefined) {
    throw new Error('uiState must be used within a UserProvider');
  }
  return context;
}

function uiDispatch() {
  const context = useContext(UserContextDispatch);
  if (context === undefined) {
    throw new Error('uiDispatch must be used within a UserProvider');
  }
  return context;
}

export default UserContextDispatch;

export { UIProvider, uiState, uiDispatch };
