import React, { useState, useEffect } from 'react';
import { getUserAvatar } from '../../utils/index';
var initialState = {
  avatar: '/static/uploads/profile-avatars/placeholder.jpg',
  isRoutingVisibile: false,
  removeRoutingMachine: false,
  markers: [],
  currentMap: {},
  currentCoords: {
    from: {
      lat: null,
      lng: null
    },
    to: {
      lat: null,
      lng: null
    }
  }
};

var useToggle = initialState => {
  const [isToggled, setIsToggled] = React.useState(initialState);
  const toggle = useCallback(() => setIsToggled(state => !state), [setIsToggled]);

  return [isToggled, toggle];
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

  // value = !isJson(value) ? value : JSON.stringify(value);

  console.log('isJson(value) ', isJson(value));
  console.log('value ', value);
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
    // if error, return initial value
    return initialValue;
  }
}

function UserProvider({ children }) {
  const [user, setUser] = useState(() => getLocalStorage('user', initialState));
  const [isAvatarUploading, setIsAvatarUploading] = useState(true);

  // console.log('user ', user);
  useEffect(() => {
    setLocalStorage('user', user);
  }, [user]);

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
        userAvatar: user.avatar,
        userImages: user.images,
        userMarkers: user.markers,
        isRoutingVisibile: user.isRoutingVisibile,
        removeRoutingMachine: user.removeRoutingMachine,
        toggler: useToggle,
        userCoords: user.currentCoords,
        userMap: user.currentMap,
        setUserCoords: (coords, fromOrTo) =>
          setUser({ ...user, currentCoords: { ...user.coords, ...coords[fromOrTo] } }),
        resetUserCoords: () =>
          setUser({
            ...user,
            currentCoords: {
              from: {
                lat: null,
                lng: null
              },
              to: {
                lat: null,
                lng: null
              }
            }
          }),
        setUserCurrentMap: map =>
          setUser({ ...user, currentMap: { ...user.currentMap, map } }),
        deleteUserMarkers: () => setUser({ ...user, markers: [] }),
        setUserId: id => setUser({ ...user, id }),
        setUserAvatar: avatar => setUser({ ...user, avatar }),
        setUserImages: images => setUser({ ...user, images }),
        setUserMarkers: markers =>
          setUser({ ...user, markers: [...user.markers, markers] }),
        updateUserMarker: (marker, markerIndex) => {
          user.markers.map(o => {
            if (markerIndex === o.id)
              return {
                ...o,
                ...marker
              };
            return o;
          });
        },
        isAvatarUploading: isAvatarUploading
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;

export { UserProvider };
