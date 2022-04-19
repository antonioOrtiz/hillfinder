import React, { useEffect } from 'react';
import Link from "next/link";
import { useRouter } from 'next/router'

import {
  FormResponse,
  FormWrapper,
  PasswordComponent,
} from '../FormElements';

export default function UpdatePasswordForm({
  disableButton,
  formType,
  formSuccess,
  formError,
  handleChange,
  handleSubmit,
  isLoading,
  mounted,
  password,
  password_confirmation,
  passwordError,
  passwordFeedback,
  passwordConfirmationError,
  passwordConfirmationFeedback,
  responseMessage,
  tokenExpired,
}) {

  const router = useRouter();

  useEffect(() => {
    if (formSuccess) {
      setTimeout(() => router.push('/login'), 3000)
    }
  }, [formSuccess])

  return (
    mounted && <FormWrapper>
      <div className="my-3 h-max" >
        <h6 className="text-sm font-bold text-center text-green-900">
          Update password
        </h6>

        <hr className="mt-6 border-gray-500 border-b-1" />

        <form onSubmit={e => handleSubmit(e, formType)}>

          <PasswordComponent
            classNames={`border-0 px-3 mt- py-3 placeholder-gray-400 text-black-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full`}
            errorType={passwordError}
            label="Password"
            handleChange={handleChange}
            messageContent={passwordFeedback}
            name="password"
            placeholder={'Password'}
            value={password}
          />

          <PasswordComponent
            classNames={`border-0 px-3 mt- py-3 placeholder-gray-400 text-black-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full`}
            errorType={passwordConfirmationError}
            label="Confirm Password"

            handleChange={handleChange}
            messageContent={passwordConfirmationFeedback}
            name="password_confirmation"
            placeholder={'Confirm new password'}
            value={password_confirmation}
          />

          <div className="mt-6 text-center">
            <button
              className="w-full btn btn-primary"
              type="submit"
              style={{ transition: "all .15s ease" }}
              disabled={disableButton}
            >
              Update Password
            </button>
          </div>

          {isLoading ? <div className="flex items-center justify-center mt-4">
            <div className="w-32 h-32 ease-linear border-8 border-t-8 border-gray-200 rounded-full loader" />
          </div> : <FormResponse
            tokenExpired={tokenExpired}
            formSuccess={formSuccess}
            formError={formError}
            responseMessage={responseMessage} />}
        </form>


        <div className="flex flex-wrap mt-6">
          <div className="w-1/2">
            <Link href="/forgot-password">
              <a className="text-white">
                <small>Reset password?</small>
              </a>
            </Link>
          </div>
        </div>

      </div>
    </FormWrapper>

  );
}
