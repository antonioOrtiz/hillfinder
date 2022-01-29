import dynamic from "next/dynamic";

const Form = dynamic(() => import('../components/Form'));

export default function Login() {
  return (
    <>
      <Form formType="Login" />
    </>
  )
}

