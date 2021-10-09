import axios from 'axios';
import { useRouter } from 'next/router'

export default
  function registerSubmit(
    username,
    password,
    setUsername,
    setPassword,
    setResponseMessage,
    setUserNameDup,
    setFormError,
    setFormSuccess,
    setIsLoading) {

  const router = useRouter();

  axios
    .post('/api/registration', {
      username,
      password,
      withCredentials: true
    })
    .then(response => {
      if (response.status === 201) {
        setTimeout(() => {
          router.push('/login');
        }, 5000);
        setUsername('');
        setPassword('');
        setResponseMessage(response.data.msg);
        setUserNameDup(false);
        setFormError(false);
        setFormSuccess(true);
        setIsLoading(false);
      }
    })
    .catch((error) => {
      if (error.response) {
        if (error.response.status === 500) {
          setResponseMessage(error.response.data.msg);
          setFormError(true);
          setIsLoading(false);
        }

        if (error.response.status === 401) {
          setResponseMessage(error.response.data.msg);
          setIsLoading(false);
          setFormError(true);
        }

        if (error.response.status === 409) {
          setUserNameDup(true);
          setResponseMessage(error.response.data.msg);
          setIsLoading(false);
        }
      }
    });
}
