import React from 'react';
import GenericFormComponent from '../FormElements'

export default function ProfileForm({
  mounted,
  notInterestedActivitiesRef,
  email,
  emailError,
  emailFeedback,
  formType,
  formSuccess,
  formError,
  accountNotVerified,
  handleChange,
  handleSubmit,
  interestedActivitiesInput,
  interestedActivities,
  memberSince,
  profileDataFromApi,
  disableButton,
  isLoading,
  setIsLoading,
  setInterestedActivities,
  setInterestedActivitiesInput,
  setProfileDataFromApi,
  updateProfileSubmit,
  responseMessage,
}) {
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
  );
}
