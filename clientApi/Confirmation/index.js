import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios';
import Layout from '../../components/Layout/index'
import Message from '../../components/Message/index';

export default function isConfirmation(error, setError, setResponseMessage, responseMessage, dispatch,
  uiDispatch) {
  const [showApi, setShowApi] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let isSubscribed = true;

    if (!router.isReady) return;
    const { token } = router.query;
    uiDispatch({
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
    return showApi && <Layout showFooter> <Message state="Error" content={responseMessage} /></Layout>
  }
  if (error === false) {
    return showApi && <Layout showFooter> <Message state="Success" header={responseMessage} /></Layout>
  }
}
