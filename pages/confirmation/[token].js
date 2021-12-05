import dynamic from "next/dynamic";

const Layout = dynamic(() => import('../../components/Layout'));
const Form = dynamic(() => import('../../components/Form'));

export default function Confirmation() {

  return (
    <>
      <Layout>

        <Form formType="Confirmation" />
      </Layout>

    </>
  )
}
