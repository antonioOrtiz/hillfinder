import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic'
import moment from 'moment';
import getProfile from '../../../clientApi/GetProfile'

import { Loader } from '../../Loader'

import { useUser } from '../../../lib/hooks'

import { userState } from '../../Context/UserContext'

import {
  FormWrapper
} from '../FormElements';

const Message = dynamic(
  () => import('../../Message'),
  {
    loading: () => <Loader />
  }
)

import { InterestedActivitiesComponent, UserNameComponent as ProfileEmailComponent, ProfileInputComponent as ProfileDisplayNameComponent, UserAvatarComponent } from '../FormElements'

export default function ProfileForm({
  emailError,
  emailFeedback,
  formError,
  formType,
  formSuccess,
  handleChange,
  handleSubmit,
  interestedActivities,
  isProfileInEditMode,
  mounted,
  profileEmail,
  profileDisplayName,
  profileDisplayNameError,
  profileDisplayNameFeedback,
  profileUserAvatar,
  responseMessage,
  setEmailError,
  setFormError,
  setInterestedActivities,
  setProfileDisplayName,
  setProfileDisplayNameError,
  setProfileEmail,
  setProfileUserAvatar,
  toggle
}) {
  const [memberSince, setMemberSince] = useState('');
  const [profileDataFromApi, setProfileDataFromApi] = useState([]);

  const { userstate } = userState();
  const { isLoggedIn } = userstate;
  const { user } = useUser(!isLoggedIn ? false : true);

  useEffect(() => {
    if (user !== undefined) {
      const fetchProfile = async () => {

        const { data } = await getProfile();

        const email = data[0]._user.email
        const obj = data[0];
        const { __v, _user, _id, memberSince, ...profile } = obj;
        const fomatted_date = moment(memberSince).format('MM/DD/YYYY');
        const { displayName, userAvatar } = profile

        setProfileDataFromApi({ ...profile, email })
        setMemberSince(fomatted_date)
        setProfileDisplayName(displayName)
        setProfileEmail(email)
        setInterestedActivities(profile.interestedActivities)
        setProfileUserAvatar(userAvatar)
      }
      fetchProfile()
    }
  }, [])


  useEffect(() => console.log("profileDataFromApi ", profileDataFromApi), [profileDataFromApi])


  const ProfileButton = `mb-5 mr-2.5 self-center inline-block text-textColor btn btn-primary`
  const SaveButton = `${formError || formSuccess ? "'cursor-not-allowed', 'opacity-50'" : null} mb-5 mr-2.5 self-center inline-block text-textColor btn btn-primary`

  useEffect(() => {
    if (formSuccess && formError === false) {
      toggle()
    }
  }, [formError, formSuccess])

  function handleCancelSaveProfileForUseCallback() {
    setProfileDisplayName(profileDataFromApi.displayName)
    setProfileEmail(profileDataFromApi.email)
    setFormError(false)
    setEmailError(false)
    setProfileDisplayNameError(false)
    toggle()
  }

  return (
    mounted &&
    <FormWrapper>
      <div className="p-4 rounded-md shadow-inner bg-slate-50 drop-shadow-lg">
        {formSuccess
          ? <Message
            state="Success"
            header="Success"
            content={responseMessage}
          /> : null}
        {formError
          ? <Message
            state="Error"
            header="Error"
            content={'Your update ran into a problem, see below for details.'}
          /> : null}
        <UserAvatarComponent
          isProfileInEditMode={isProfileInEditMode}
          profileUserAvatar={profileUserAvatar}
        />
        <p className="mb-5 text-center text-profileColor"> Member since: <br /> {memberSince} </p>

        <form
          noValidate
          onSubmit={e => {
            handleSubmit(e, formType)
          }}
        >
          <div className="text-center">
            {isProfileInEditMode ?
              <button
                className={SaveButton + ' w-2/5'}
                type="submit"
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
            interestedActivities={interestedActivities}
            setInterestedActivities={setInterestedActivities}
            isProfileInEditMode={isProfileInEditMode}
            label="Interested activities:"
          />
        </form>
      </div>
    </FormWrapper>
  );
}
