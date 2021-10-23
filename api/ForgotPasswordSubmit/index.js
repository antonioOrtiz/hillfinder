
import axios from 'axios';

export default function forgotPasswordSubmit(email, setEmail, setResponseMessage, setFormError, setFormSuccess, setIsLoading) {
  axios
    .post('/api/forgot_password', {
      email
    })
    .then(response => {
      if (response.status === 200) {
        setEmail('');
        setResponseMessage(message => message.concat(response.data.msg))
        setFormError(false);
        setFormSuccess(true);
        setIsLoading(false);
      }
    })
    .catch((error) => {
      if (error.response) {
        if (error.response.status === 404) {
          setResponseMessage(message => message.concat(error.response.data.msg));
          setFormError(true);
          setFormSuccess(false);
          setIsLoading(false);
        }

        if (error.response.status === 422) {
          let str = '';
          const errors = error.response.data.errors

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
