/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";

import dynamic from 'next/dynamic'

import React, { useState } from 'react';

const Message = dynamic(
  () => import('../../utils/Message/index'),
  {
    loading: () => (<div className=" flex justify-center items-center">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32" />
    </div>)
  }
)


export default function GenericInputForm({
  handleSubmit,
  formType,
  formError,
  formSuccess,
  accountNotVerified,
  username,
  userNameDup,
  handleChange,
  usernameError,
  usernameFeedback,
  password,
  passwordConfirmation,
  passwordConfirmationError,
  passwordConfirmationFeedback,
  passwordError,
  passwordFeedback,
  disableButton,
  buttonName,
  responseMessage,
  tokenExpired,
  responseCodeSuccess
}) {

  function PasswordComponent({ name, value, placeholder, errorType, messageContent, label, changeHandler }) {
    const [inputType, setInputType] = useState('password');

    const [passwordLabel, setpasswordLabel] = useState('show!');

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
          <label className="bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer js-password-label" onClick={handleChangePasswordToggle}>{passwordLabel}</label>
        </div>
        <label
          className="block uppercase text-gray-700 text-xs font-bold mb-2"
          htmlFor="grid-password"
        >
          {label}
        </label>
        <input
          name={name}
          type={inputType}
          value={value}
          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
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
        ForgotPassword: <div className="container mx-auto px-4 h-full ">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full max-w-md px-0">
              <div className="relative flex flex-col min-w-0 break-words  mb-6 shadow-lg rounded-lg bg-gray-300 border-0 bg-opacity-50">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="text-center mb-3">
                    <h6 className="text-gray-600 text-sm font-bold">
                      Forgot Password
                    </h6>
                    <p> Not a problem. Just enter your email address below. If it's registered
                      with Hillfinder, we'll send you a link to reset your password.{' '}</p>
                  </div>
                  <hr className="mt-6 border-b-1 border-gray-500" />
                </div>
                <div className="flex-auto px-4 py-10 pt-0">

                  <form onSubmit={e => handleSubmit(e, formType)}>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="username"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="E-mail address, e.g. joe@schmoe.com"
                        style={{ transition: "all .15s ease" }}
                        value={username}
                        onChange={handleChange}
                      />
                      {usernameError ? <Message
                        state="Error"
                        header="Error"
                        content={usernameFeedback}
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

                    {formError
                      ? <Message
                        state="Error"
                        header={responseMessage[0]}
                        content={responseMessage[1]}
                      />
                      : null}

                    {formSuccess
                      ? <Message
                        state="Success"
                        header={responseMessage[0]}
                        content={responseMessage[1]}
                      />
                      : null}
                  </form>
                </div>
              </div>

              {{
                ForgotPassword: formError
                  ?
                  <div className="w-1/2 text-left">
                    <Link href="/register">
                      <a className="text-gray-300">
                        <small>Create new account</small>
                      </a>
                    </Link>
                  </div>
                  : null, Register: null
              }[formType]}

            </div>
          </div>
        </div>,
        UpdatePassword: <div className="container mx-auto px-4 h-full ">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full max-w-md px-0">
              <div className="relative flex flex-col min-w-0 break-words  mb-6 shadow-lg rounded-lg bg-gray-300 border-0 bg-opacity-50">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="text-center mb-3">
                    <h6 className="text-gray-600 text-sm font-bold">
                      {{ Login: 'Login', Register: 'Register', UpdatePassword: 'Update password' }[formType]}
                    </h6>
                  </div>
                  <hr className="mt-6 border-b-1 border-gray-500" />
                </div>
                <div className="flex-auto px-4 py-10 pt-0">

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

                    {formError
                      ? <Message
                        state="Error"
                        header={responseMessage[0]}
                        content={responseMessage[1]}
                      />
                      : null}

                    {tokenExpired
                      ? <Message
                        state="Waring"
                        header={'Warning'}
                        content={'This token is expired.'}
                      />
                      : null}

                    {responseCodeSuccess
                      ? <Message
                        state="Success"
                        header={responseMessage[0]}
                        content={responseMessage[1]}
                      />
                      : null}
                  </form>
                </div>
              </div>
              {{
                UpdatePassword: tokenExpired
                  ? <div className="flex flex-wrap mt-6">
                    <div className="w-1/2">
                      <Link href="/forgot_password">
                        <a className="text-gray-300">
                          <small>Reset password?</small>
                        </a>
                      </Link>
                    </div>
                  </div>

                  : null
              }[formType]}
            </div>
          </div>
        </div>
      }[formType] || <div className="container mx-auto px-4 h-full ">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full max-w-md px-0">
              <div className="relative flex flex-col min-w-0 break-words  mb-6 shadow-lg rounded-lg bg-gray-300 border-0 bg-opacity-50">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="text-center mb-3">
                    <h6 className="text-gray-600 text-sm font-bold">
                      {
                        { Login: 'Login', Register: 'Register' }[formType]
                      }
                    </h6>
                  </div>
                  <hr className="mt-6 border-b-1 border-gray-500" />
                </div>
                <div className="flex-auto px-4 py-10 pt-0">

                  <form onSubmit={e => {
                    handleSubmit(e, formType)
                  }}
                  >
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="username"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="E-mail address, e.g. joe@schmoe.com"
                        style={{ transition: "all .15s ease" }}
                        value={username}
                        onChange={handleChange}
                      />

                      {usernameError ? <Message
                        state="Error"
                        header="Error"
                        content={usernameFeedback}
                      /> : null}
                    </div>

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
                      >
                        {buttonName}
                      </button>
                    </div>

                    {accountNotVerified && !formError
                      ? <Message
                        state="Waring"
                        header={responseMessage[0]}
                        content={responseMessage[1]}
                      />
                      : null}

                    {formError && responseMessage[0] !== ''
                      ? <Message
                        state="Error"
                        header={responseMessage[0]}
                        content={responseMessage[1]}
                      />
                      : null}

                    {userNameDup
                      ? <Message
                        state="Error"
                        header={responseMessage[0]}
                        content={responseMessage[1]}
                      />
                      : null}

                    {formSuccess
                      ? <Message
                        state="Success"
                        header={responseMessage[0]}
                        content={responseMessage[1]}
                      />
                      : null}

                  </form>
                </div>
              </div>

              {{
                Login: formError
                  ? <div className="flex flex-wrap mt-6">
                    <div className="w-1/2">
                      <Link href="/forgot_password">
                        <a className="text-gray-300">
                          <small>Forgot password?</small>
                        </a>
                      </Link>
                    </div>
                    <div className="w-1/2 text-right">
                      <Link href="/registration">
                        <a className="text-gray-300">
                          <small>Create new account</small>
                        </a>
                      </Link>
                    </div>
                  </div>
                  : null,
              }[formType]}
            </div>
          </div>
        </div>}
    </>
  )
}
