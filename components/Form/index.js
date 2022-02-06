import React, { useEffect, useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import moment from 'moment';

import { validateInputs } from '../../utils/index';
import { useRouter } from 'next/router'

import GenericFormComponent from './FormElements'
import { userState, userDispatch } from '../Context/UserContext'

import loginSubmit from '../../clientApi/LoginSubmit'
import registerSubmit from '../../clientApi/RegisterSubmit'
import updatePasswordSubmit from '../../clientApi/UpdatePasswordSubmit'
import forgotPasswordSubmit from '../../clientApi/ForgotPasswordSubmit'
import isConfirmation from '../../clientApi/Confirmation'
import getProfile from '../../clientApi/GetProfile'
import updateProfileSubmit from '../../clientApi/UpdateProfileSubmit'

import { useUser } from '../../lib/hooks'

export default function FormComponent({
  formType
}) {
  const router = useRouter();

  const { dispatch } = userDispatch();

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
  const [profileLoaded, setProfileLoaded] = useState(true);
  const [token, setToken] = useState(null)
  const [tokenExpired, setTokenExpired] = useState(false);
  const [responseCodeSuccess, setResponseCodeSuccess] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [interestedActivitiesInput, setInterestedActivitiesInput] = useState('')

  const { state } = userState();

  const { id, accountNotVerified } = state;
  const { user, mutate } = useUser();

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


  useEffect(() => {
    notInterestedActivitiesRef.current = "notInterestedActivitiesRef"
    interestedActivitiesRef.current = "interestedActivitiesRef"
    if (user !== undefined && profileLoaded) {
      setProfileLoaded(false);

      const fetchProfile = async () => {


        const { data } = await getProfile();


        console.log("data 95", data);
        const { email } = data[0]._user
        const obj = data[0];
        const { __v, _user, _id, 'member-since': memberSince, ...profile } = obj;

        const fomatted_date = moment(memberSince).format('MM/DD/YYYY');

        setMemberSince(fomatted_date)

        profile.email = email;

        for (const profileProp in profile) {
          if (profileProp === 'interested-activities') {
            setInterestedActivities(oldArray => [...oldArray, { id: uuidv4(), 'name': profileProp, 'value': profile[profileProp], }]);
          } else {
            setProfileDataFromApi(oldArray => [...oldArray, { id: uuidv4(), 'name': profileProp, 'value': profile[profileProp], }]);
          }
        }

      }
      fetchProfile()
    }
    return () => { setProfileLoaded(true) }
  }, [])

  const Forms = {
    Login: [LoginForm,
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
        user,
        mutate
      )
    ],
    Register: [RegisterForm,
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
    UpdatePassword: [UpdatePasswordForm,
      () => updatePasswordSubmit(
        password, password_confirmation, setPassword, setPasswordConfirmation, setFormError, setFormSuccess, setIsLoading, setResponseCodeSuccess, setResponseMessage, setDisableButton, router, token
      )
    ],
    ForgotPassword: [ForgotPasswordForm,
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
      () => (isConfirmation(
        dispatch,
        error,
        setError,
        setResponseMessage,
        responseMessage,
      )
      )
    ],
    Profile: [ProfileForm,
      () => (updateProfileSubmit(
        name, email, interestedActivities, setFormError, setFormSuccess, setIsLoading, setResponseMessage)
      )
    ],
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

    console.log("name, value  ", name, value);
    if (name === 'interested_activities') {
      setInterestedActivitiesInput(value);
    }
  }

  function handleSubmit(event, form) {
    event.preventDefault();
    setDisableButton(true);
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

  function LoginForm() {
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

  function RegisterForm() {
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

  function UpdatePasswordForm() {
    return (
      mounted && <GenericFormComponent
        handleSubmit={handleSubmit}
        formType={formType}
        formSuccess={formSuccess}
        formError={formError}
        email={email}
        emailDup={emailDup}
        handleChange={handleChange}
        emailError={emailError}
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

  function ForgotPasswordForm() {
    return (
      mounted && <GenericFormComponent
        handleSubmit={handleSubmit}
        formType={formType}
        formSuccess={formSuccess}
        formError={formError}
        email={email}
        handleChange={handleChange}
        emailError={emailError}
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

  function ProfileForm() {
    return (
      mounted && <GenericFormComponent
        notInterestedActivitiesRef={notInterestedActivitiesRef}
        email={email}
        emailError={emailError}
        emailFeedback={emailFeedback}
        formType={formType}
        formSuccess={formSuccess}
        formError={formError}
        accountNotVerified={accountNotVerified}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        interestedActivitiesInput={interestedActivitiesInput}
        interestedActivities={interestedActivities}
        memberSince={memberSince}
        profileDataFromApi={profileDataFromApi}
        disableButton={disableButton}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setInterestedActivities={setInterestedActivities}
        setInterestedActivitiesInput={setInterestedActivitiesInput}
        setProfileDataFromApi={setProfileDataFromApi}
        updateProfileSubmit={updateProfileSubmit}
        responseMessage={responseMessage}
      />
    )
  }



  console.log("formType ", formType);

  return Forms[formType][0]();
}
