import dynamic from "next/dynamic";

const Form = dynamic(() => import('../components/Form'));

export default function FormComponent() {
  return (
    <>
      <Form formType="Register" />
    </>
  )
}
