/* eslint-disable object-shorthand */
import React, { useContext } from 'react';

const initialState = { modalActive: false, avatarModalActive: false };

const UIStateContext = React.createContext();
const UIContextDispatch = React.createContext();

function UIProvider({ children }) {
  function userReducer(state, { type, payload }) {

    switch (type) {

      case 'modalActive': {
        return { ...state, ...{ modalActive: true } }
      }

      case 'modalInactive': {
        return { ...state, ...{ modalActive: false } }
      }

      default: {
        throw new Error(`Unhandled action type: ${type}`);
      }
    }
  }

  const [state, dispatch] = userReducer(userReducer, initialState);

  return (
    <UIStateContext.Provider value={{ state: state }}>
      <UIContextDispatch.Provider value={{ dispatch: dispatch }}>
        {children}
      </UIContextDispatch.Provider>
    </UIStateContext.Provider>
  );

}

function userState() {
  const context = useContext(UIStateContext);
  if (context === undefined) {
    throw new Error('userState must be used within a UserProvider');
  }
  return context;
}

function userDispatch() {
  const context = useContext(UIContextDispatch);
  if (context === undefined) {
    throw new Error('userDispatch must be used within a UserProvider');
  }
  return context;
}
export default UIContextDispatch;

export { UIProvider, userState, userDispatch };
