import Layout from '../components/Layout';
import LoginForm from '../components/Form';

export default function ForgotPassword() {
  return (
    <>
      <Layout showFooter={false}>
        <LoginForm formType="ForgotPassword" />
      </Layout>
    </>
  )
}
