
import axios from 'axios';

export default function forgotPasswordSubmit(username, setUsername, setResponseMessage, setFormError, setFormSuccess, setIsLoading) {
  axios
    .post('/api/forgot_password', {
      username
    })
    .then(response => {
      if (response.status === 200) {
        setUsername('');
        setResponseMessage(response.data.msg);
        setFormError(false);
        setFormSuccess(true);
        setIsLoading(false);
      }
    })
    .catch((error) => {
      if (error.response) {
        if (error.response.status === 404) {
          setResponseMessage(error.response.data.msg);
          setFormError(true);
          setFormSuccess(false);
          setIsLoading(false);
        }
      }
    });
}
