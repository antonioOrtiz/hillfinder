import axios from 'axios';

export default function updateProfileSubmit(
  interestedActivities, profileDisplayName, profileEmail, profileUserAvatar, setFormError, setFormSuccess, setIsLoading, setResponseMessage) {
  const data = {
    profileUserAvatar,
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
        setTimeout(() => {
          setFormSuccess(false);
        }, 5000)
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
