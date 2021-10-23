import axios from 'axios';


export default function updatePasswordSubmit(
  password, setPassword, setPasswordConfirmation, setFormError, setFormSuccess, setIsLoading, setResponseCodeSuccess, setResponseMessage, setDisableButton, router, token) {


  console.log("token ", token);
  axios.post(`/api/reset-password/${token}`, {
    password
  })
    .then(response => {
      if (response.status === 201) {
        setPassword('');
        setPasswordConfirmation('');
        setFormError(false);
        setFormSuccess(true);
        setIsLoading(false);
        setResponseCodeSuccess(true);
        setResponseMessage(message => message.concat(response.data.msg));
        setDisableButton(true);
        setTimeout(() => {
          router.push('/login');
        }, 5000);
      }
    }).catch((error) => {
      if (error.response) {
        if (error.response.status === 401) {
          setPassword('');
          setFormError(true);
          setFormSuccess(false);
          setIsLoading(false);
          setResponseMessage(message => message.concat(error.response.data.msg));
        }

        if (error.response && error.response.status === 422) {
          setResponseMessage(message => message.concat(error.response.data.msg));
          setFormError(true);
          setFormSuccess(false);
          setIsLoading(false);
        }
      }
    });
}


