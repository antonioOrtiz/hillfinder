import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader/index'

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
  email,
  errorType,
  handleChange,
  isProfileInEditMode,
  label,
  messageContent,
  name,
  placeholder,

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
        className={"block uppercase text-black-700 text-xs font-bold mb-2"}
        htmlFor="grid-password">
        {label}
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
        value={email}
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
      <label htmlFor={name} className="inline-block align-bottom mb-1">
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
      <div className="absolute top-8 right-0 flex items-center px-2">
        <input className="hidden js-password-toggle" type="checkbox" />
        <label className="bg-gray-300 hover:bg-gray-400 rounded mt-0 px-2 py-1 text-sm text-green-900 font-mono cursor-pointer js-password-label" onClick={handleChangePasswordToggle}>{passwordLabel}</label>
      </div>
      <label
        className="block uppercase text-black-700 text-xs font-bold mb-2"
        htmlFor="grid-password"
      >
        {label}
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
  classNames,
  handleChange,
  handleClick,
  handleKeyUp,
  interestedActivities,
  interestedActivitiesInput,
  isProfileInEditMode,
  label,
}) {

  return (
    <ul className="list-none mt-0 mb-10">

      <li className="text-black-900 font-semibold mt-5 mb-2 w-full"
        onClick={handleClick}> {label} <br /><span className="font-normal">
          {interestedActivities.join(', ')}</span>
      </li>

      <label forhtml="Interested activities" className="inline-block align-bottom mb-1"> <span className=" text-sm mb-3">Accept comma separated input:</span></label>

      <input
        className={classNames}
        disabled={isProfileInEditMode}
        name="interestedActivitiesInput"
        type="text"
        placeholder={'e.g. Running, skating etc.'}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        value={interestedActivitiesInput}
      />
    </ul>
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
      <div className="py-5 relative avatar online flex items-end justify-center items-center		">
        <hr className="absolute mt-10 w-full divider glass h-px"></hr>
        <div className="z-50 border-2 border-editModeTextColor rounded-full w-24 h-24 shadow-md">
          <label className="cursor-pointer mt-6">
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
