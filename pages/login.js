import dynamic from "next/dynamic";

const Form = dynamic(() => import('../components/Forms'));

export default function Login({ }) {
  return (
    <>
      <Form formType="Login" />
    </>
  )
}

