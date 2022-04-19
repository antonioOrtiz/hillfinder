import React, { useEffect } from 'react';
import Link from "next/link";

import {
  FormResponse,
  FormWrapper,
  PasswordComponent,
  UserNameComponent,
} from '../FormElements';

export default function LoginForm({
  accountNotVerified,
  disableButton,
  email,
  emailDup,
  emailError,
  emailFeedback,
  formError,
  formType,
  formSuccess,
  handleChange,
  handleSubmit,
  id,
  isLoading,
  mounted,
  password,
  passwordError,
  passwordFeedback,
  responseMessage,
  tokenExpired,
  userdispatch
}) {

  useEffect(() => {
    userdispatch({ type: 'resetUserAccountIsVerified' })
  }, [id]);

  return (
    mounted && <FormWrapper>
      <div className="my-3 h-max" >
        <h6 className="text-sm font-bold text-center text-green-900">
          {
            { Login: 'Login', Register: 'Register' }[formType]
          }
        </h6>
      </div>
      <hr className="mb-4 border-gray-500 border-b-1" />

      <form
        noValidate
        onSubmit={e => {
          handleSubmit(e, formType)
        }}
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

        <div className="mt-6 text-center">
          <button
            className="w-full btn btn-primary"
            type="submit"
            style={{ transition: "all .15s ease" }}
            disabled={disableButton}
          >
            Log-in
          </button>
        </div>

        {isLoading ? <div className="flex items-center justify-center mt-4">
          <div className="w-32 h-32 ease-linear border-8 border-t-8 border-gray-200 rounded-full loader" />
        </div> : null}
        <FormResponse
          accountNotVerified={accountNotVerified}
          emailDup={emailDup}
          tokenExpired={tokenExpired}
          formSuccess={formSuccess}
          formError={formError}
          responseMessage={responseMessage} />
      </form>


      {formError
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
        : null
      }
    </FormWrapper>
  );
}
