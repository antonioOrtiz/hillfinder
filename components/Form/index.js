import { useState, useEffect } from 'react';
import axios from 'axios';

import { useRouter } from 'next/router'
import { validateInputs, Message } from '../../utils/index';

import GenericFormComponent from './FormElements'
import { userState, userDispatch } from '../Context/UserContext'
import { userDispatch as uiUserDispatch } from '../Context/UIContext'


import Layout from '../Layout/index'

export default function FormComponent({
  formType,
}) {
  /* This is an object which is used to store the relevant form views for each page/component  */
  const router = useRouter();

  const [duration, setDuration] = useState(500);
  const [username, setUsername] = useState('');
  const [usernameFeedback, setUsernameFeedback] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [userNameDup, setUserNameDup] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordFeedback, setPasswordFeedback] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [passwordConfirmationError, setPasswordConfirmationError] = useState(false);
  const [passwordConfirmationFeedback, setPasswordConfirmationFeedback] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState({});
  const [tokenExpired, setTokenExpired] = useState(false);
  const [responseCodeSuccess, setResponseCodeSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [current_location, setCurrentLocation] = useState('');
  const [current_destination, setCurrentDestination] = useState('');

  const { state } = userState();
  const { dispatch } = userDispatch();
  const { dispatch: uidispatch } = uiUserDispatch();

  const { id, accountNotVerified } = state;

  function loginSubmit() {

    axios
      .post('/api/login', {
        username,
        password,
      })
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: 'setUserId',
            payload: { id: response.data.userId._id }
          });
          setTimeout(() => {
            router.push('/profile');
          }, 3000);

          setUsername('');
          setPassword('');
          setFormError(false);
          setFormSuccess(true);
          setIsLoading(false);
          setResponseMessage(response.data.msg);
          dispatch({ type: 'userAccountIsVerified' })
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401) {
            setUsername('');
            setPassword('');
            setFormError(true);
            setFormSuccess(false);
            setIsLoading(false);
            setResponseMessage(error.response.data.msg);
          }

          if (error.response.status === 403) {
            dispatch({ type: 'userAccountNotVerified' })
            setUsername('');
            setPassword('');
            setFormError(false);
            setFormSuccess(false);
            setIsLoading(false);
            setResponseMessage(error.response.data.msg);
          }
          if (error.response.status === 404) {
            setUsername('');
            setPassword('');
            setFormError(true);
            setFormSuccess(false);
            setIsLoading(false);
            setResponseMessage(error.response.data.msg);
          }
        }
      });
  }

  function registerSubmit() {
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

  function updatePasswordSubmit() {

    const { token } = router.query;

    axios
      .post(`/api/reset_password/${token}`, {
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
          if (error.response.status === 401) {
            setFormError(true);
            setFormSuccess(false);
            setIsLoading(false);
            setResponseMessage(error.response.data.msg);
            setTokenExpired(true);
          }
        }
      });
  }

  function handleChange(e) {

    e.persist();
    setFormError(false);
    setFormSuccess(false);
    setUsernameError(false);
    setPasswordError(false);
    setDisableButton(false);

    dispatch({ type: 'resetUserAccountIsVerified', })

    setUserNameDup(false);

    if (e.target.name === 'username') {
      setUsername(e.target.value);
    }

    if (e.target.name === 'password') {
      setPassword(e.target.value);
    }

    if (e.target.name === 'password_confirmation') {
      setPasswordConfirmation(e.target.value);
    }

    if (e.target.name === 'current_location') {
      setCurrentLocation(e.target.value);
    }

    if (e.target.name === 'current_destination') {
      setCurrentDestination(e.target.value);
    }
  }

  function handleSubmit(event, formType) {

    event.preventDefault();

    validateInputs(
      formType,
      username,
      setUsernameError,
      setUsernameFeedback,
      password,
      password_confirmation,
      setPasswordConfirmationError,
      setPasswordConfirmationFeedback,
      setPasswordError,
      setPasswordFeedback,
      setDisableButton,
      setFormSuccess,
      setFormError
    );

    return Forms[formType][1]();
  }

  function isConfirmation() {
    const [showApi, setShowApi] = useState(true);
    // const [isSubscribed, setIsSubscribed] = useState(true);



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
      return showApi && <Layout showFooter> <Message state="Error" header={responseMessage[0]} /></Layout>
    }
  }

  function isLoginForm() {
    useEffect(() => {
      dispatch({ type: 'resetUserAccountIsVerified' })
    }, [id]);
    console.log("passwordFeedback 327 ", passwordFeedback);
    return (
      <GenericFormComponent
        handleSubmit={handleSubmit}
        formType={formType}
        formSuccess={formSuccess}
        formError={formError}
        accountNotVerified={accountNotVerified}
        username={username}
        usernameError={usernameError}
        usernameFeedback={usernameFeedback}
        handleChange={handleChange}
        duration={duration}
        password={password}
        passwordError={passwordError}
        passwordFeedback={passwordFeedback}
        disableButton={disableButton}
        buttonName="Log-in"
        isLoading={isLoading}
        responseMessage={responseMessage}
      />
    );
  }

  function isRegisterForm() {
    return (
      <GenericFormComponent
        handleSubmit={handleSubmit}
        formType={formType}
        formSuccess={formSuccess}
        formError={formError}
        accountNotVerified={accountNotVerified}
        username={username}
        userNameDup={userNameDup}
        usernameError={usernameError}
        usernameFeedback={usernameFeedback}
        handleChange={handleChange}
        duration={duration}
        password={password}
        passwordError={passwordError}
        passwordFeedback={passwordFeedback}
        disableButton={disableButton}
        buttonName="Register"
        isLoading={isLoading}
        responseMessage={responseMessage}
      />
    );
  }

  function isUpdatePasswordForm() {
    return (
      <GenericFormComponent
        handleSubmit={handleSubmit}
        formType={formType}
        formSuccess={formSuccess}
        formError={formError}
        accountNotVerified={accountNotVerified}
        username={username}
        userNameDup={userNameDup}
        handleChange={handleChange}
        usernameError={usernameError}
        duration={duration}
        usernameFeedback={usernameFeedback}
        password={password}
        password_confirmation={password_confirmation}
        passwordError={passwordError}
        passwordFeedback={passwordFeedback}
        passwordConfirmationError={passwordConfirmationError}
        passwordConfirmationFeedback={passwordConfirmationFeedback}
        disableButton={disableButton}
        buttonName="Update your password"
        isLoading={isLoading}
        responseMessage={responseMessage}
        tokenExpired={tokenExpired}
        responseCodeSuccess={responseCodeSuccess}
      />
    );
  }

  function isForgotPasswordForm() {
    return (
      <GenericFormComponent
        handleSubmit={handleSubmit}
        formType={formType}
        formSuccess={formSuccess}
        formError={formError}
        accountNotVerified={accountNotVerified}
        username={username}
        userNameDup={userNameDup}
        handleChange={handleChange}
        usernameError={usernameError}
        duration={duration}
        usernameFeedback={usernameFeedback}
        password={password}
        passwordError={passwordError}
        passwordFeedback={passwordFeedback}
        disableButton={disableButton}
        buttonName="Yes, send a link"
        isLoading={isLoading}
        responseMessage={responseMessage}
      />
    );
  }

  function forgotPasswordSubmit() {
    axios
      .post('/api/forgot_password', {
        username
      })
      .then(response => {
        if (response.status === 200) {
          setUsername('');
          setResponseMessage(response.data.msg);
          setFormError(false);
          setFormSuccess(true);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 404) {
            setResponseMessage(error.response.data.msg);
            setFormError(true);
            setFormSuccess(false);
            setIsLoading(false);
          }
        }
      });
  }

  const Forms = {
    Confirmation: [isConfirmation],
    ForgotPassword: [isForgotPasswordForm, forgotPasswordSubmit],
    Login: [isLoginForm, loginSubmit],
    Register: [isRegisterForm, registerSubmit],
    UpdatePassword: [isUpdatePasswordForm, updatePasswordSubmit]
  };


  console.log("formType 457 ", formType);

  return Forms[formType][0]();
}
