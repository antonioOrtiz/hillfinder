import axios from 'axios';
import { useRouter } from 'next/router'


export default function updatePasswordSubmit(password, setPassword, setPasswordConfirmation, setFormError,
  setFormSuccess,
  setIsLoading,
  setResponseCodeSuccess,
  setResponseMessage,
  setDisableButton) {
  const router = useRouter();

  const { token } = router.query;
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
    })
    .catch((error) => {
      if (error.response) {
        console.log("error.response ", error.response.data.errors);
        if (error.response && error.response.status === 422) {
          const [{ value, param }] = error.response.data.errors;

          console.log("value, param ", value, param);
          setResponseMessage(['Server Error', `The value ${value} is invalid for the ${param} field. Follow validations above.`]);
          setFormError(true);
          setFormSuccess(false);
          setIsLoading(false);
        }

        if (error.response.status === 401) {
          setFormError(true);
          setFormSuccess(false);
          setIsLoading(false);
          setResponseMessage(error.response.data.msg);
        }
      }
    });
}
