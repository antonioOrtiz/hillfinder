import React from 'react';
import GenericFormComponent from '../FormElements'

export default function RegisterForm({
  mounted,
  handleSubmit,
  formType,
  formSuccess,
  formError,
  accountNotVerified,
  email,
  emailDup,
  emailError,
  emailFeedback,
  handleChange,
  password,
  passwordError,
  passwordFeedback,
  disableButton,
  isLoading,
  responseMessage,
}) {
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
      buttonName={"Register"}
      isLoading={isLoading}
      responseMessage={responseMessage}
    />
  );
}
