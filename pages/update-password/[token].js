import dynamic from "next/dynamic";

const Layout = dynamic(() => import('../../components/Layout'));
const Form = dynamic(() => import('../../components/Forms'));

export default function UpdatePassword() {
  return (
    <>
      <Form formType="UpdatePassword" />
    </>
  )
}
