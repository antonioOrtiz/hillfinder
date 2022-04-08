import React, { useRef, useEffect } from 'react';
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
  handleSubmit,
  emailError,
  emailFeedback,
  disableButton,
  formType,
  formError,
  formSuccess,
  handleChange,
  interestedActivities,
  interestedActivitiesInput,
  interestedActivitiesError,
  interestedActivitiesFeedback,
  memberSince,
  mounted,
  notInterestedActivitiesRef,
  profileDataFromApi,
  profileDisplayName,
  profileDisplayNameError,
  profileDisplayNameFeedback,
  profileUserAvatar,
  responseMessage,
  profileEmail,
  setFormError,
  setDisableButton,
  setEmailError,
  setFormSuccess,
  setIsLoading = () => { },
  setInterestedActivities,
  setInterestedActivitiesInput,
  setInterestedActivitiesError,
  setInterestedActivitiesFeedback,
  setProfileDisplayName,
  setProfileDisplayNameError,
  setProfileEmail
}) {

  const profileEditSaveButtonRef = useRef(null)
  const [isProfileInEditMode, toggle] = useToggle(true);
  const saveChangesEditProfileButton = `mb-5 mr-2.5 w-40 self-center inline-block text-textColor  btn btn-primary ${disableButton ? "opacity-40 cursor-not-allowed border-none bdisabled" : "  btn-outline "}`

  useEffect(() => {
    if (formSuccess) {
      setTimeout(() => {
        setFormSuccess(false);
        setDisableButton(false)
        toggle()
      }, 5000);
    }
  }, [formSuccess])


  function handleEditProfileOrSave(e) {
    if (formError) return false
    if (e.target.computedName === 'SAVE CHANGES') {
      handleSubmit(e, formType)
    } else {
      toggle()
    }
  }

  function handleCancelSaveProfile() {
    setProfileDisplayName(profileDataFromApi['Display name'])
    setProfileEmail(profileDataFromApi['email'])
    setFormError(false)
    setEmailError(false)
    setProfileDisplayNameError(false)
    toggle()
  }

  function handleClick(e, id) {
    e.target.previousElementSibling?.focus()
    if (e.target.nextElementSibling?.nodeName === 'INPUT') {
      e.target.nextElementSibling?.focus()
    }
  }

  function handleKeyUp(e) {
    if (e.keyCode === 188) {
      const newArr = [...interestedActivities];
      newArr.push(e.target.value.slice(0, -1));
      setInterestedActivities(newArr)
      setInterestedActivitiesInput('')
    }
  }

  function handleProfileDataFromApiHandleChange(e) {
    setFormError(false)
    setEmailError(false)
    setProfileDisplayNameError(false)
    setDisableButton(false)
    if (e.target.name === 'profileDisplayName') {
      setProfileDisplayName(e.target.value)
    } else {
      setProfileEmail(e.target.value)
    }
  }

  return (
    mounted && <div className="px-4 gap-3 ">
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

        {console.log("profileUserAvatar ", profileUserAvatar)}
        <UserAvatarComponent isProfileInEditMode={isProfileInEditMode} profileUserAvatar={profileUserAvatar} />

        <div className="text-center">
          <button ref={profileEditSaveButtonRef}
            className={saveChangesEditProfileButton}
            onClick={handleEditProfileOrSave}
            type={!isProfileInEditMode ? 'submit' : 'button'}

          >
            {isProfileInEditMode ? 'Edit Profile' : 'Save changes'}
          </button>
          {isProfileInEditMode
            ? null
            : <button
              className="mb-5 ml-2.5 w-40 self-center inline-block text-textColor btn btn-outline btn-primary"
              onClick={handleCancelSaveProfile}
              type="button">
              Cancel
            </button>}
        </div>
        <div className="px-8">
          <p className=" mb-5 text-center	 text-textColor"> Member Since: < br /> {memberSince} </p>
          <form onSubmit={e => handleSubmit(e, formType)}>
            <ProfileDisplayNameComponent
              classNames={`${isProfileInEditMode
                ? " text-green-900 border-green-900"
                : ` focus:border-borderColorInEditMode`}
                w-full inline-block align-bottom bg-transparent text-white
                border-b-2 placeholder-gray-700 placeholder-opacity-50 outline-none
             `}
              errorType={profileDisplayNameError}
              handleProfileDataFromApiHandleChange={handleProfileDataFromApiHandleChange}
              isProfileInEditMode={isProfileInEditMode}
              label="Display Name:"
              name="profileDisplayName"
              messageContent={profileDisplayNameFeedback}
              value={profileDisplayName}
              notInterestedActivitiesRef={notInterestedActivitiesRef}
            />

            <ProfileEmailComponent
              changeHandler={handleProfileDataFromApiHandleChange}
              classNames={`${isProfileInEditMode
                ? " text-green-900 border-green-900"
                : `text-white focus:border-borderColorInEditMode`}
                w-full inline-block align-bottom bg-transparent
                border-b-2 placeholder-gray-700 placeholder-opacity-50 outline-none
             `}
              errorType={emailError}
              isProfileInEditMode={isProfileInEditMode}
              label="Email:"
              name="profileEmail"
              messageContent={emailFeedback}
              placeholder="E-mail address, e.g.joe@schmoe.com"
              value={profileEmail}
              wrapperClassForProfileComponent={true}
            />

            <InterestedActivitiesComponent
              handleChange={handleChange}
              handleClick={handleClick}
              handleKeyUp={handleKeyUp}
              interestedActivities={interestedActivities}
              interestedActivitiesInput={interestedActivitiesInput}
              isProfileInEditMode={isProfileInEditMode}
            />


          </form>
        </div>
      </div></div>
  );
}
