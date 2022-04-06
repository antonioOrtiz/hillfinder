import axios from 'axios';

const getProfile = async () => {

  try {
    const resp = await axios.get('/api/profile',
      { // options
        headers: {
          'Content-Type': 'application/json'
        }
      });
    return resp;
  } catch (err) {
    console.error('err', err);
  }
};

export default getProfile;
