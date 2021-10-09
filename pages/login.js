import dynamic from "next/dynamic";

const Layout = dynamic(() => import('../components/Layout'));
const Form = dynamic(() => import('../components/Form'));


export default function Login() {

  return (
    <>
      <Layout showFooter={false}>
        <Form formType="Login" />
      </Layout>
    </>
  )
}


