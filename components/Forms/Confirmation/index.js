import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios';
import Message from 'components/Message/index'


import {
  FormWrapper,
} from '../FormElements';


export default function Confirmation({
  error,
  responseMessage,
  setError,
  setResponseMessage = () => { },
  userdispatch,
}) {

  const [showApi, setShowApi] = useState(true);
  const router = useRouter();
  const { token } = router.query
  useEffect(() => {
    let isSubscribed = true

    if (!router.isReady) return;

    if (typeof token !== 'undefined') {
      axios
        .get(`/api/confirmation/${token}`)
        .then(response => {

          if (response.status === 200) {
            isSubscribed ? setResponseMessage(response.data.msg) : null;
          }

        })
        .catch((error) => {
          if (error.response.status === 404) {
            userdispatch({ type: 'resetUserAccountIsVerified' })

            setError(true);
            isSubscribed ? setResponseMessage(error.response.data.msg) : null;

          }

          if (error.response.status === 400) {
            userdispatch({ type: 'userAccountIsVerified' })

            setError(true);
            isSubscribed ? setResponseMessage(error.response.data.msg) : null;

          }
        });
    }


    return () => {
      isSubscribed = false;
      setShowApi(prev => !prev);
    };
  }, [token]);



  if (error) {
    return showApi && <FormWrapper>
      <Message state="Error" content={responseMessage} />
    </FormWrapper>

  }
  if (error === false) {
    return showApi && <FormWrapper >
      <Message state="Success" header={responseMessage} />
    </FormWrapper>

  }
}
