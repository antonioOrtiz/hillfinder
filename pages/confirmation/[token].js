import dynamic from "next/dynamic";

const Form = dynamic(() => import('../../components/Forms'));


export default function Confirmation() {
  return (
    <>
      <Form formType="Confirmation" />
    </>
  )
}
