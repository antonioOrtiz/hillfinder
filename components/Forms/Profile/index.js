import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic'

import { Loader } from '../../Loader'

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
  handleCancelSaveProfileForUseCallback,
  isProfileInEditMode,
  memberSince,
  mounted,
  profileEmail,
  profileDisplayName,
  profileDisplayNameError,
  profileDisplayNameFeedback,
  profileUserAvatar,
  responseMessage,
  setInterestedActivities,
  toggle
}) {
  const SaveButton = useRef(null)

  const ProfileButton = `mb-5 mr-2.5 w-40 self-center inline-block text-textColor btn btn-primary`


  useEffect(() => {
    if (formError) {
      SaveButton.current.classList.add('cursor-not-allowed', 'opacity-50')
    }
    return () => SaveButton.current.classList.remove('cursor-not-allowed', 'opacity-50')
  }, [formError])


  return (
    mounted && <div className="grid h-screen place-items-center">
      <div className="p-5 card-body glass card">
        <div className="p-8 rounded-md shadow-inner bg-slate-50 drop-shadow-lg">
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
                  ref={SaveButton}
                  className={ProfileButton}
                  type="submit"
                >
                  Save
                </button> : null}

              {isProfileInEditMode
                ?
                <button
                  className={ProfileButton}
                  type="button"
                  onClick={handleCancelSaveProfileForUseCallback}
                >
                  Cancel
                </button>
                :
                <button
                  className={ProfileButton}
                  type='button'
                  onClick={toggle}

                >
                  Edit Profile
                </button>}
            </div>

            <ProfileDisplayNameComponent
              classNames={`${isProfileInEditMode ? "text-profileColor" : null} border-0 px-3 mt-1 py-3 placeholder-gray-600  rounded text-sm shadow shadow-input focus:outline-none focus:ring w-full
               `}
              errorType={profileDisplayNameError}
              handleChange={handleChange}
              isProfileInEditMode={!isProfileInEditMode}
              label="Display name:"
              name="profileDisplayName"
              messageContent={profileDisplayNameFeedback}
              value={profileDisplayName}
            />

            <ProfileEmailComponent
              classNames={`${isProfileInEditMode ? "text-profileColor" : null} border-0 px-3 mt-1 py-3 placeholder-gray-600  rounded text-sm shadow shadow-input focus:outline-none focus:ring w-full
               `}
              errorType={emailError}
              handleChange={handleChange}
              isProfileInEditMode={!isProfileInEditMode}
              label="Email"
              name="profileEmail"
              messageContent={emailFeedback}
              placeholder="E-mail address, e.g.joe@schmoe.com"
              value={profileEmail}
              wrapperClassForProfileComponent={true}
            />

            <InterestedActivitiesComponent
              classNames={`${isProfileInEditMode
                ? `focus:border-borderColorInEditMode`
                : ` text-green-900 border-green-900  `}
               w-full inline-block align-bottom bg-transparent
               border-b-2 placeholder-gray-700 placeholder-opacity-50 outline-none text-white
            `}
              setInterestedActivities={setInterestedActivities}

              isProfileInEditMode={!isProfileInEditMode}
              label="Interested activities:"

            />
          </form>
        </div>
      </div></div>
  );
}
