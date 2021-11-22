/* eslint-disable object-shorthand */
import React, { useContext, useReducer } from 'react';

const initialState = { showModal: false, avatarModalActive: false, token: '' };


const UiStateContext = React.createContext();
const UiContextDispatch = React.createContext();


function UIProvider({ children }) {
  function uiReducer(state, action) {

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

  const [state, dispatch] = useReducer(uiReducer, initialState);


  return (
    <UiStateContext.Provider value={{ uiState: state }}>
      <UiContextDispatch.Provider value={{ uidispatch: dispatch }}>
        {children}
      </UiContextDispatch.Provider>
    </UiStateContext.Provider>
  );
}

function uiState() {
  const context = useContext(UiStateContext);
  if (context === undefined) {
    throw new Error('uiState must be used within a UserProvider');
  }
  return context;
}

function uiDispatch() {
  const context = useContext(UiContextDispatch);
  if (context === undefined) {
    throw new Error('uiDispatch must be used within a UserProvider');
  }
  return context;
}

export default UiContextDispatch;

export { UIProvider, uiState, uiDispatch };
