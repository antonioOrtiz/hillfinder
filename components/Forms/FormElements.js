/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";

import dynamic from 'next/dynamic'

import React, { useState, useEffect, useRef } from 'react';

import { Loader } from '../Loader/index'
import { useToggle } from '../../lib/hooks'

const Message = dynamic(
  () => import('../Message/index'),
  {
    loading: () => <Loader />
  }
)

function FormResponse({
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

function UserNameComponent({ label, name, value, placeholder, errorType, messageContent, changeHandler }) {
  return (
    <div className="relative w-full mb-3" >
      <label className="block uppercase text-black-700 text-xs font-bold mb-2" htmlFor="grid-password" > {label}
      </label>
      <input type="email"
        name={name}
        className="border-0 px-3 py-3 placeholder-gray-400 text-black-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
        placeholder={placeholder} /* "E-mail address, e.g. joe@schmoe.com" */
        style={
          { transition: "all .15s ease" }
        }
        value={value}
        onChange={changeHandler}
      />

      <FormResponse errorType={errorType}
        messageContent={messageContent}
      />
    </div >
  )
}

function PasswordComponent({ label, name, value, placeholder, errorType, messageContent, changeHandler }) {
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

export default function GenericInputForm({
  buttonName,
  disableButton,
  handleSubmit,
  formType,
  formError,
  formSuccess,
  accountNotVerified,
  email,
  emailDup,
  handleChange,
  emailError,
  emailFeedback,
  isLoading,
  interestedActivities,
  interestedActivitiesInput,
  memberSince,
  notInterestedActivitiesRef,
  password,
  passwordConfirmation,
  passwordConfirmationError,
  passwordConfirmationFeedback,
  passwordError,
  passwordFeedback,
  profileDataFromApi,
  setDisableButton,
  setInterestedActivities,
  setInterestedActivitiesInput,
  setProfileDataFromApi,
  responseMessage,
  setIsLoading = () => { },
  tokenExpired,
}) {

  const fileSelect = useRef(null);
  const profileEditSaveButtonRef = useRef(null)
  const [isProfileInEditMode, toggle] = useToggle(true);

  async function handleImageUpload() {
    if (fileSelect) {
      fileSelect.current.click();
    }
  }

  useEffect(() => {
    console.log("formType ", formType);
  }, [formType])


  useEffect(() => {
    if (formType === 'ForgotPassword' && email === '') {
      setDisableButton(() => true)
    }
  }, [])

  function handleEditProfileOrSave(e) {
    console.log("e ", e.target.computedName);
    if (e.target.computedName === 'SAVE CHANGES') {
      handleSubmit(e, formType)
    }
    toggle()
  }

  function handleCancelSaveProfile() {
    toggle()
  }

  function handleFiles(files) {
    for (let i = 0; i < files.length; i++) {
      console.log(files[i]);
    }
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
      newArr[0].value.push(e.target.value.slice(0, -1));
      setInterestedActivities(newArr)
      setInterestedActivitiesInput('')
    }
  }

  function handleProfileDataFromApiHandleChange(index, e) {
    const newArr = [...profileDataFromApi];
    newArr[index].value = e.target.value;
    setProfileDataFromApi(newArr)
    e.target.value
  }

  return <>
    {{
      ForgotPassword: <div className="container px-4 max-w-md ">

        <div className="relative flex flex-col min-w-0 break-words shadow-lg rounded-lg bg-gray-300  bg-opacity-50 flex-auto px-4 py-5 pt-0">

          <div className="my-3">
            <h6 className="text-green-900 text-sm text-center font-bold">
              Forgot Password
            </h6>
            <p> Not a problem. Just enter your email address below. If it's registered
              with Hillfinder, we'll send you a link to reset your password.{' '}</p>
          </div>
          <hr className="mb-4 border-b-1 border-gray-500" />

          <form
            noValidate
            onSubmit={e => handleSubmit(e, formType)}
          >
            {UserNameComponent({
              label: "Email",
              name: "email",
              value: email,
              placeholder: "E-mail address, e.g.joe@schmoe.com",
              errorType: emailError,
              messageContent: emailFeedback,
              changeHandler: handleChange
            })}

            {isLoading ? <div className="mt-4 flex justify-center items-center">
              <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32" />
            </div> : null}

            <FormResponse
              tokenExpired={tokenExpired}
              formSuccess={formSuccess}
              formError={formError}
              content={responseMessage} />
          </form>

        </div>

        {{
          ForgotPassword: formError
            ?
            <div className="w-1/2 text-left">
              <Link href="/registration">
                <a className="text-white">
                  <small>Create new account</small>
                </a>
              </Link>
            </div>
            : null, Register: null
        }[formType]}
      </div>,

      Profile:
        <div className="px-4 gap-3 grid">
          <FormResponse
            errorType={emailError}
            messageContent={responseMessage}
          />

          {/* { && <Message state="SuccessAlert"
            content={"You profile information has been saved!"}
          />} */}
          <div className="card-body card glass p-0">
            <div className="relative py-5 avatar online flex justify-center">
              <hr className="absolute z-49 mt-10 w-full divider glass h-px"></hr>

              <div className="relative z-50 rounded-full w-24 h-24">
                <label className="cursor-pointer mt-6">
                  <
                    input
                    ref={fileSelect}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={
                      (e) => handleFiles(e.target.files)
                    }
                  /> <img
                    onClick={handleImageUpload}
                    src="http://daisyui.com/tailwind-css-component-profile-1@94w.png" />
                </label>
              </div>
            </div>
            <div className="text-center">
              <button ref={profileEditSaveButtonRef}
                className="mb-5 mr-2.5 w-40 self-center inline-block text-textColor btn btn-outline btn-primary"
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
                <ul className="list-none mt-10">
                  {profileDataFromApi && profileDataFromApi.map((data, index) => {
                    const { id, name, value } = data

                    return (
                      <li key={id}
                        className="text-green-900 font-semibold mt-5 mb-3 w-full">
                        <label forhtml={name} className="inline-block align-bottom mb-1">{`${name.toUpperCase()}:`} {' '} </label>
                        <input id={id}
                          disabled={isProfileInEditMode}
                          ref={notInterestedActivitiesRef}
                          type="text"
                          value={value}
                          placeholder={{ 'Display name': 'e.g. screen name', 'email': `valid email` }[name]}
                          onChange={(e) => handleProfileDataFromApiHandleChange(index, e)}
                          className={`${isProfileInEditMode
                            ? " text-green-900 border-green-900"
                            : "text-white focus:border-borderColorInEditMode"}
                              w-full inline-block align-bottom bg-transparent
                              border-b-2 placeholder-gray-700 placeholder-opacity-50 outline-none
                              `} />
                      </li>
                    );
                  }, this)
                  } </ul>

                <ul className="list-none mt-0 mb-10">
                  <li className="text-green-900 font-semibold mt-5 mb-2 w-full"
                    onClick={handleClick}> INTERESTED ACTIVITIES: <br /><span className="font-normal">
                      {typeof interestedActivities !== 'undefined' ? interestedActivities[0]?.value && interestedActivities[0].value.join(', ') : null}</span>
                  </li>

                  <label forhtml="Interested activities" className="inline-block align-bottom mb-1"> <span className="text-green-900 text-sm mb-3">Accept comma separated input:</span></label>

                  <input
                    name="interested_activities"
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
              </form>
            </div>
          </div></div>,

      UpdatePassword: <div className="container px-4 max-w-md ">
        <div className="relative flex flex-col min-w-0 break-words shadow-lg rounded-lg bg-gray-300  bg-opacity-50 flex-auto px-4 py-5 pt-0">

          <div className="my-3">
            <h6 className="text-green-900 text-sm text-center font-bold">
              {{ Login: 'Login', Register: 'Register', UpdatePassword: 'Update password' }[formType]}
            </h6>
          </div>
          <hr className="mt-6 border-b-1 border-gray-500" />

          <form onSubmit={e => handleSubmit(e, formType)}>
            {PasswordComponent({
              label: "Password",
              name: "password",
              value: password,
              placeholder: "Password",
              errorType: passwordError,
              messageContent: passwordFeedback,
              changeHandler: handleChange
            })}

            {PasswordComponent({
              label: "Confirm Password",
              name: "password_confirmation",
              value: passwordConfirmation,
              placeholder: "Confirm new password",
              errorType: passwordConfirmationError,
              messageContent: passwordConfirmationFeedback,
              changeHandler: handleChange
            })
            }

            <div className="text-center mt-6">
              <button
                className="btn btn-primary w-full"
                type="submit"
                style={{ transition: "all .15s ease" }}
                disabled={disableButton}
              >
                {{ UpdatePassword: 'Update password' }[formType]}
              </button>
            </div>

            {isLoading ? <div className="mt-4 flex justify-center items-center">
              <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32" />
            </div> : null}

            <FormResponse
              tokenExpired={tokenExpired}
              formSuccess={formSuccess}
              formError={formError}
              content={responseMessage} />
          </form>

        </div>
        {{
          UpdatePassword: tokenExpired
            ? <div className="flex flex-wrap mt-6">
              <div className="w-1/2">
                <Link href="/forgot-password">
                  <a className="text-white">
                    <small>Reset password?</small>
                  </a>
                </Link>
              </div>
            </div>

            : null
        }[formType]}


      </div>,
    }[formType] || <div className="container px-4 max-w-md ">

        <div className="relative flex flex-col min-w-0 break-words shadow-lg rounded-lg bg-gray-300  bg-opacity-50 flex-auto px-4 py-5 pt-0">
          <div className="my-3">
            <h6 className="text-green-900 text-sm text-center font-bold">
              {
                { Login: 'Login', Register: 'Register' }[formType]
              }
            </h6>
          </div>
          <hr className="mb-4 border-b-1 border-gray-500" />

          <form
            noValidate
            onSubmit={e => {
              handleSubmit(e, formType)
            }}
          >
            {UserNameComponent({
              label: "Email",
              name: "email",
              value: email,
              placeholder: "E-mail address, e.g.joe@schmoe.com",
              errorType: emailError,
              messageContent: emailFeedback,
              changeHandler: handleChange
            })}

            {PasswordComponent({
              label: "Password",
              name: "password",
              value: password,
              placeholder: "Password",
              errorType: passwordError,
              messageContent: passwordFeedback,
              changeHandler: handleChange
            })}

            <div className="text-center mt-6">
              <button
                className="btn btn-primary w-full"
                type="submit"
                style={{ transition: "all .15s ease" }}
                disabled={disableButton}
                onClick={() => setIsLoading(true)}
              >
                {buttonName}
              </button>
            </div>

            {isLoading ? <div className="mt-4 flex justify-center items-center">
              <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32" />
            </div> : null}
            <FormResponse
              accountNotVerified={accountNotVerified}
              emailDup={emailDup}
              tokenExpired={tokenExpired}
              formSuccess={formSuccess}
              formError={formError}
              responseMessage={responseMessage} />
          </form>
        </div>
        {{
          Login: formError
            ? <div className="flex flex-wrap mt-6">
              <div className="w-1/2">
                <Link href="/forgot-password">
                  <a className="text-white">
                    <small>Forgot password?</small>
                  </a>
                </Link>
              </div>
              <div className="w-1/2 text-right">
                <Link href="/registration">
                  <a className="text-white">
                    <small>Create new account</small>
                  </a>
                </Link>
              </div>
            </div>
            : null,
        }[formType]}
      </div>}
  </>;
}
