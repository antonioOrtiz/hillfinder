import dynamic from "next/dynamic";

const Form = dynamic(() => import('../components/Form'));

export default function ForgotPassword() {
  return (
    <>
      <Form formType="ForgotPassword" />
    </>
  )
}
