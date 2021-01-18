import React, { useState, useEffect, useContext, useReducer } from 'react';

var initialState = {
  avatar: '/static/uploads/profile-avatars/placeholder.jpg',
  id: null,
  isRoutingVisible: false,
  removeRoutingMachine: false,
  isLengthOfMarkersLessThanTwo: true,
  isAvatarUploading: true,
  isMapLoading: true,
  markers: [],
  currentMap: {}
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
    // console.log('state ', state);
    // console.log(' type ', type);
    // console.log('payload ', payload);

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

      case 'setIsRoutingVisible': {
        return {
          ...state,
          ...{ isRoutingVisible: payload.isRoutingVisible }
        };
      }

      case 'setIsAvatarUploading': {
        return {
          ...state,
          ...{ isAvatarUploading: payload.isAvatarUploading }
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
          markers: state.isLengthOfMarkersLessThanTwo
            ? state.markers.concat(payload.marker)
            : state.makers
        };
      }

      case 'deleteUserMarkers': {
        return {
          ...state,
          ...{
            markers: state.markers.filter((item, index, arr) => {
              if (arr[index] === arr[arr.length - 1]) {
                return false;
              }
              return true;
            })
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

      case 'isMapLoading': {
        return {
          ...state,
          ...{
            isMapLoading: payload.isMapLoading
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

      case 'setMap': {
        return {
          ...state,
          currentMap: payload.currentMap
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
