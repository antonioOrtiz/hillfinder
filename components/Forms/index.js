/* eslint-disable react/jsx-key */
import React, { useCallback, useEffect, useState } from 'react';

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

import { useToggle, useUser } from '../../lib/hooks'

function FormComponent({
  formType,
}) {
  const router = useRouter();

  const { userdispatch } = userDispatch();

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
  const [form, setFormType] = useState('')

  const [interestedActivities, setInterestedActivities] = useState([]);
  const [interestedActivitiesError, setInterestedActivitiesError] = useState(false);
  const [interestedActivitiesFeedback, setInterestedActivitiesFeedback] = useState('');
  const [interestedActivitiesInput, setInterestedActivitiesInput] = useState('')

  const [isProfileInEditMode, toggle] = useToggle(false);

  const [isLoading, setIsLoading] = useState(false);
  const [memberSince, setMemberSince] = useState('');
  const [mounted, setMounted] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordFeedback, setPasswordFeedback] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [passwordConfirmationError, setPasswordConfirmationError] = useState(false);
  const [passwordConfirmationFeedback, setPasswordConfirmationFeedback] = useState('');

  const [profileDataFromApi, setProfileDataFromApi] = useState([]);
  const [profileDisplayName, setProfileDisplayName] = useState('')
  const [profileDisplayNameFeedback, setProfileDisplayNameFeedback] = useState('');
  const [profileDisplayNameError, setProfileDisplayNameError] = useState(false);
  const [profileEmail, setProfileEmail] = useState('')
  const [profileLoaded, setProfileLoaded] = useState(true);
  const [profileUserAvatar, setProfileUserAvatar] = useState('')

  const [token, setToken] = useState(null)
  const [tokenExpired, setTokenExpired] = useState(false);
  const [responseCodeSuccess, setResponseCodeSuccess] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');


  const { userstate } = userState();

  const { id, accountNotVerified, isLoggedIn } = userstate;

  const { user, mutate } = useUser(!isLoggedIn ? false : true);

  useEffect(() => {
    if (!mounted) setMounted(true)
    return () => setMounted(false)
  }, [])

  useEffect(() => {
    const { pathname } = router
    if (formSuccess) {
      setIsLoading(true)
      Forms[form][1]()
      if (pathname === '/login') {
        var id = setTimeout(() => {
          router.push('/profile')
        }, 3000)
      }
    }
    return () => {
      if (typeof id === 'number') {
        clearTimeout(id)
      }
    }
  }, [formSuccess])

  useEffect(() => {
    setToken(router.query.token)
  }, [router.query.token])


  useEffect(() => {
    if (user !== undefined && profileLoaded) {
      const fetchProfile = async () => {

        const { data } = await getProfile();

        const email = data[0]._user.email
        const obj = data[0];
        const { __v, _user, _id, memberSince, ...profile } = obj;
        const fomatted_date = moment(memberSince).format('MM/DD/YYYY');
        const { displayName, userAvatar } = profile

        setProfileDataFromApi(profile)
        setMemberSince(fomatted_date)
        setProfileDisplayName(displayName)
        setProfileEmail(email)
        setInterestedActivities(profile.interestedActivities)
        setProfileUserAvatar(userAvatar)
      }
      fetchProfile()
    }
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

    if (name === 'current_location') {
      setCurrentLocation(value);
    }

    if (name === 'current_destination') {
      setCurrentDestination(value);
    }

    if (name === 'email') {
      setEmail(value);
    }

    if (name === 'interestedActivitiesInput') {
      setInterestedActivitiesInput(value);
    }

    if (name === 'password') {
      setPassword(value);
    }

    if (name === 'password_confirmation') {
      setPasswordConfirmation(value);
    }

    if (name === 'profileDisplayName') {
      setProfileDisplayName(value);
    }

    if (name === 'profileEmail') {
      setProfileEmail(value);
    }
  }

  function handleCancelSaveProfileForUseCallback() {
    setProfileDisplayName(profileDataFromApi['Display name'])
    setProfileEmail(profileDataFromApi['email'])
    setFormError(false)
    setEmailError(false)
    setProfileDisplayNameError(false)
    toggle()
  }

  function handleKeyUpForUseCallback(e) {
    if (e.keyCode === 188) {
      const newArr = [...interestedActivities];
      newArr.push(e.target.value.slice(0, -1));
      setInterestedActivities(newArr)
      setInterestedActivitiesInput('')
    }
  }

  const handleKeyUp = useCallback((e) => {
    e.persist();
    handleKeyUpForUseCallback(e);
  }, [])

  // const handleChange = useCallback((e) => {
  //   e.persist();
  //   const { name, value } = e.target;
  //   handleChangeForUseCallBack(name, value);
  // }, [email, formType, password, password_confirmation, handleChangeForUseCallBack, setIsLoading]);

  const handleChange = useCallback((e) => {
    e.persist();
    const { name, value } = e.target;
    handleChangeForUseCallBack(name, value);
  }, []);

  function handleSubmitForUseCallBack(e, formType) {


    e.preventDefault();
    setDisableButton(true);

    validateInputs(
      formType,
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

    if (e.target.computedName === 'SAVE') {
      toggle()
    }

    setFormType(formType)
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
        email={email}
        emailDup={emailDup}
        emailError={emailError}
        emailFeedback={emailFeedback}
        formError={formError}
        formType={formType}
        formSuccess={formSuccess}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        id={id}
        isLoading={isLoading}
        mounted={mounted}
        password={password}
        passwordError={passwordError}
        passwordFeedback={passwordFeedback}
        responseMessage={responseMessage}
        tokenExpired={tokenExpired}
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
        setIsLoading={setIsLoading}
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
        disableButton={disableButton}
        email={email}
        emailError={emailError}
        emailFeedback={emailFeedback}
        formType={formType}
        formSuccess={formSuccess}
        formError={formError}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        mounted={mounted}
        responseMessage={responseMessage}
      />,
      () => forgotPasswordSubmit(
        email, setEmail, setResponseMessage, setFormError, setFormSuccess, setIsLoading
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
        suppressHydrationWarning
        disableButton={disableButton}
        emailFeedback={emailFeedback}
        emailError={emailError}
        formError={formError}
        formType={formType}
        formSuccess={formSuccess}
        handleChange={handleChange}
        handleKeyUp={handleKeyUp}
        handleSubmit={handleSubmit}

        handleCancelSaveProfileForUseCallback={handleCancelSaveProfileForUseCallback}
        interestedActivities={interestedActivities}
        interestedActivitiesInput={interestedActivitiesInput}
        interestedActivitiesError={interestedActivitiesError}
        interestedActivitiesFeedback={interestedActivitiesFeedback}

        isLoading={isLoading}
        isProfileInEditMode={isProfileInEditMode}
        memberSince={memberSince}
        mounted={mounted}
        profileEmail={profileEmail}
        profileDataFromApi={profileDataFromApi}
        profileDisplayName={profileDisplayName}
        profileDisplayNameError={profileDisplayNameError}
        profileDisplayNameFeedback={profileDisplayNameFeedback}
        profileUserAvatar={profileUserAvatar}
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
        setProfileUserAvatar={setProfileUserAvatar}
        toggle={toggle}

      />,
      () => (updateProfileSubmit(
        interestedActivities, profileDisplayName, profileEmail, profileUserAvatar, setFormError, setFormSuccess, setIsLoading, setResponseMessage)
      )
    ],
  };

  return Forms[formType][0];
}

export default React.memo(FormComponent)
