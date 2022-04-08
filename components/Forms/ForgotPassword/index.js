import React from 'react';
import Link from "next/link";

import {
  FormResponse,
  UserNameComponent,
} from '../FormElements';

export default function ForgotPasswordForm({
  disableButton,
  formType,
  formError,
  formSuccess,
  email,
  emailError,
  emailFeedback,
  handleChange,
  handleSubmit,
  isLoading,
  responseMessage,
  tokenExpired,
  setIsLoading = () => { },
}) {
  return (
    <>
      <div className="my-3">
        <h6 className="text-green-900 text-sm text-center font-bold">
          Forgot Password
        </h6>
        <p> Not a problem. Just enter your email address below. If it's registered
          with Hillfinder, we'll send you a link to reset your password.</p>
      </div>
      <hr className="mb-4 border-b-1 border-gray-500" />

      <form
        noValidate
        onSubmit={e => handleSubmit(e, formType)}
      >
        <UserNameComponent
          changeHandler={handleChange}
          classNames={`border-0 px-3 py-3 placeholder-gray-400 text-black-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full`}
          errorType={emailError}
          label="Email"
          name="email"
          messageContent={emailFeedback}
          placeholder="E-mail address, e.g.joe@schmoe.com"
          value={email}
        />

        <div className="text-center mt-6">
          <button
            className="btn btn-primary w-full"
            type="submit"
            style={{ transition: "all .15s ease" }}
            disabled={disableButton}
            onClick={() => setIsLoading(true)}
          >
            Forgot password
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


      <div className="w-1/2 text-left">
        <Link href="/registration">
          <a className="text-white">
            <small>Create new account</small>
          </a>
        </Link>
      </div>
    </>
  );
}
