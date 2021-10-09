import axios from 'axios';

export default function loginSubmit(
  username,
  password,
  setUsername,
  setPassword,
  setFormError,
  setFormSuccess,
  setIsLoading,
  setResponseMessage,
  dispatch,
  router
) {

  axios
    .post('/api/login', {
      username,
      password,
    })
    .then(response => {
      if (response.status === 200) {
        dispatch({
          type: 'setUserId',
          payload: { id: response.data.userId._id }
        });
        setTimeout(() => {
          router.push('/profile');
        }, 3000);

        setUsername('');
        setPassword('');
        setFormError(false);
        setFormSuccess(true);
        setIsLoading(false);
        setResponseMessage(response.data.msg);
        dispatch({ type: 'userAccountIsVerified' })
      }
    })
    .catch((error) => {
      if (error.response) {
        if (error.response.status === 401) {
          setUsername('');
          setPassword('');
          setFormError(true);
          setFormSuccess(false);
          setIsLoading(false);
          setResponseMessage(error.response.data.msg);
        }

        if (error.response.status === 403) {
          dispatch({ type: 'userAccountNotVerified' })
          setUsername('');
          setPassword('');
          setFormError(false);
          setFormSuccess(false);
          setIsLoading(false);
          setResponseMessage(error.response.data.msg);
        }
        if (error.response.status === 404) {
          setUsername('');
          setPassword('');
          setFormError(true);
          setFormSuccess(false);
          setIsLoading(false);
          setResponseMessage(error.response.data.msg);
        }
        if (error.response && error.response.status === 422) {
          const [{ value, param }] = error.response.data.errors;

          setResponseMessage(['Server Error', `The value ${value} is invalid for the ${param} field. Follow validations above.`]);
          setFormError(true);
          setFormSuccess(false);
          setIsLoading(false);
        }
      }
    });
}
