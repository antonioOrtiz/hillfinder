import React from 'react';
import Link from "next/link";

import {
  FormResponse,
  UserNameComponent,
} from '../FormElements';

export default function ForgotPasswordForm({
  formType,
  formError,
  formSuccess,
  email,
  emailError,
  emailFeedback,
  handleChange,
  handleSubmit,
  isLoading,
  mounted,
  responseMessage,
  tokenExpired,
}) {
  return (
    mounted && <div className="container px-4 max-w-md ">

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


      <div className="w-1/2 text-left">
        <Link href="/registration">
          <a className="text-white">
            <small>Create new account</small>
          </a>
        </Link>
      </div>
    </div>
  );
}
