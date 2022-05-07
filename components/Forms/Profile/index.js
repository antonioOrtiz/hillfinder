import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic'
import moment from 'moment';
import isEqual from 'lodash.isequal';

import getProfile from 'clientApi/GetProfile'

import { Loader } from '../../Loader'

import { useUser } from 'lib/hooks'

import { userState } from 'components/Context/UserContext'

import { IsEmptyOrWhiteSpace } from 'utils/index'

import {
  FormResponse,
  FormWrapper,
  InterestedActivitiesComponent,
  UserNameComponent as ProfileEmailComponent,
  ProfileInputComponent as ProfileDisplayNameComponent, UserAvatarComponent
} from '../FormElements'

export default function ProfileForm({
  emailError,
  emailFeedback,

  formError,
  formType,
  formSuccess,

  handleChange,
  handleSubmit,
  interestedActivities,
  interestedActivitiesError,
  interestedActivitiesFeedback,
  interestedActivitiesInput,

  isProfileInEditMode,

  mounted,
  profileEmail,
  profileDisplayName,
  profileDisplayNameError,
  profileDisplayNameFeedback,
  isProfileDataFromApiUnchanged,
  proxyProfile,
  profileUserAvatar,

  responseMessage,
  resetProfile,
  search,

  setEmailError,
  setFormError,
  setFormSuccess,
  setInterestedActivities,
  setInterestedActivitiesError,
  setInterestedActivitiesInput,
  setProfileDisplayName,
  setProfileDisplayNameError,
  setProfileEmail,
  setIsProfileDataFromApiUnchanged,
  setProxyProfile,
  setProfileUserAvatar,
  setResponseMessage,
  setSearch,
  toggle,
}) {

  const [memberSince, setMemberSince] = useState('');
  const [profileDataFromApi, setProfileDataFromApi] = useState({});

  const { state } = userState();
  const { isLoggedIn } = state;
  const { user } = useUser(!isLoggedIn ? false : true)

  useEffect(() => {
    if (user !== undefined) {
      const fetchProfile = async () => {

        const { data } = await getProfile();

        const email = data[0]._user.email
        const obj = data[0];
        const { __v, _user, _id, memberSince, ...profile } = obj;
        const fomatted_date = moment(memberSince).format('MM/DD/YYYY');
        const { displayName, userAvatar } = profile

        let updatedProfile = { ...profile, email }
        setProxyProfile(updatedProfile)
        setProfileDataFromApi(updatedProfile)
        setMemberSince(fomatted_date)
        setProfileDisplayName(displayName)
        setProfileEmail(email)
        setInterestedActivities(profile.interestedActivities)
        setProfileUserAvatar(userAvatar)
      }
      fetchProfile()
    }
  }, [resetProfile])

  const ProfileButton = `mb-5 mr-2.5 self-center inline-block text-textColor btn btn-primary`
  const SaveButton = `${formError || formSuccess ? "'cursor-not-allowed', 'opacity-50'" : null} mb-5 mr-2.5 self-center inline-block text-textColor btn btn-primary`

  function handleCancelSaveProfileForUseCallback() {
    setProfileDisplayName(profileDataFromApi.displayName)
    setProfileEmail(profileDataFromApi.email)
    setFormError(false)
    setIsProfileDataFromApiUnchanged(null)
    setEmailError(false)
    setProfileDisplayNameError(false)
    setInterestedActivitiesError(false)
    toggle()
  }

  function handleProfileSubmit(e) {
    if (isEqual(profileDataFromApi, proxyProfile) && IsEmptyOrWhiteSpace(interestedActivitiesInput)) {
      e.preventDefault()
      e.stopPropagation();
      setFormError(false)
      setFormSuccess(false)
      setIsProfileDataFromApiUnchanged(true)
      setResponseMessage('Your profile information has not changed. Either update your profile or select cancel below.')
    } else {
      handleSubmit(e, formType)
    }
  }

  return (
    mounted &&
    <FormWrapper>
      <div className="p-4 rounded-md shadow-inner bg-slate-50 drop-shadow-lg">
        <FormResponse
          formType={formType}
          formError={formError}
          formSuccess={formSuccess}
          isProfileDataFromApiUnchanged={isProfileDataFromApiUnchanged}
          responseMessage={responseMessage}
        />

        <UserAvatarComponent
          isProfileInEditMode={isProfileInEditMode}
          profileUserAvatar={profileUserAvatar}
          setProfileUserAvatar={setProfileUserAvatar}
        />
        <p className="mb-5 text-center text-profileColor"> Member since: <br /> {memberSince} </p>

        <form
          noValidate
        >
          <div className="text-center">
            {isProfileInEditMode ?
              <button
                className={SaveButton + ' w-2/5'}
                onClick={handleProfileSubmit}
              >
                Save
              </button> : null}

            {isProfileInEditMode
              ?
              <button
                className={ProfileButton + ' w-2/5'}
                type="button"
                onClick={handleCancelSaveProfileForUseCallback}
              >
                Cancel
              </button>
              :
              <button
                className={ProfileButton + ' w-40'}
                type='button'
                onClick={toggle}
              >
                Edit Profile
              </button>}
          </div>

          <ProfileDisplayNameComponent
            classNames={`${isProfileInEditMode ? "bg-white" : "opacity-50 cursor-not-allowed"} border-2 px-3 mt-1 py-3 rounded text-sm text-black shadow shadow-input focus:outline-none focus:ring w-full
           `}
            errorType={profileDisplayNameError}
            handleChange={handleChange}
            isProfileInEditMode={isProfileInEditMode}
            label="Display name:"
            name="profileDisplayName"
            messageContent={profileDisplayNameFeedback}
            value={profileDisplayName}
          />

          <ProfileEmailComponent
            classNames={`${isProfileInEditMode ? "bg-white" : "opacity-50 cursor-not-allowed"} border-2 px-3 mt-1 py-3  rounded text-sm text-black shadow shadow-input focus:outline-none focus:ring w-full
           `}
            errorType={emailError}
            handleChange={handleChange}
            isProfileInEditMode={isProfileInEditMode}
            label="Email"
            name="profileEmail"

            messageContent={emailFeedback}
            placeholder="E-mail address, e.g.joe@schmoe.com"
            value={profileEmail}
            wrapperClassForProfileComponent={true}
          />

          <InterestedActivitiesComponent
            errorType={interestedActivitiesError}
            handleChange={handleChange}
            interestedActivities={interestedActivities}
            isProfileInEditMode={isProfileInEditMode}
            label="Interested activities:"
            messageContent={interestedActivitiesFeedback}
            mounted={mounted}
            search={search}
            setFormError={setFormError}
            setSearch={setSearch}
            setInterestedActivities={setInterestedActivities}
            setInterestedActivitiesError={setInterestedActivitiesError}
            setIsProfileDataFromApiUnchanged={setIsProfileDataFromApiUnchanged}
            setInterestedActivitiesInput={setInterestedActivitiesInput}
            setProxyProfile={setProxyProfile}
            value={interestedActivitiesInput}
          />
        </form>
      </div>
    </FormWrapper>
  );
}
