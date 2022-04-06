import axios from 'axios';

export default function updateProfileSubmit(
  profileDisplayName, profileEmail, interestedActivities, setFormError, setFormSuccess, setIsLoading, setResponseMessage) {
  const data = {
    profileDisplayName,
    profileEmail,
    interestedActivities
  };

  console.log('data', data)

  axios
    .put(`/api/profile/update`,
      data, // request body as string
      { // options
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    .then(response => {
      if (response.status === 200) {
        setFormError(false);
        setFormSuccess(true);
        setIsLoading(false);
        setResponseMessage(response.data.msg);
      }
    })
    .catch((error) => {
      if (error.response) {
        if (error.response.status === 500) {
          setFormError(true);
          setFormSuccess(false);
          setIsLoading(false);
          setResponseMessage(error.response.data.msg);
        }
      }

    });
}
