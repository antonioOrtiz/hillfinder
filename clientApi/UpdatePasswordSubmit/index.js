import axios from 'axios';

export default function updatePasswordSubmit(
  password, password_confirmation, setPassword, setPasswordConfirmation, setFormError, setFormSuccess, setIsLoading, setResponseCodeSuccess, setResponseMessage, setDisableButton, token) {

  if (password === password_confirmation) {
    axios.post(`/api/update-password/${token.query.token
      }`, {
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

          if (error.response.status === 422) {
            setResponseMessage(error.response.data.msg);
            setFormError(true);
            setFormSuccess(false);
            setIsLoading(false);
          }

          if (error.response.status === 500) {
            setResponseMessage(error.response.data.message)
            setFormError(true);
            setFormSuccess(false);
            setIsLoading(false);
          }
        }
      });
  } else {
    console.log('Passwords must match');
    return false
  }

}


