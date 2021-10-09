import axios from 'axios';

export function logOutUserSession() {
  axios
    .get('/api/logout')
    .then(response => {
      if (response.status === 200) {
      }
    })
    .catch(error => { });
}

export function getUserAvatar() {
  return axios
    .get('/api/user_avatar')
    .then(response => {
      if (response.status === 200) {
        if (!response.data.hasOwnProperty('avatar_info')) {
          return '/uploads/profile-avatars/placeholder.jpg';
        }
        return response.data.avatar_info.secure_url;
      }
      if (response.status === 500) {
      }
    })
    .catch((error) => { });
}
