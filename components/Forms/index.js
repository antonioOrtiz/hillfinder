/* eslint-disable react/jsx-key */
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import moment from 'moment';

import { validateInputs } from '../../utils/index';
import { useRouter } from 'next/router'

import { userState, userDispatch } from '../Context/UserContext'

import LoginForm from './Login'
import RegisterForm from './Register'
import UpdatePasswordForm from './UpdatePassword'
import ForgotPasswordForm from './ForgotPassword'
import ProfileForm from './Profile'
import Confirmation from './Confirmation';

import loginSubmit from '../../clientApi/LoginSubmit'
import registerSubmit from '../../clientApi/RegisterSubmit'
import updatePasswordSubmit from '../../clientApi/UpdatePasswordSubmit'
import forgotPasswordSubmit from '../../clientApi/ForgotPasswordSubmit'
import getProfile from '../../clientApi/GetProfile'
import updateProfileSubmit from '../../clientApi/UpdateProfileSubmit'

import { useUser } from '../../lib/hooks'

function FormComponent({
  formType,
}) {
  const router = useRouter();

  const { userdispatch } = userDispatch();

  const interestedActivitiesRef = useRef();
  const notInterestedActivitiesRef = useRef();

  const [current_location, setCurrentLocation] = useState('');
  const [current_destination, setCurrentDestination] = useState('');
  const [disableButton, setDisableButton] = useState(false);
  const [email, setEmail] = useState('');
  const [emailFeedback, setEmailFeedback] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailDup, setEmailDup] = useState(false);
  const [error, setError] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState(false);
  const [interestedActivities, setInterestedActivities] = useState([]);
  const [interestedActivitiesError, setInterestedActivitiesError] = useState(false);
  const [interestedActivitiesFeedback, setInterestedActivitiesFeedback] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [memberSince, setMemberSince] = useState('');
  const [mounted, setMounted] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordFeedback, setPasswordFeedback] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [passwordConfirmationError, setPasswordConfirmationError] = useState(false);
  const [passwordConfirmationFeedback, setPasswordConfirmationFeedback] = useState('');
  const [preventSubmit, setPreventSubmit] = useState(false)
  const [profileDataFromApi, setProfileDataFromApi] = useState([]);
  const [profileDisplayName, setProfileDisplayName] = useState('')
  const [profileDisplayNameFeedback, setProfileDisplayNameFeedback] = useState('');
  const [profileDisplayNameError, setProfileDisplayNameError] = useState(false);
  const [profileEmail, setProfileEmail] = useState('')
  const [profileLoaded, setProfileLoaded] = useState(true);
  const [token, setToken] = useState(null)
  const [tokenExpired, setTokenExpired] = useState(false);
  const [responseCodeSuccess, setResponseCodeSuccess] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [interestedActivitiesInput, setInterestedActivitiesInput] = useState('')


  const { userstate } = userState();

  const { id, accountNotVerified, isLoggedIn } = userstate;

  const { user, mutate } = useUser(!isLoggedIn ? false : true);

  useEffect(() => {
    setIsLoading(() => false)
  }, [])

  useEffect(() => {
    if (!mounted) setMounted(true)
    return () => setMounted(false)
  }, [])

  useEffect(() => {
    if (preventSubmit) {
      setPreventSubmit(() => true)
    }
    return () => {
      setPreventSubmit(() => false)
    }
  }, [emailError, passwordError])


  useEffect(() => {
    notInterestedActivitiesRef.current = "notInterestedActivitiesRef"
    interestedActivitiesRef.current = "interestedActivitiesRef"
    if (user !== undefined && profileLoaded) {
      setProfileLoaded(false);

      const fetchProfile = async () => {

        const { data } = await getProfile();

        console.log("data ", data);

        const { email } = data[0]._user

        const obj = data[0];

        const { __v, _user, _id, memberSince, ...profile } = obj;

        const fomatted_date = moment(memberSince).format('MM/DD/YYYY');

        const { displayName } = profile
        const { value: interestedActivities } = profile.interestedActivities[0]
        setProfileDataFromApi(profile)
        setMemberSince(fomatted_date)
        setProfileDisplayName(displayName)
        setProfileEmail(email)
        setInterestedActivities(interestedActivities)

      }
      fetchProfile()
    }
    return () => { setProfileLoaded(true) }
  }, [])


  function handleChangeForUseCallBack(name, value) {
    setEmailError(false);
    setDisableButton(false);
    setFormError(false);
    setFormSuccess(false);
    setPasswordError(false);
    setPasswordFeedback('')
    setPasswordConfirmationError(false);
    setPasswordConfirmationFeedback('')


    setProfileDisplayNameError(false)
    setResponseMessage('');

    setInterestedActivitiesError(false)
    setInterestedActivitiesFeedback('')

    userdispatch({ type: 'resetUserAccountIsVerified', })
    setEmailDup(false);

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

    if (name === 'interestedActivities') {
      setInterestedActivitiesInput(value);
    }
  }

  const handleChange = useCallback((e) => {
    e.persist();
    const { name, value } = e.target;
    handleChangeForUseCallBack(name, value);
  }, [email, formType, password, password_confirmation, handleChangeForUseCallBack, setIsLoading]);

  function handleSubmitForUseCallBack(e, form) {
    e.preventDefault();
    setDisableButton(true);

    validateInputs(
      form,
      email,
      interestedActivities,
      password,
      password_confirmation,
      profileDisplayName,
      profileEmail,
      setEmailError,
      setEmailFeedback,
      setDisableButton,
      setFormSuccess,
      setFormError,
      setInterestedActivitiesError,
      setInterestedActivitiesFeedback,
      setPasswordConfirmationError,
      setPasswordConfirmationFeedback,
      setPasswordError,
      setPasswordFeedback,
      setProfileDisplayNameFeedback,
      setProfileDisplayNameError
    );
    return preventSubmit ? false : Forms[form][1]()
  }

  const handleSubmit = useCallback((e, form) => {
    handleSubmitForUseCallBack(e, form);
  }, [email, password, password_confirmation, interestedActivities, handleSubmitForUseCallBack]);

  const Forms = {
    Login: [
      <LoginForm
        suppressHydrationWarning
        accountNotVerified={accountNotVerified}
        disableButton={disableButton}
        formError={formError}
        formType={formType}
        formSuccess={formSuccess}
        email={email}
        emailError={emailError}
        emailFeedback={emailFeedback}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        id={id}
        isLoading={isLoading}
        isLoggedIn={isLoggedIn}
        mounted={mounted}
        password={password}
        passwordError={passwordError}
        passwordFeedback={passwordFeedback}
        responseMessage={responseMessage}
        setIsLoading={setIsLoading}
        userdispatch={userdispatch}

      />,
      () => loginSubmit(
        email,
        password,
        setEmail,
        setPassword,
        setFormError,
        setFormSuccess,
        setIsLoading,
        setResponseMessage,
        userdispatch,
        router,
        user,
        mutate
      )
    ],
    Register: [
      <RegisterForm
        suppressHydrationWarning
        accountNotVerified={accountNotVerified}
        disableButton={disableButton}
        email={email}
        emailDup={emailDup}
        emailError={emailError}
        emailFeedback={emailFeedback}
        formError={formError}
        formSuccess={formSuccess}
        formType={formType}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        mounted={mounted}
        password={password}
        passwordError={passwordError}
        passwordFeedback={passwordFeedback}
        responseMessage={responseMessage}
      />,
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
    UpdatePassword: [
      <UpdatePasswordForm
        suppressHydrationWarning
        disableButton={disableButton}
        formType={formType}
        formSuccess={formSuccess}
        formError={formError}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        mounted={mounted}
        password={password}
        password_confirmation={password_confirmation}
        passwordError={passwordError}
        passwordFeedback={passwordFeedback}
        passwordConfirmationError={passwordConfirmationError}
        passwordConfirmationFeedback={passwordConfirmationFeedback}
        responseMessage={responseMessage}
        tokenExpired={tokenExpired}
      />,
      () => updatePasswordSubmit(
        password, password_confirmation, setPassword, setPasswordConfirmation, setFormError, setFormSuccess, setIsLoading, setResponseCodeSuccess, setResponseMessage, setDisableButton, router, token
      )
    ],
    ForgotPassword: [
      <ForgotPasswordForm
        suppressHydrationWarning
        email={email}
        emailError={emailError}
        emailFeedback={emailFeedback}
        formType={formType}
        formSuccess={formSuccess}
        formError={formError}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        password={password}
        passwordError={passwordError}
        passwordFeedback={passwordFeedback}
        responseMessage={responseMessage}
        tokenExpired={tokenExpired}
      />,
      () => forgotPasswordSubmit(
        email,
        setEmail,
        setResponseMessage,
        setFormError,
        setFormSuccess,
        setIsLoading,
      )
    ],
    Confirmation: [
      <Confirmation
        error={error}
        responseMessage={responseMessage}
        setError={setError}
        setResponseMessage={setResponseMessage}
        userdispatch={userdispatch}
      />
    ],
    Profile: [
      <ProfileForm
        disableButton={disableButton}
        suppressHydrationWarning
        mounted={mounted}
        notInterestedActivitiesRef={notInterestedActivitiesRef}
        emailError={emailError}
        emailFeedback={emailFeedback}
        formType={formType}
        formSuccess={formSuccess}
        formError={formError}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        interestedActivities={interestedActivities}
        interestedActivitiesInput={interestedActivitiesInput}
        interestedActivitiesError={interestedActivitiesError}
        interestedActivitiesFeedback={interestedActivitiesFeedback}
        isLoading={isLoading}
        memberSince={memberSince}
        profileEmail={profileEmail}
        profileDataFromApi={profileDataFromApi}
        profileDisplayName={profileDisplayName}
        profileDisplayNameError={profileDisplayNameError}
        profileDisplayNameFeedback={profileDisplayNameFeedback}
        responseMessage={responseMessage}
        setDisableButton={setDisableButton}
        setEmailError={setEmailError}
        setFormError={setFormError}
        setFormSuccess={setFormSuccess}
        setIsLoading={setIsLoading}
        setInterestedActivities={setInterestedActivities}
        setInterestedActivitiesError={setInterestedActivitiesError}
        setInterestedActivitiesFeedback={setInterestedActivitiesFeedback}
        setInterestedActivitiesInput={setInterestedActivitiesInput}
        setProfileDisplayName={setProfileDisplayName}
        setProfileDisplayNameError={setProfileDisplayNameError}
        setProfileEmail={setProfileEmail}

      />,
      () => (updateProfileSubmit(
        profileDisplayName, profileEmail, interestedActivities, setFormError, setFormSuccess, setIsLoading, setResponseMessage)
      )
    ],
  };

  return Forms[formType][0];
}

export default React.memo(FormComponent)
