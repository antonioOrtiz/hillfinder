import dynamic from "next/dynamic";

const Form = dynamic(() => import('../components/Forms'));
export default function ForgotPassword() {
  return (
    <>
      <Form formType="ForgotPassword" />
    </>
  )
}
