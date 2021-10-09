import dynamic from "next/dynamic";

const Form = dynamic(() => import('../../components/Form'));

export default function Confirmation() {

  return (
    <>
      <Form formType="Confirmation" />
    </>
  )
}


