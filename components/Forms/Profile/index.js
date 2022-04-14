import React from 'react';
import dynamic from 'next/dynamic'

import { useToggle } from '../../../lib/hooks'

import { Loader } from '../../Loader'

const Message = dynamic(
  () => import('../../Message'),
  {
    loading: () => <Loader />
  }
)

import { InterestedActivitiesComponent, UserNameComponent as ProfileEmailComponent, ProfileInputComponent as ProfileDisplayNameComponent, UserAvatarComponent } from '../FormElements'

export default function ProfileForm({
  disableButton,
  emailError,
  emailFeedback,
  formError,
  formType,
  formSuccess,
  handleChange,
  handleKeyUp,
  handleSubmit,
  handleCancelSaveProfileForUseCallback,
  interestedActivities,
  interestedActivitiesInput,
  interestedActivitiesError,
  interestedActivitiesFeedback,
  isLoading,
  isProfileInEditMode,
  memberSince,
  mounted,
  profileEmail,
  profileDataFromApi,
  profileDisplayName,
  profileDisplayNameError,
  profileDisplayNameFeedback,
  profileUserAvatar,
  responseMessage,
  setFormError,
  setDisableButton,
  setEmailError,
  setFormSuccess,
  setIsLoading = () => { },
  setInterestedActivities,
  setInterestedActivitiesError,
  setInterestedActivitiesFeedback,
  setInterestedActivitiesInput,
  setProfileDisplayName,
  setProfileDisplayNameError,
  setProfileEmail,
  setProfileUserAvatar,
  toggle
}) {

  const ProfileButton = `mb-5 mr-2.5 w-40 self-center inline-block text-textColor btn btn-primary`

  return (
    mounted && <div className="px-4 gap-3 grid">
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

      <div className="card-body card glass p-0">

        <UserAvatarComponent
          isProfileInEditMode={isProfileInEditMode}
          profileUserAvatar={profileUserAvatar}
        />


        <div className="px-8">

          <p className=" mb-5 text-center	 text-textColor"> Member Since: < br /> {memberSince} </p>

          <form
            noValidate
            onSubmit={e => {
              handleSubmit(e, formType)
            }}
          >
            <div className="text-center">
              {isProfileInEditMode ?
                <button
                  className={ProfileButton}
                  type="submit"
                  disabled={disableButton}
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
              classNames={`${isProfileInEditMode
                ? `focus:border-borderColorInEditMode`
                : ` text-green-900 border-green-900  `}
                w-full inline-block align-bottom bg-transparent text-white
                border-b-2 placeholder-gray-700 placeholder-opacity-50 outline-none text-white
             `}
              errorType={profileDisplayNameError}
              handleChange={handleChange}
              isProfileInEditMode={!isProfileInEditMode}
              label="Display Name:"
              name="profileDisplayName"
              messageContent={profileDisplayNameFeedback}
              value={profileDisplayName}
            />

            <ProfileEmailComponent
              classNames={`${isProfileInEditMode
                ? `focus:border-borderColorInEditMode`
                : ` text-green-900 border-green-900  `}
                w-full inline-block align-bottom bg-transparent
                border-b-2 placeholder-gray-700 placeholder-opacity-50 outline-none text-white
             `}
              errorType={emailError}
              handleChange={handleChange}
              isProfileInEditMode={!isProfileInEditMode}
              label="Email:"
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
              handleChange={handleChange}
              handleKeyUp={handleKeyUp}
              interestedActivities={interestedActivities}
              interestedActivitiesInput={interestedActivitiesInput}
              isProfileInEditMode={!isProfileInEditMode}
              label="INTERESTED ACTIVITIES:"


            />
          </form>
        </div>
      </div></div>
  );
}
