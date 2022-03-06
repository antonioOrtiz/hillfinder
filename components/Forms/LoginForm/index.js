import React, { useEffect } from 'react';
import GenericFormComponent from '../FormElements'

export default function LoginForm({
  userdispatch,
  id,
  mounted,
  handleSubmit,
  formType,
  formSuccess,
  formError,
  accountNotVerified,
  email,
  emailError,
  emailFeedback,
  handleChange,
  password,
  passwordError,
  passwordFeedback,
  disableButton,
  isLoading,
  setIsLoading,
  responseMessage }) {

  useEffect(() => {
    userdispatch({ type: 'resetUserAccountIsVerified' })
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
