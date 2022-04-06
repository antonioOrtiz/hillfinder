import React, { useEffect } from 'react';
import Link from "next/link";
import { useRouter } from 'next/router'

import {
  FormResponse,
  PasswordComponent,
} from '../FormElements';

export default function UpdatePasswordForm({
  disableButton,
  handleSubmit,
  formType,
  formSuccess,
  formError,
  handleChange,
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
    mounted && <div className="container px-4 max-w-md ">
      <div className="relative flex flex-col min-w-0 break-words shadow-lg rounded-lg bg-gray-300  bg-opacity-50 flex-auto px-4 py-5 pt-0">

        <div className="my-3">
          <h6 className="text-green-900 text-sm text-center font-bold">
            {{ Login: 'Login', Register: 'Register', UpdatePassword: 'Update password' }[formType]}
          </h6>
        </div>
        <hr className="mt-6 border-b-1 border-gray-500" />

        <form onSubmit={e => handleSubmit(e, formType)}>

          <PasswordComponent
            label="Password"
            name="password"
            value={password}
            placeholder={'Password'}
            errorType={passwordError}
            messageContent={passwordFeedback}
            changeHandler={handleChange}
          />

          <PasswordComponent
            label="Confirm Password"
            name="password_confirmation"
            value={password_confirmation}
            placeholder={'Confirm new password'}
            errorType={passwordConfirmationError}
            messageContent={passwordConfirmationFeedback}
            changeHandler={handleChange}
          />


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
  );
}
