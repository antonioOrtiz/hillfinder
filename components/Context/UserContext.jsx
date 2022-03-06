/* eslint-disable object-shorthand */
import React, { useState, useEffect, useContext, useReducer } from 'react';

const initialState = {
  avatar: '/uploads/profile-avatars/placeholder.jpg',
  accountNotVerified: null,
  isLoggedIn: null,
  id: null,
  isRoutingVisible: false,
  removeRoutingMachine: false,
  isLengthOfMarkersLessThanTwo: true,
  isAvatarUploading: true,
  isMapLoading: true,
  markers: [],
  currentMap: {},
  currentMapAccuracy: null,
  currentMapZoom: 10,
  currentMapCenter: [37.09024, -95.712891]
  // currentMapCenter: []
};

const UserStateContext = React.createContext();
const UserContextDispatch = React.createContext();

function setLocalStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (errors) {
    console.log(errors);
  }
}

function getLocalStorage(key, initialValue) {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : initialValue;
  } catch (e) {
    return initialValue;
  }
}

function UserProvider({ children }) {
  function userReducer(state, { type, payload }) {

    switch (type) {

      case 'resetUserAccountIsVerified': {
        return { ...state, ...{ accountNotVerified: null } }
      }

      case 'userAccountIsVerified': {
        return { ...state, ...{ accountNotVerified: false } }
      }

      case 'userAccountNotVerified': {
        return { ...state, ...{ accountNotVerified: true } }
      }

      case 'setIsLoggedIn': {
        return { ...state, ...{ isLoggedIn: payload } };
      }

      case 'setUserId': {
        return { ...state, ...{ id: payload.id } };
      }

      case 'setAvatar': {
        return {
          ...state,
          ...{ avatar: payload.avatar }
        };
      }

      case 'setIsAvatarUploading': {
        return {
          ...state,
          ...{ isAvatarUploading: payload.isAvatarUploading }
        };
      }

      case 'setMapZoom': {
        return {
          ...state,
          ...{ currentMapZoom: payload.currentMapZoom }
        };
      }

      case 'setCurrentMapCenter': {
        return {
          ...state,
          ...{ currentMapCenter: payload.currentMapCenter }
        };
      }

      case 'setCurrentMapAccuracy': {
        return {
          ...state,
          ...{ currentMapAccuracy: payload.currentMapAccuracy }
        };
      }

      case 'setCurrentMapLocation': {
        return {
          ...state,
          currentMapLocation: {
            ...state.currentMapLocation,
            ...payload.currentMapLocation
          }
        };
      }

      case 'isMapLoading': {
        return {
          ...state,
          ...{
            isMapLoading: payload.isMapLoading
          }
        };
      }

      case 'setMap': {
        return {
          ...state,
          currentMap: payload.currentMap
        };
      }

      case 'setIsRoutingVisible': {
        return {
          ...state,
          ...{ isRoutingVisible: payload.isRoutingVisible }
        };
      }

      case 'setRemoveRoutingMachine': {
        return {
          ...state,
          ...{
            removeRoutingMachine: payload.removeRoutingMachine
          }
        };
      }

      case 'isLengthOfMarkersLessThanTwoFalse': {
        return {
          ...state,
          ...{
            isLengthOfMarkersLessThanTwo: payload.isLengthOfMarkersLessThanTwo
          }
        };
      }

      case 'addMarker': {
        return {
          ...state,
          markers: state.markers.concat(payload.marker)
        };
      }

      case 'deleteUserMarkers': {
        return {
          ...state,
          ...{
            markers: state.markers.filter((el, i, a) => el != a[a.length - 1])
          }
        };
      }

      case 'updateMarkers': {
        return {
          ...state,

          ...{
            markers: state.markers.map(element => {

              if (element.alt === payload.marker.alt) {
                return { ...element, ...payload.marker };
              }
              return element;

            })
          }
        };
      }

      case 'resetUserMarkers': {
        return {
          ...state,
          removeRoutingMachine: true,
          isRoutingVisible: false,
          markers: []
        };
      }

      default: {
        throw new Error(`Unhandled action type: ${type}`);
      }
    }
  }

  const [user] = useState(() => getLocalStorage('user', initialState));

  const [state, dispatch] = useReducer(userReducer, user);

  useEffect(() => {
    setLocalStorage('user', state);
  }, [state]);

  return (
    <UserStateContext.Provider value={{ userstate: state }}>
      <UserContextDispatch.Provider value={{ userdispatch: dispatch }}>
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

export { UserProvider, userState, userDispatch };
