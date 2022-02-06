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
  setInterestedActivitiesInput,
  setProfileDataFromApi,
  responseMessage,
  setIsLoading = () => { },
  tokenExpired,
}) {

  const fileSelect = useRef(null);
  const profileEditSaveButtonRef = useRef(null)
  const [isProfileInEditMode, setIsProfileInEditMode] = useToggle(true);



  async function handleImageUpload() {
    console.log('foo')
    if (fileSelect) {
      fileSelect.current.click();
    }
  }

  useEffect(() => {
    if (formType === 'ForgotPassword' && email === '') {
      setDisableButton(() => true)
    }
  }, [])

  function handleEditOrSaveButtonForProfile(e) {
    if (profileEditSaveButtonRef.current.innerText === 'SAVE') {
      handleSubmit(e, formType)
    }
    setIsProfileInEditMode()
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
      console.log("interestedActivities 169", interestedActivities);
    }
  }

  function handleProfileDataFromApiHandleChange(index, e) {
    const newArr = [...profileDataFromApi];
    newArr[index].value = e.target.value;
    setProfileDataFromApi(newArr)
    e.target.value
  }

  useEffect(() => console.log("interestedActivities ", interestedActivities), [])

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
          <label className="bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-black-600 font-mono cursor-pointer js-password-label" onClick={handleChangePasswordToggle}>{passwordLabel}</label>
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

  return (
    <>
      {{
        ForgotPassword: <div className="container px-4 max-w-md ">

          <div className="relative flex flex-col min-w-0 break-words shadow-lg rounded-lg bg-gray-300  bg-opacity-50 flex-auto px-4 py-5 pt-0">

            <div className="my-3">
              <h6 className="text-black-600 text-sm text-center font-bold">
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
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-black-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="border-0 px-3 py-3 placeholder-gray-400 text-black-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                  placeholder="E-mail address, e.g. joe@schmoe.com"
                  style={{ transition: "all .15s ease" }}
                  value={email}
                  onChange={handleChange}
                />
                {emailError ? <Message
                  state="Error"
                  header="Error"
                  content={emailFeedback}
                /> : null}
              </div>

              <div className="text-center mt-6">
                <button
                  className="btn btn-primary w-full"
                  type="submit"
                  style={{ transition: "all .15s ease" }}
                  disabled={disableButton}
                >
                  {buttonName}
                </button>
              </div>

              {isLoading ? <div className="mt-4 flex justify-center items-center">
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32" />
              </div> : null}

              {formError && responseMessage
                ? <Message
                  state="Error"
                  content={responseMessage}
                />
                : null}

              {formSuccess && responseMessage
                ? <Message
                  state="Success"
                  content={responseMessage}
                />
                : null}
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

            {profileEditSaveButtonRef.current?.innerText === 'SAVE' && <Message state="SuccessAlert"
              content={"You profile information has been saved!"}
            />}
            <div className="card-body card glass p-0">
              <div className="py-5 avatar online flex justify-center">
                <div className="rounded-full w-24 h-24">
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
              <hr className="divider glass h-px"></hr>
              <button ref={profileEditSaveButtonRef}
                className="mt-5 w-40 self-center inline-block text-textColor btn btn-outline btn-primary"
                onClick={handleEditOrSaveButtonForProfile}> {isProfileInEditMode ? 'Edit Profile' : 'Save'} </button>


              <div className="px-4 mt-5">
                <p className="text-sm text-textColor block mb-5"> Click on text e.g.
                  "name, email" etc.to upate values. </p> </div>


            </div></div>,

        UpdatePassword: <div className="container px-4 max-w-md ">
          <div className="relative flex flex-col min-w-0 break-words shadow-lg rounded-lg bg-gray-300  bg-opacity-50 flex-auto px-4 py-5 pt-0">

            <div className="my-3">
              <h6 className="text-black-600 text-sm text-center font-bold">
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
              <h6 className="text-black-600 text-sm text-center font-bold">
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
    </>
  )
}
