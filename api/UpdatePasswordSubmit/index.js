import axios from 'axios';


export default function updatePasswordSubmit(
  password, setPassword, setPasswordConfirmation, setFormError, setFormSuccess, setIsLoading, setResponseCodeSuccess, setResponseMessage, setDisableButton, router, token) {


  console.log("token ", token);
  axios.post(`/api/reset_password/${token}`, {
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
        setResponseMessage(response.data.msg);
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
          setResponseMessage(error.response.data.msg);
        }

        if (error.response && error.response.status === 422) {
          const [{ value, param }] = error.response.data.errors;
          setResponseMessage(['Server Error', `The value ${value} is invalid for the ${param} field.
          Due to validation error above.`]);
          setFormError(true);
          setFormSuccess(false);
          setIsLoading(false);
        }
      }
    });
}


