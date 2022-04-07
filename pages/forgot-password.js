import dynamic from "next/dynamic";

const Form = dynamic(() => import('../components/Forms/ForgotPassword/index'));
export default function ForgotPassword() {
  return (
    <>
      <Form formType="ForgotPassword" />
    </>
  )
}
