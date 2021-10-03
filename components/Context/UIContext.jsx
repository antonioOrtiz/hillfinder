/* eslint-disable object-shorthand */
import React, { useContext, useReducer } from 'react';

const initialState = { modalActive: false, avatarModalActive: false, token: '' };


const UserStateContext = React.createContext();
const UserContextDispatch = React.createContext();


function UIProvider({ children }) {
  function userReducer(state, { type, payload }) {

    switch (type) {

      case 'modalActive': {
        return { ...state, ...{ modalActive: true } }
      }

      case 'modalInactive': {
        return { ...state, ...{ modalActive: false } }
      }

      case 'token': {
        return { ...state, ...{ token: payload.token } }
      }

      default: {
        throw new Error(`Unhandled action type: ${type}`);
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

function userState() {
  const context = useContext(UserStateContext);
  if (context === undefined) {
    throw new Error('userState must be used within a UserProvider');
  }
  return context;
}

function userDispatch() {
  const context = useContext(UserContextDispatch);
  if (context === undefined) {
    throw new Error('userDispatch must be used within a UserProvider');
  }
  return context;
}

export default UserContextDispatch;

export { UIProvider, userState, userDispatch };
