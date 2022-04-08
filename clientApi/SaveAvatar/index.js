import axios from 'axios';

const saveAvatar = async (formData) => {
  try {
    const resp = await axios.post("https://api.cloudinary.com/v1_1/hillfinders/image/upload", formData,
      { // options
        headers: {
          'Content-Type': 'application/json'
        }
      });
    console.log("resp ", resp);
    return resp;
  } catch (err) {
    console.error('err', err);
  }
};

export default saveAvatar;
