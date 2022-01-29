import axios from 'axios';

export default function updateProfileSubmit(
  name, email, interestedActivities, setFormError, setFormSuccess, setIsLoading, setResponseMessage) {
  const data = {
    name,
    email,
    interestedActivities
  };

  axios
    .put(`/api/profile`,
      data, // request body as string
      { // options
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    .then(response => {
      if (response.status === 204) {
        setFormError(false);
        setFormSuccess(true);
        setIsLoading(false);
        setResponseMessage(response.data.msg);
      }
    })
    .catch((error) => {
      if (error.response) {
        if (error.response.status === 403) {
          setFormError(true);
          setFormSuccess(false);
          setIsLoading(false);
          setResponseMessage(error.response.data.msg);
        }
      }
    });
}
