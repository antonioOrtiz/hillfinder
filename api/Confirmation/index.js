import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios';
import Layout from '../../components/Layout/index'
import Message from '../../utils/Message';

export default function isConfirmation(error, setError, setResponseMessage, responseMessage, dispatch,
  uidispatch) {
  const [showApi, setShowApi] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let isSubscribed = true;

    if (!router.isReady) return;
    const { token } = router.query;
    uidispatch({
      type: 'token', payload: { token }
    })

    axios
      .get(`/api/confirmation/${token}`)
      .then(response => {
        if (response.status === 200) {
          isSubscribed ? setResponseMessage(response.data.msg) : null;
        }

      })
      .catch((error) => {
        if (error.response.status === 404) {
          dispatch({ type: 'resetUserAccountIsVerified' })

          setError(true);
          isSubscribed ? setResponseMessage(error.response.data.msg) : null;

        }

        if (error.response.status === 400) {
          dispatch({ type: 'userAccountIsVerified' })

          setError(true);
          isSubscribed ? setResponseMessage(error.response.data.msg) : null;

        }
      });

    return () => {
      isSubscribed = false;
      setShowApi(prev => !prev);
    };
  }, [router.isReady]);

  if (error) {
    return showApi && <Layout showFooter> <Message state="Error" header={responseMessage[0]} /></Layout>
  }
  if (error === false) {
    return showApi && <Layout showFooter> <Message state="Success" header={responseMessage[0]} /></Layout>
  }
}
