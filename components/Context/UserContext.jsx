import React, { useState, useEffect } from 'react';
import { getUserAvatar } from '../../utils/index';

import { parse, stringify } from 'flatted';

var initialState = {
  avatar: '/static/uploads/profile-avatars/placeholder.jpg',
  isRoutingVisible: false,
  removeRoutingMachine: false,
  markers: [],
  currentMap: {}
};

var UserContext = React.createContext();

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
  const [user, setUser] = useState(() => getLocalStorage('user', initialState));
  const [isAvatarUploading, setIsAvatarUploading] = useState(true);
  const [
    isLengthOfUserMarkersLessThanTwo,
    setIsLengthOfUserMarkersLessThanTwo
  ] = useState(true);

  // console.log('user ', user);
  useEffect(() => {
    setLocalStorage('user', user);
  }, [user]);

  useEffect(() => {
    console.log('user.isRoutingVisibile ', user.isRoutingVisibile);
  }, [user.isRoutingVisibile]);

  useEffect(() => {
    console.log('user.markers.length ', user.markers.length);
    if (user.markers.length === 2) {
      setIsLengthOfUserMarkersLessThanTwo(false);
    }

    return () => {};
  }, [JSON.stringify(user.markers)]);

  useEffect(() => {
    if (user.id) {
      getUserAvatar()
        .then(userAvatar => {
          setIsAvatarUploading(false);
          setUser(user => ({ ...user, avatar: userAvatar }));
        })
        .catch(err => console.log('error thrown from getUserAvatar', err));
    } else {
      console.log('No user yet!');
    }
  }, [user.id]);

  return (
    <UserContext.Provider
      value={{
        userId: user.id,
        setUserId: id => setUser({ ...user, id }),
        userAvatar: user.avatar,
        setUserAvatar: avatar => setUser({ ...user, avatar }),
        isAvatarUploading: isAvatarUploading,
        userImages: user.images,
        setUserImages: images => setUser({ ...user, images }),
        userMarkers: user.markers,
        setUserMarkers: marker => {
          console.log('marker ', marker);

          console.log(
            'isLengthOfUserMarkersLessThanTwo ',
            isLengthOfUserMarkersLessThanTwo
          );
          isLengthOfUserMarkersLessThanTwo === true
            ? setUser(user => ({
                ...user,
                markers: [...user.markers, marker]
              }))
            : () => null;
        },
        deleteUserMarkers: () => {
          setUser({
            ...user,
            markers: [
              ...user.markers.filter(function(e, i, a) {
                return e !== a[a.length - 1];
              })
            ],
            currentCoords: [
              ...user.currentCoords.filter(function(e, i, a) {
                return e !== a[a.length - 1];
              })
            ]
          });
        },
        resetUserMarkers: () => {
          var updatedCoords = user.currentCoords.map(element =>
            element.lat != null && element.lng != null
              ? { ...element, ...{ lat: null, lng: null } }
              : element
          );
          setUser({
            ...user,
            markers: [],
            currentCoords: [...updatedCoords]
          });
        },
        setUserMarkersToNull: () =>
          setUser({
            ...user,
            markers: null
          }),
        userMap: user.currentMap,
        setUserCurrentMap: map =>
          setUser({ ...user, currentMap: { ...user.currentMap, map } }),
        removeRoutingMachine: user.removeRoutingMachine,
        setRemoveRoutingMachine: () => {
          console.log('fired setIsRoutingVisibileToTrue');
          setUser({
            ...user,
            removeRoutingMachine: true
          });
        },
        isRoutingVisibile: user.isRoutingVisible,

        setIsRoutingVisibileToTrue: () => {
          console.log('fired setIsRoutingVisibileToTrue');
          setUser({
            ...user,
            isRoutingVisible: true
          });
        },

        setIsRoutingVisibileToFalse: () => {
          console.log('fired setIsRoutingVisibileToFalse');
          setUser({
            ...user,
            isRoutingVisible: false
          });
        }
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;

export { UserProvider };
