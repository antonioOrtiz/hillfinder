import React, { useEffect } from 'react';
import Link from "next/link";
import { useRouter } from 'next/router'


import {
  FormResponse,
  FormWrapper,
  PasswordComponent,
  UserNameComponent,
} from '../FormElements';

export default function RegisterForm({
  accountNotVerified,
  email,
  emailDup,
  emailError,
  emailFeedback,
  disableButton,
  formError,
  formSuccess,
  formType,
  handleChange,
  handleSubmit,
  isLoading,
  mounted,
  password,
  passwordError,
  passwordFeedback,
  responseMessage,
  setIsLoading = () => { }
}) {

  const router = useRouter();

  useEffect(() => {
    if (formSuccess) {
      setTimeout(() => router.push('/login'), 3000)
    }
  }, [formSuccess])

  return (
    mounted && <FormWrapper>
      <div className="my-3">
        <h6 className="text-green-900 text-sm text-center font-bold">
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
        {console.log("emailError ", emailError)}
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

        <div className="text-center mt-6">
          <button
            className="btn btn-primary w-full"
            type="submit"
            style={{ transition: "all .15s ease" }}
            disabled={disableButton}
          >
            Register
          </button>
        </div>

        {isLoading ? <div className="mt-4 flex justify-center items-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32" />
        </div> : null}
        <FormResponse
          accountNotVerified={accountNotVerified}
          emailDup={emailDup}
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
        : null}
    </FormWrapper>
  );
}
