
import axios from 'axios';

export default function forgotPasswordSubmit(email, setEmail, setResponseMessage, setFormError, setFormSuccess, setIsLoading) {
  axios
    .post('/api/forgot_password', {
      email
    })
    .then(response => {
      if (response.status === 200) {
        setEmail('');
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
