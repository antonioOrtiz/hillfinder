import React, { useState, useEffect } from 'react';
import { getUserAvatar } from '../../utils/index';
var initialState = {
  avatar: '/static/uploads/profile-avatars/placeholder.jpg'
};

var UserContext = React.createContext();

function setLocalStorage(key, value) {
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
        userMaps: user.maps,
        setUserId: id => setUser({ ...user, id }),
        setUserAvatar: avatar => setUser({ ...user, avatar }),
        setUserImages: images => setUser({ ...user, images }),
        setUserMaps: maps => setUser({ ...user, maps }),
        isAvatarUploading: isAvatarUploading
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;

export { UserProvider };
