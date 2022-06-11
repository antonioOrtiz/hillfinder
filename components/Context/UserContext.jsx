/* eslint-disable object-shorthand */
import React, { useState, useEffect, useContext, useReducer } from 'react';
import { setLocalStorage, getLocalStorage } from 'utils/index'

const initialState = {
  avatar: '/uploads/profile-avatars/placeholder.jpg',
  accountNotVerified: null,
  isLoggedIn: false,
  id: null,
  isRoutingVisible: false,
  removeRoutingMachine: false,
  initRadiusForRoutingMachine: [],
  isLengthOfMarkersLessThanTwo: true,
  isAvatarUploading: true,
  isMapLoading: true,
  markers: [],
  currentMap: {},
  currentMapAccuracy: null,
  currentMapZoom: 17,
  // currentMapCenter: []
};

const UserStateContext = React.createContext();

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

      case 'setInitPointsInRoutingMachine': {
        return {
          ...state,
          initRadiusForRoutingMachine: state.initRadiusForRoutingMachine.concat(payload.initRadiusForRoutingMachine)
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

  const value = { state, dispatch }

  return (
    <UserStateContext.Provider value={value}>
      {children}
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

export { UserProvider, userState };
