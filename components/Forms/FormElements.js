import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader/index'

var Tokenizer = require('react-typeahead').Tokenizer;

import { RiImageEditLine } from 'react-icons/ri';

import { useRouter } from 'next/router'

const Message = dynamic(
  () => import('../Message/index'),
  {
    loading: () => <Loader />
  }
)

import saveAvatar from '../../clientApi/SaveAvatar';

export function FormResponse({
  accountNotVerified,
  emailDup,
  errorType,
  formType,
  formError,
  formSuccess,
  responseMessage,
  tokenExpired
}) {

  console.log("formSuccess ", formSuccess);
  console.log("responseMessage ", responseMessage);

  if (formType === 'Profile') {
    if (formSuccess) {
      <Message state="SuccessAlert"
        content={"You profile information has been saved!"}
      />
    } else {
      <Message state="Error"
        content={responseMessage}
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
  } else {
    return errorType
      ? <Message
        state="Error"
        header="Error"
        content={responseMessage}
      /> : null;
  }
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
      <label
        className={"text-profileColor inline-block align-bottom mb-1"}
        htmlFor="grid-password">
        {label}:
      </label>
      <input type="email"
        className={classNames}
        disabled={pathname === '/profile' ? isProfileInEditMode : false}
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
      <label htmlFor={name} className={"text-profileColor inline-block align-bottom mb-1"}>
        {label}
      </label>
      <input
        className={classNames}
        disabled={isProfileInEditMode}
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
        <label className="px-2 py-1 mt-0 font-mono text-sm text-green-900 bg-gray-300 rounded cursor-pointer hover:bg-gray-400 js-password-label" onClick={handleChangePasswordToggle}>{passwordLabel}</label>
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
  setInterestedActivities,
  isProfileInEditMode,
  label,
}) {

  return (
    <div className="relative w-full my-3 ">
      <label forhtml="Interested activities" className={"text-profileColor inline-block align-bottom mb-1"}> <span className="inline-block mb-1 align-bottom"> {label}</span></label>

      <Tokenizer
        customClasses={{
          input: "border-0 px-3 mt-1 py-3 placeholder-gray-600  rounded text-sm shadow shadow-input focus:outline-none focus:ring w-full",
          results: "border-dashed border-2 p-1 rounded-md border-input mt-2",
          token: "bg-primary text-white inline-block py-0.5 pl-2  pr-1 my-1 mx-1 rounded-md"
        }}
        disabled={isProfileInEditMode}
        options={[
          'Cycling',
          'Jogging',
          'Hiking',
          'Mountain biking',
          'Running',
          'Skate boarding',
          'Skiing',
          'Sledding',
          'Snowboarding',
          'Rollerblading',
          'Trailrunning',
          'Walking'
        ]}
        onTokenAdd={function (token) {
          console.log('token added: ', token);
          setInterestedActivities(prev => [...prev, token])
        }}
        placeholder="e.g. Running, skating"
      />
    </div>
  )

}

export function UserAvatarComponent({ isProfileInEditMode, profileUserAvatar }) {

  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    if (imageSrc === '') {
      setImageSrc(profileUserAvatar)
    }
  }, [profileUserAvatar])

  async function handleOnSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget;
    const fileInput = Array.from(form.elements).find(({ name }) => name === 'file')
    const formData = new FormData();
    for (const file of fileInput.files) {
      formData.append('file', file)
      formData.append('upload_preset', 'user_avatar')
    }

    const { data } = await saveAvatar(formData)
    setImageSrc(data.secure_url)
  }

  return (

    <form onSubmit={handleOnSubmit}
    >
      <div className="relative flex items-center justify-center py-5 avatar online ">
        <hr className="absolute w-full h-px mt-10 divider glass"></hr>
        <div className="z-50 w-24 h-24 border-2 rounded-full shadow-md border-editModeTextColor">
          <label className="mt-6 cursor-pointer">
            <input
              name="file"
              type="file"
              className="hidden"
            /> <img className=""
              src={imageSrc} />
          </label>
        </div>
        {isProfileInEditMode ? null : <button
          type="submit"
          className="absolute z-50 top-5 left-60 "
        >
          <RiImageEditLine className="glass border-profileColor " style={{ 'color': '#bbf7d0', border: 'black', 'fontSize': '1.5em', 'cursor': 'pointer' }} />
        </button>}
      </div>
    </form>
  )
}

export const FormWrapper = ({ children }) => (
  <div className="grid h-screen place-items-center">
    <div className=" shadow-lg rounded-lg bg-gray-300 w-11/12 max-w-sm h-{297} bg-opacity-50 px-4 py-5">
      {children}
    </div>
  </div>
)

