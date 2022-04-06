import dynamic from "next/dynamic";

const Form = dynamic(() => import('../components/Forms'));
export default function FormComponent() {
  return (
    <>
      <Form formType="Register" />
    </>
  )
}
