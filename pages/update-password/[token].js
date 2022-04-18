import dynamic from "next/dynamic";

const Form = dynamic(() => import('../../components/Forms'));

export default function UpdatePassword() {
  return (
    <>
      <Form formType="UpdatePassword" />
    </>
  )
}
