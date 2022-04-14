import axios from 'axios';

export default function loginSubmit(
  email,
  password,
  setEmail,
  setPassword,
  setFormError,
  setFormSuccess,
  setIsLoading,
  setResponseMessage,
  userdispatch,
  user,
  mutate
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
      setIsLoading(false);

      if (response.status === 200) {
        const userFromLogin = response.data.user
        setEmail('');
        setPassword('');
        setFormError(false);
        setFormSuccess(true);
        setResponseMessage(response.data.msg);
        userdispatch({ type: 'setIsLoggedIn', payload: true })
        userdispatch({ type: 'userAccountIsVerified' })

        mutate('/api/user', { ...user, userFromLogin }, false)
      }
    })
    .catch((error) => {
      if (error.response) {
        setIsLoading(false);
        if (error.response.status === 404) {
          setEmail('');
          setPassword('');
          setFormError(true);
          setFormSuccess(false);
          setResponseMessage(error.response.data.msg);
        }

        if (error.response.status === 401) {
          setEmail('');
          setPassword('');
          setFormError(true);
          setFormSuccess(false);
          setResponseMessage(error.response.data.msg);
        }

        if (error.response.status === 403) {
          userdispatch({ type: 'userAccountNotVerified' })
          setEmail('');
          setPassword('');
          setFormError(false);
          setFormSuccess(false);
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
        }
      }
    });
}
