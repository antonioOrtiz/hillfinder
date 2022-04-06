import dynamic from 'next/dynamic'
import React, { useState } from 'react';
import { Loader } from '../Loader/index'
const Message = dynamic(
  () => import('../Message/index'),
  {
    loading: () => <Loader />
  }
)
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
  if (formError && responseMessage) {
    return (
      <Message state="Error"
        content={responseMessage}
      />
    )
  } else if (emailDup) {
    return (<
      Message state="Warning"
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
  } else return errorType
    ? <Message
      state="Error"
      header="Error"
      content={responseMessage}
    /> : null;
}
export function UserNameComponent({
  changeHandler,
  classNames,
  errorType,
  label,
  messageContent,
  name,
  placeholder,
  wrapperClassForProfileComponent,
  value,
}) {
  return (
    <div
      className={
        `${wrapperClassForProfileComponent ? "relative" : null} "w-full mb-3"`}
    >
      <label
        className={
          `${wrapperClassForProfileComponent
            ? "inline-block align-bottom mb-1"
            : "block uppercase text-black-700 text-xs font-bold mb-2"}`}
        htmlFor="grid-password">
        {label}
      </label>
      <input type="email"
        name={name}
        className={classNames}
        placeholder={placeholder}
        style={
          { transition: "all .15s ease" }
        }
        value={value}
        onChange={changeHandler}
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
  handleProfileDataFromApiHandleChange,
  isProfileInEditMode,
  label,
  messageContent,
  name,
  notInterestedActivitiesRef,
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
        ref={notInterestedActivitiesRef}
        onChange={(e) => handleProfileDataFromApiHandleChange(e)}
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
export function PasswordComponent({ label, name, value, placeholder, errorType, messageContent, changeHandler }) {
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
    <div className="relative w-full mb-3">
      <div className="absolute top-8 right-0 flex items-center px-2">
        <input className="hidden js-password-toggle" type="checkbox" />
        <label className="bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-green-900 font-mono cursor-pointer js-password-label" onClick={handleChangePasswordToggle}>{passwordLabel}</label>
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
        className="border-0 px-3 py-3 placeholder-gray-400 text-black-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
        placeholder={placeholder}
        style={{ transition: "all .15s ease" }}
        onChange={changeHandler}
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
  handleChange,
  handleClick,
  handleKeyUp,
  interestedActivities,
  interestedActivitiesInput,
  isProfileInEditMode,
}) {

  return (
    <ul className="list-none mt-0 mb-10">

      <li className="text-green-900 font-semibold mt-5 mb-2 w-full"
        onClick={handleClick}> INTERESTED ACTIVITIES: <br /><span className="font-normal">
          {interestedActivities.join(', ')}</span>
      </li>

      <label forhtml="Interested activities" className="inline-block align-bottom mb-1"> <span className="text-green-900 text-sm mb-3">Accept comma separated input:</span></label>

      <input
        name="interestedActivities"
        type="text"
        disabled={isProfileInEditMode}
        value={interestedActivitiesInput}
        placeholder={'e.g. Running, skating etc.'}
        onChange={(e) => handleChange(e)}
        onKeyUp={handleKeyUp}
        className={`${isProfileInEditMode
          ? " text-green-900 border-green-900"
          : "text-white focus:border-borderColorInEditMode"}
                      w-full inline-block align-bottom bg-transparent text-sm
                      border-b-2 placeholder-gray-700 placeholder-opacity-50 outline-none
                      `}
      />
    </ul>
  )

}
