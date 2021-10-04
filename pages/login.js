import Layout from '../components/Layout';
import Form from '../components/Form/';

export default function Login() {

  return (
    <>
      <Layout showFooter={false}>
        <Form formType="Login" />
      </Layout>
    </>
  )
}


