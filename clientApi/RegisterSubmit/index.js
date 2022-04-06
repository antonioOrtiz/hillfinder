import axios from 'axios';

export default
  function registerSubmit(
    email,
    password,
    setEmail,
    setPassword,
    setResponseMessage,
    setEmailDup,
    setFormError,
    setFormSuccess,
    setIsLoading) {
  axios
    .post('/api/registration', {
      email,
      password,
      withCredentials: true
    })
    .then(response => {
      if (response.status === 201) {
        setEmail('');
        setPassword('');
        setResponseMessage(response.data.msg);
        setEmailDup(false);
        setFormError(false);
        setFormSuccess(true);
        setIsLoading(false);
      }
    })
    .catch((error) => {
      if (error.response) {
        console.log("error.response ", error.response);
        if (error.response.status === 500) {
          setResponseMessage(error.response.data.msg);
          setFormError(true);
          setFormSuccess(false);
          setIsLoading(false);
        }

        if (error.response.status === 401) {
          setResponseMessage(error.response.data.msg);
          setFormError(true);
          setFormSuccess(false);
          setIsLoading(false);

        }
        if (error.response.status === 409) {
          setEmailDup(true);
          setResponseMessage(error.response.data.msg);
          setFormError(true);
          setFormSuccess(false);
          setIsLoading(false);
        }
        if (error.response.status === 400) {
          setResponseMessage(error.response.data.msg);
          setFormError(true);
          setFormSuccess(false);
          setIsLoading(false);
        }
        if (error.response.status === 422) {
          let str = '';
          const errors = error.response.data.errors;
          const IsEmptyOrWhiteSpace = (str) => (str.match(/^\s*$/) || []).length > 0;

          for (let i = 0; i < errors.length; i++) {
            const { value, msg, param } = errors[i]

            str += `${IsEmptyOrWhiteSpace(value) ? 'Spaces or an empty value' : `"${value}"`} is an ${msg.toLowerCase()} for the ${param} input. `
          }

          str += 'Check details above.'

          setResponseMessage(str)
          setFormError(true);
          setFormSuccess(false);
          setIsLoading(false);
        }
      }
    })
}
