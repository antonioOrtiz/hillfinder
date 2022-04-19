import React from 'react';
import Link from "next/link";

import {
  FormResponse,
  FormWrapper,
  UserNameComponent,
} from '../FormElements';

export default function ForgotPasswordForm({
  disableButton,
  email,
  emailError,
  emailFeedback,
  formError,
  formType,
  formSuccess,
  handleChange,
  handleSubmit,
  isLoading,
  mounted,
  responseMessage,
}) {

  return (
    mounted && <FormWrapper>
      <div className="my-3 h-max"><h6 className="text-sm font-bold text-center text-green-900">Forgot Password</h6>
        <p className="my-3 text-sm text-white"> Not a problem. Just enter your email address below. If it's registered
          with Hillfinder, we'll send you a link to reset your password.</p>
      </div>


      <hr className="mb-4 border-gray-500 border-b-1" />
      <form
        noValidate
        onSubmit={e => handleSubmit(e, formType)}
      >
        <UserNameComponent
          handleChange={handleChange}
          classNames={`border-0 px-3 mt- py-3 placeholder-gray-400 text-black-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full`}
          errorType={emailError}
          label="Email"
          name="email"
          messageContent={emailFeedback}
          placeholder="E-mail address, e.g.joe@schmoe.com"
          value={email}
        />

        <div className="mt-6 text-center">
          <button
            className="w-full btn btn-primary"
            type="submit"
            style={{ transition: "all .15s ease" }}
            disabled={disableButton}
          >
            Forgot password
          </button>
        </div>


        {isLoading ? <div className="flex items-center justify-center mt-4">
          <div className="w-32 h-32 ease-linear border-8 border-t-8 border-gray-200 rounded-full loader" />
        </div> : <FormResponse
          formSuccess={formSuccess}
          formError={formError}
          responseMessage={responseMessage} />}
      </form>

      <div className="w-1/2 mt-6 text-left">
        <Link href="/registration">
          <a className="text-white">
            <small>Create new account</small>
          </a>
        </Link>
      </div>
    </FormWrapper>
  );
}
