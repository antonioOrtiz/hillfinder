import { useState, useEffect } from 'react';

import { validateInputs } from '../../utils/index';
import { useRouter } from 'next/router'


import GenericFormComponent from './FormElements'
import { userState, userDispatch } from '../Context/UserContext'
import { userDispatch as uiUserDispatch } from '../../components/Context/UIContext'

import forgotPasswordSubmit from '../../api/ForgotPasswordSubmit'
import updatePasswordSubmit from '../../api/UpdatePasswordSubmit'
import isConfirmation from '../../api/Confirmation'
import loginSubmit from '../../api/LoginSubmit'
import registerSubmit from '../../api/RegisterSubmit'

export default function FormComponent({
  formType,
}) {
  const router = useRouter();

  const { dispatch } = userDispatch();
  const { dispatch: uidispatch } = uiUserDispatch();
  const { token } = router.query;

  console.log("formType ", formType);

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

  const { id, accountNotVerified } = state;

  function isLoginForm() {
    useEffect(() => {
      dispatch({ type: 'resetUserAccountIsVerified' })
    }, [id]);

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
        username,
        setUsername,
        setResponseMessage,
        setFormError,
        setFormSuccess,
        setIsLoading
      )
    ],
    Login: [isLoginForm,
      () => loginSubmit(
        username,
        password,
        setUsername,
        setPassword,
        setFormError,
        setFormSuccess,
        setIsLoading,
        setResponseMessage,
        dispatch,
        router
      )
    ],
    Register: [isRegisterForm,
      () => registerSubmit(
        username,
        password,
        setUsername,
        setPassword,
        setResponseMessage,
        setUserNameDup,
        setFormError,
        setFormSuccess,
        setIsLoading
      )
    ],
    UpdatePassword: [isUpdatePasswordForm,
      () => updatePasswordSubmit(
        password, setPassword, setPasswordConfirmation, setFormError, setFormSuccess, setIsLoading, setResponseCodeSuccess, setResponseMessage, setDisableButton, router, token
      )
    ]
  };

  function handleChange(e) {
    e.persist();
    setFormError(false);
    setFormSuccess(false);
    setUsernameError(false);
    setPasswordError(false);
    setPasswordConfirmationError(false);

    setDisableButton(false);

    dispatch({ type: 'resetUserAccountIsVerified', })

    setUserNameDup(false);

    const { name, value } = e.target

    if (name === 'username') {
      setUsername(value);
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
    event.preventDefault();
    validateInputs(
      form,
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

    return Forms[form][1]();
  }

  return Forms[formType][0]();
}
