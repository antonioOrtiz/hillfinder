/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";

import dynamic from 'next/dynamic'

import React, { useState, useEffect } from 'react';

const Message = dynamic(
  () => import('../Message/index'),
  {
    loading: () => (
      <div className=" flex justify-center items-center">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32" />
      </div>
    )
  }
)

export default function GenericInputForm({
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
  password,
  passwordConfirmation,
  passwordConfirmationError,
  passwordConfirmationFeedback,
  passwordError,
  passwordFeedback,
  disableButton,
  buttonName,
  responseMessage,
  setIsLoading = () => { },
  tokenExpired,
}) {

  function PasswordComponent({ label, name, value, placeholder, errorType, messageContent, changeHandler }) {
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

              {formError && responseMessage
                ? <Message
                  state="Error"
                  content={responseMessage}
                />
                : null}

              {tokenExpired
                ? <Message
                  state="Waring"
                  header={'Warning'}
                  content={'This token is expired.'}
                />
                : null}

              {formSuccess && !formError && responseMessage
                ? <Message
                  state="Success"
                  content={responseMessage}
                />
                : null}
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


        </div>
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

              {accountNotVerified && !formError && responseMessage
                ? <Message
                  state="Waring"
                  content={responseMessage}
                />
                : null}


              {/* {formError && responseMessage
                ? <Message
                  state="Error"
                  content={responseMessage}
                />
                : null} */}

              {emailDup || formError && responseMessage
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
