import React from 'react';
import GenericFormComponent from '../FormElements'

export default function ForgotPasswordForm({
  mounted,
  handleSubmit,
  formType,
  formSuccess,
  formError,
  email,
  handleChange,
  emailError,
  emailFeedback,
  password,
  passwordError,
  passwordFeedback,
  disableButton,
  setDisableButton,
  isLoading,
  responseMessage,
}) {
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
