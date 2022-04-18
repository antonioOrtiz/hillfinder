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
      <div className="my-3 h-max"><h6 className="text-green-900 text-sm text-center font-bold">Forgot Password</h6>
        <p className="my-3 text-white text-sm"> Not a problem. Just enter your email address below. If it's registered
          with Hillfinder, we'll send you a link to reset your password.</p>
      </div>


      <hr className="mb-4 border-b-1 border-gray-500" />
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

        <div className="text-center mt-6">
          <button
            className="btn btn-primary w-full"
            type="submit"
            style={{ transition: "all .15s ease" }}
            disabled={disableButton}
          >
            Forgot password
          </button>
        </div>


        {isLoading ? <div className="mt-4 flex justify-center items-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32" />
        </div> : <FormResponse
          formSuccess={formSuccess}
          formError={formError}
          responseMessage={responseMessage} />}
      </form>

      <div className="w-1/2 text-left mt-6">
        <Link href="/registration">
          <a className="text-white">
            <small>Create new account</small>
          </a>
        </Link>
      </div>
    </FormWrapper>
  );
}
