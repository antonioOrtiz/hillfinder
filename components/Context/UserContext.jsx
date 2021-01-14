import React, { useState, useEffect, useContext, useReducer } from 'react';

var initialState = {
  avatar: '/static/uploads/profile-avatars/placeholder.jpg',
  id: null,
  isRoutingVisible: false,
  removeRoutingMachine: false,
  isLengthOfMarkersLessThanTwo: true,
  isAvatarUploading: true,

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
    console.log('state, type, payload ', state, type, payload);

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
        user.isLengthOfMarkersLessThanTwo
          ? {
              ...state,
              markers: user.markers.concat(payload.marker)
            }
          : null;
        break;
      }

      case 'deleteUserMarkers': {
        return {
          ...state,
          ...{
            markers: user.markers.filter(function(e, i, a) {
              return e !== a[a.length - 1];
            })
          }
        };
      }

      case 'updateMarkers': {
        console.log('type, payload ', type, payload);
        return {
          ...state,

          ...{
            markers: user.markers.map(element => {
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

      case 'setMap': {
        return {
          ...state,
          currentMap: payload.curerntMap
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
    <UserStateContext.Provider value={state}>
      <UserContextDispatch.Provider value={dispatch}>
        {children}
      </UserContextDispatch.Provider>
    </UserStateContext.Provider>
  );
}

function userState() {
  const context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error('userState must be used within a UserProvider');
  }
  return context;
}

function userDispatch() {
  const context = React.useContext(UserContextDispatch);
  if (context === undefined) {
    throw new Error('userDispatch must be used within a UserProvider');
  }
  return context;
}

export { UserProvider, userState, userDispatch };
