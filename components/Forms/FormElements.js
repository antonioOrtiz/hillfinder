import dynamic from 'next/dynamic'
import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '../Loader/index'
import Image from 'next/image'

var Tokenizer = require('react-typeahead').Tokenizer;

import { RiImageEditLine } from 'react-icons/ri';

import { useRouter } from 'next/router'

const Message = dynamic(
  () => import('../Message/index'),
  {
    loading: () => <Loader />
  }
)

import saveAvatar from 'clientApi/SaveAvatar';

export function FormResponse({
  accountNotVerified,
  emailDup,
  formType,
  formError,
  formSuccess,
  isProfileDataFromApiUnchanged,
  responseMessage,
  tokenExpired
}) {

  if (formType === 'Profile') {
    if (isProfileDataFromApiUnchanged) {
      return <Message
        state="Warning"
        content={responseMessage}
      />
    }
    if (formSuccess) {
      return <Message state="SuccessAlert"
        content={"You profile information has been saved!"}
      />
    }
    if (formError) {
      return <Message state="Error"
        content={'Your update ran into a problem, see below for details.'}
      />
    }
  }
  else if (formError && responseMessage) {
    return (
      <Message state="Error"
        content={responseMessage}
      />
    )
  } else if (emailDup) {
    return (
      <Message state="Warning"
        content={responseMessage}
      />
    )
  } else if (accountNotVerified && !formError && responseMessage) {
    return (
      <Message state="Warning"
        content={responseMessage}
      />
    )
  } else if (tokenExpired) {
    return (
      <Message state="Warning"
        header={'Warning'}
        content={'This token is expired.'}
      />
    )
  } else if (formSuccess && responseMessage) {
    return (
      <Message state="Success"
        content={responseMessage}
      />
    )
  }
  return null

}

export function UserNameComponent({
  classNames,
  errorType,
  handleChange,
  isProfileInEditMode,
  label,
  messageContent,
  name,
  placeholder,
  value,
  wrapperClassForProfileComponent,
}) {

  const router = useRouter();

  const { pathname } = router

  return (
    <div
      className={
        `${wrapperClassForProfileComponent ? "relative" : null} "w-full my-3"`}
    >
      <label htmlFor={name} className={"inline-block align-bottom mb-1"}>
        {label}:
      </label>
      <input type="email"
        className={classNames}
        disabled={pathname === '/profile' ? !isProfileInEditMode : false}
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
        style={
          { transition: "all .15s ease" }
        }
        value={value}
      />
      {errorType ? <Message
        state="Error"
        header="Error"
        content={messageContent}
      /> : null}
    </div >
  )
}

export function ProfileInputComponent({
  classNames,
  errorType,
  handleChange,
  isProfileInEditMode,
  label,
  messageContent,
  name,
  value,
}) {

  return (
    <div className="relative w-full mb-3" >
      <label htmlFor={name} className={"inline-block align-bottom mb-1"}>
        {label}
      </label>
      <input
        className={classNames}
        disabled={!isProfileInEditMode}
        name={name}
        placeholder="Display Name, e.g. skaterBoi"
        onChange={handleChange}
        type="text"
        value={value}
      />
      {errorType ? <Message
        state="Error"
        header="Error"
        content={messageContent}
      /> : null}
    </div >
  );
}

export function PasswordComponent({
  classNames,
  errorType,
  label,
  name,
  handleChange,
  messageContent,
  placeholder,
  value,
}) {

  const [inputType, setInputType] = useState('password');
  const [passwordLabel, setpasswordLabel] = useState('show');

  const handleChangePasswordToggle = () => {
    if (inputType === 'password') {
      setpasswordLabel('hide');
      setInputType('text');
    } else {
      setpasswordLabel('show');
      setInputType('password');
    }
  }

  return (
    <div className="relative w-full my-3 ">
      <div className="absolute right-0 flex items-center px-2 top-8">
        <input className="hidden js-password-toggle" type="checkbox" />
        <label className="px-2 py-1 mt-[.325rem] font-mono text-sm text-green-900 bg-gray-300 rounded cursor-pointer hover:bg-gray-400 js-password-label" onClick={handleChangePasswordToggle}>{passwordLabel}</label>
      </div>
      <label
        className="inline-block mb-1 align-bottom"
        htmlFor="grid-password"
      >
        {label}:
      </label>
      <input
        name={name}
        type={inputType}
        value={value}
        className={classNames}
        placeholder={placeholder}
        style={{ transition: "all .15s ease" }}
        onChange={handleChange}
        autoComplete="on"
      />
      {errorType ? <Message
        state="Error"
        header="Error"
        content={messageContent}
      /> : null}
    </div>
  )
}

export function InterestedActivitiesComponent({
  errorType,
  handleChange,
  interestedActivities,
  isProfileInEditMode,
  label,
  messageContent,
  search,
  setFormError,
  setInterestedActivities,
  setInterestedActivitiesError,
  setIsProfileDataFromApiUnchanged,
  setInterestedActivitiesInput,
  setProxyProfile,
  value
}) {

  const input = `${isProfileInEditMode ? "bg-white" : "opacity-50 cursor-not-allowed"}  px-3 mt-1 py-3  rounded text-sm text-black shadow shadow-input focus:outline-none focus:ring w-full block border-2`
  const token = `${isProfileInEditMode ? "bg-white" : "opacity-50 cursor-not-allowed pointer-events-none"}  rounded-md bg-primary text-white inline-block py-0.5 pl-2 pr-1 my-1 mx-1 `
  const results = "border-dashed border-2 p-1 rounded-md border-input mt-2"

  const TokenRef = useRef(null);

  return (
    <div className="relative w-full my-3 ">
      <label forhtml="Interested activities" className={"text-profileColor inline-block align-bottom mb-1"}> <span className="inline-block mb-1 align-bottom"> {label}</span></label>

      <Tokenizer
        ref={TokenRef}
        customClasses={{
          input: input,
          results: results,
          token: token
        }}
        defaultSelected={interestedActivities}
        disabled={!isProfileInEditMode}
        getSelectedTokens={(token) => {
          setProxyProfile(preProxy => ({ ...preProxy, ...{ interestedActivities: [...interestedActivities, token] } }))
        }}
        inputProps={
          {
            name: "interestedActivitiesInput"
          }
        }
        onBlur={handleChange}
        options={search}
        onFocus={(e) => {
          setIsProfileDataFromApiUnchanged(null)

          setInterestedActivitiesError(false)
          setFormError(false)
        }}
        onTokenAdd={(token) => {
          const updatedActivities = [...interestedActivities, token];

          setIsProfileDataFromApiUnchanged(null)

          setProxyProfile(proxy => ({ ...proxy, ...{ interestedActivities: updatedActivities } }))

          return setInterestedActivities(updatedActivities)
        }}
        onTokenRemove={(token) => {
          setIsProfileDataFromApiUnchanged(null);

          const updatedActivities = [...interestedActivities].filter(a => a !== token)

          setProxyProfile(proxy => ({ ...proxy, ...{ interestedActivities: updatedActivities } }))

          return setInterestedActivities(updatedActivities)
        }}
        showOptionsWhenEmpty={true}
        placeholder="e.g. Running, skating"
        value={value}
      />

      {errorType ? <Message
        state="Error"
        header="Error"
        content={messageContent}
      /> : null}
    </div>
  )
}

export function UserAvatarComponent({
  isProfileInEditMode,
  profileUserAvatar,
  setProfileUserAvatar
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profileUserAvatar) {
      setLoading(false)
    }
  }, [profileUserAvatar])

  async function handleUpload(e) {
    const files = e.target.files;
    const formData = new FormData()
    formData.append('file', files[0])
    formData.append('upload_preset', 'profile_avatar')
    setLoading(true)
    const { data } = await saveAvatar(formData);
    setProfileUserAvatar(data.secure_url)
  }

  return (
    <form>
      <div className="relative flex items-center justify-center py-5 online ">
        <hr className="absolute w-full h-px mt-6 divider"></hr>
        <div className="avatar">
          {!isProfileInEditMode ? null : <div className="absolute z-50 left-[5.25rem] top-[5rem]">
            <label htmlFor="FileInput" className="mt-6">
              <RiImageEditLine
                className="border-dashed rounded-md hover:border-dashed border-emerald-700 hover:bg-avatarEdit glass bg-slate-100"
                style={{ 'color': '#386F22', 'fontSize': '2em', 'cursor': 'pointer' }} />
            </label>
            <input id="FileInput" type="file" name="file" className="hidden" multiple onChange={handleUpload} />
          </div>}
          {loading
            ? <Loader />
            : <div className="z-40 border-2 rounded-full shadow-md w-28 h-28 border-editModeTextColor">
              <Image
                alt="Avatar"
                src={profileUserAvatar}
                width={108}
                height={108}
                blurDataURL={profileUserAvatar}
                placeholder="blur" // Optional blur-up while loading
              />
            </div>}

        </div>
      </div>
    </form>
  )
}

export const FormWrapper = ({ children }) => {
  const [onProfilePage, setOnProfilePage] = useState(false);
  const { pathname } = useRouter();

  useEffect(() => {
    if (pathname === '/profile') {
      setOnProfilePage(true)
    }
    return () => setOnProfilePage(false)
  }, [])

  return (
    <div className="grid h-full grid-cols-1 py-5 auto-cols-max place-items-center justify-items-center">
      {onProfilePage
        ? <div className="shadow-lg rounded-md bg-gray-300 w-11/12 sm:max-w-md h-{297} bg-opacity-50 px-4 py-5">
          {children}
        </div>
        : <div className="shadow-lg rounded-md bg-gray-300 w-full max-w-sm h-{297} bg-opacity-50 px-4 py-5">
          {children}
        </div>
      }
    </div>
  )
}

