import React from 'react';
import GenericFormComponent from '../FormElements'

export default function UpdatePasswordForm({
  mounted,
  handleSubmit,
  formType,
  formSuccess,
  formError,
  email,
  emailDup,
  handleChange,
  emailError,
  emailFeedback,
  password,
  password_confirmation,
  passwordError,
  passwordFeedback,
  passwordConfirmationError,
  passwordConfirmationFeedback,
  disableButton,
  isLoading,
  responseMessage,
  tokenExpired,
  responseCodeSuccess,
}) {
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
