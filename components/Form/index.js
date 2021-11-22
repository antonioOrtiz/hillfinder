import { useState, useEffect } from 'react';

import { validateInputs } from '../../utils/index';
import { useRouter } from 'next/router'


import GenericFormComponent from './FormElements'
import { userState, userDispatch } from '../Context/UserContext'
import { uiDispatch } from '../Context/UIContext'

import forgotPasswordSubmit from '../../clientApi/ForgotPasswordSubmit'
import updatePasswordSubmit from '../../clientApi/UpdatePasswordSubmit'
import isConfirmation from '../../clientApi/Confirmation'
import loginSubmit from '../../clientApi/LoginSubmit'
import registerSubmit from '../../clientApi/RegisterSubmit'

import { useUser } from '../../lib/hooks'

export default function FormComponent({
  formType,
}) {
  const router = useRouter();

  const { dispatch } = userDispatch();
  const { uidispatch } = uiDispatch();

  const { token } = router.query;

  const [duration, setDuration] = useState(500);
  const [email, setEmail] = useState('');
  const [emailFeedback, setEmailFeedback] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailDup, setEmailDup] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordFeedback, setPasswordFeedback] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [passwordConfirmationError, setPasswordConfirmationError] = useState(false);
  const [passwordConfirmationFeedback, setPasswordConfirmationFeedback] = useState('');
  const [preventSubmit, setPreventSubmit] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [tokenExpired, setTokenExpired] = useState(false);
  const [responseCodeSuccess, setResponseCodeSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [current_location, setCurrentLocation] = useState('');
  const [current_destination, setCurrentDestination] = useState('');
  const [mounted, setMounted] = useState(false);

  const { state } = userState();

  const { id, accountNotVerified } = state;

  const { mutate } = useUser()

  useEffect(() => {
    setIsLoading(() => false)
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (preventSubmit) {
      setPreventSubmit(() => true)
    }
    return () => {
      setPreventSubmit(() => false)
    }
  }, [emailError, passwordError])


  function isLoginForm() {
    useEffect(() => {
      dispatch({ type: 'resetUserAccountIsVerified' })
    }, [id]);

    return (
      mounted && <GenericFormComponent
        handleSubmit={handleSubmit}
        formType={formType}
        formSuccess={formSuccess}
        formError={formError}
        accountNotVerified={accountNotVerified}
        email={email}
        emailError={emailError}
        emailFeedback={emailFeedback}
        handleChange={handleChange}
        duration={duration}
        password={password}
        passwordError={passwordError}
        passwordFeedback={passwordFeedback}
        disableButton={disableButton}
        buttonName="Log-in"
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        responseMessage={responseMessage}
      />
    );
  }

  function isRegisterForm() {
    return (
      mounted && <GenericFormComponent
        handleSubmit={handleSubmit}
        formType={formType}
        formSuccess={formSuccess}
        formError={formError}
        accountNotVerified={accountNotVerified}
        email={email}
        emailDup={emailDup}
        emailError={emailError}
        emailFeedback={emailFeedback}
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
      mounted && <GenericFormComponent
        handleSubmit={handleSubmit}
        formType={formType}
        formSuccess={formSuccess}
        formError={formError}
        accountNotVerified={accountNotVerified}
        email={email}
        emailDup={emailDup}
        handleChange={handleChange}
        emailError={emailError}
        duration={duration}
        emailFeedback={emailFeedback}
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
      mounted && <GenericFormComponent
        handleSubmit={handleSubmit}
        formType={formType}
        formSuccess={formSuccess}
        formError={formError}
        accountNotVerified={accountNotVerified}
        email={email}
        emailDup={emailDup}
        handleChange={handleChange}
        emailError={emailError}
        duration={duration}
        emailFeedback={emailFeedback}
        password={password}
        passwordError={passwordError}
        passwordFeedback={passwordFeedback}
        disableButton={disableButton}
        setDisableButton={setDisableButton}
        buttonName="Yes, send a link"
        isLoading={isLoading}
        responseMessage={responseMessage}
      />
    );
  }

  const Forms = {
    Confirmation: [
      () => isConfirmation(
        error,
        setError,
        setResponseMessage,
        responseMessage,
        dispatch,
        uidispatch,
      )
    ],
    ForgotPassword: [isForgotPasswordForm,
      () => forgotPasswordSubmit(
        email,
        setEmail,
        setResponseMessage,
        setFormError,
        setFormSuccess,
        setIsLoading,

      )
    ],
    Login: [isLoginForm,
      () => loginSubmit(
        email,
        password,
        setEmail,
        setPassword,
        setFormError,
        setFormSuccess,
        setIsLoading,
        setResponseMessage,
        dispatch,
        router,
        mutate
      )
    ],
    Register: [isRegisterForm,
      () => registerSubmit(
        email,
        password,
        setEmail,
        setPassword,
        setResponseMessage,
        setEmailDup,
        setFormError,
        setFormSuccess,
        setIsLoading,
        router
      )
    ],
    UpdatePassword: [isUpdatePasswordForm,
      () => updatePasswordSubmit(
        password, password_confirmation, setPassword, setPasswordConfirmation, setFormError, setFormSuccess, setIsLoading, setResponseCodeSuccess, setResponseMessage, setDisableButton, router, token
      )
    ]
  };

  function handleChange(e) {
    e.persist();
    setResponseMessage('');
    setPasswordFeedback('')
    setPasswordConfirmationFeedback('')
    setFormError(false);
    setFormSuccess(false);
    setEmailError(false);
    setPasswordError(false);
    setPasswordConfirmationError(false);
    setDisableButton(false);

    dispatch({ type: 'resetUserAccountIsVerified', })

    setEmailDup(false);

    const { name, value } = e.target;

    if (value === '') setDisableButton(() => true)

    if (name === 'email') {
      setEmail(value);
    }

    if (name === 'password') {
      setPassword(value);
    }

    if (name === 'password_confirmation') {
      setPasswordConfirmation(value);
    }

    if (name === 'current_location') {
      setCurrentLocation(value);
    }

    if (name === 'current_destination') {
      setCurrentDestination(value);
    }
  }

  function handleSubmit(event, form) {

    console.log("preventSubmit ", preventSubmit);
    event.preventDefault();
    validateInputs(
      form,
      email,
      setEmailError,
      setEmailFeedback,
      password,
      password_confirmation,
      setPasswordConfirmationError,
      setPasswordConfirmationFeedback,
      setPasswordError,
      setPasswordFeedback,
      setFormSuccess,
      setFormError,
    );
    return preventSubmit ? false : Forms[form][1]()
  }

  return Forms[formType][0]();
}
