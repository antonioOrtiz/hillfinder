import axios from 'axios';

const saveProfile = () => {
  try {
    const resp = await axios.post(`/api/saveProfile`,
      { name, email, interestedActivities }, // request body as string
      { // options
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    return resp;
  } catch (err) {
    console.error('err', err);
  }
};

export default saveProfile;
