import Layout from '../components/Layout';
import LoginForm from '../components/Form/';

export default function Login() {

  return (
    <>
      <Layout showFooter={false}>
        <LoginForm formType="Login" />
      </Layout>
    </>
  )
}


