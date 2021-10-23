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
    setIsLoading, router) {


  axios
    .post('/api/registration', {
      email,
      password,
      withCredentials: true
    })
    .then(response => {
      if (response.status === 201) {
        setTimeout(() => {
          router.push('/login');
        }, 5000);
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
      }
    })
}
