import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useRouter } from 'next/router'

const Form = dynamic(() => import('components/Forms'));

import { isLoggedIn } from 'utils/index'

import { useUser } from 'lib/hooks'

export default function Login() {
  const isLoggedInTrue = isLoggedIn();

  const { user } = useUser(isLoggedInTrue);

  const router = useRouter();

  useEffect(() => {
    // redirect to home if already logged in
    if (user?.isVerified) {
      router.replace('/', undefined, { shallow: true })
    }
  }, []);

  return (
    <>
      <Form formType="Login" />
    </>
  )
}

