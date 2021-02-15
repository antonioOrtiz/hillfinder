import React, { useState, useEffect, useContext, useReducer } from 'react';
import { parse } from 'flatted';

var initialState = {
  avatar: '/static/uploads/profile-avatars/placeholder.jpg',
  id: null,
  isRoutingVisible: false,
  removeRoutingMachine: false,
  isLengthOfMarkersLessThanTwo: true,
  isAvatarUploading: true,
  isMapLoading: true,
  markers: [],
  currentMap: {},
  initMapZoom: 15,
  currentMapAccuracy: null,
  currentMapZoom: null,
  currentMapCenter: []
};

var UserStateContext = React.createContext();
var UserContextDispatch = React.createContext();

function setLocalStorage(key, value) {
  function isJson(item) {
    item = typeof item !== 'string' ? JSON.stringify(item) : item;

    try {
      item = JSON.parse(item);
    } catch (e) {
      return false;
    }

    if (typeof item === 'object' && item !== null) {
      return true;
    }

    return false;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (errors) {
    // catch possible errors:
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
    console.log('state ', state);
    console.log(' type ', type);
    console.log('payload ', payload);

    switch (type) {
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
          ...{ currentMapView: payload.currentMapView }
        };
      }

      case 'setCurrentMapCenter': {
        return {
          ...state,
          currentMapCenter: { ...state.currentMapCenter, ...payload.currentMapCenter }
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
              console.log('element, payload ', element, payload.marker);
              console.log(
                'element.alt ===  payload.marker.alt ',
                element.alt === payload.marker.alt
              );
              if (element.alt === payload.marker.alt) {
                return { ...element, ...payload.marker };
              } else {
                return element;
              }
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

  const [user, setUser] = useState(() => getLocalStorage('user', initialState));

  var [state, dispatch] = useReducer(userReducer, user);

  useEffect(() => {
    setLocalStorage('user', state);
  }, [state]);

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

export { UserProvider, userState, userDispatch };
