import axios from 'axios';

import { isJson } from '../../utils/index'

export default function loginSubmit(
  email,
  password,
  setEmail,
  setPassword,
  setFormError,
  setFormSuccess,
  setIsLoading,
  setResponseMessage,
  dispatch,
  router,
) {

  const data = {
    email,
    password,
  };
  axios
    .post(`/api/login`,
      data, // request body as string
      { // options
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    .then(response => {

      console.log("response ", response);
      if (response.status === 200) {
        setTimeout(() => {
          router.push('/profile');
        }, 3000);
        setEmail('');
        setPassword('');
        setFormError(false);
        setFormSuccess(true);
        setIsLoading(false);
        setResponseMessage(response.data.msg);
        dispatch({ type: 'userAccountIsVerified' })
        dispatch({
          type: 'setUserId', payload: {
            id: response.data.userId
          }
        })
      }
    })
    .catch((error) => {
      console.log("error.response ", error.response);

      if (error.response) {
        if (error.response.status === 404) {
          setEmail('');
          setPassword('');
          setFormError(true);
          setFormSuccess(false);
          setIsLoading(false);
          setResponseMessage(error.response.data.msg);

        }

        if (error.response.status === 401) {
          setEmail('');
          setPassword('');
          setFormError(true);
          setFormSuccess(false);
          setIsLoading(false);
          setResponseMessage(error.response.data.msg);
        }

        if (error.response.status === 403) {
          dispatch({ type: 'userAccountNotVerified' })
          setEmail('');
          setPassword('');
          setFormError(false);
          setFormSuccess(false);
          setIsLoading(false);
          setResponseMessage(error.response.data.msg);
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
    });
}
