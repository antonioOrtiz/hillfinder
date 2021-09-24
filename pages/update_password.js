import Layout from '../components/Layout';
import LoginForm from '../components/Form';

export default function UpdatePassword() {
  return (
    <>
      <Layout showFooter={false}>
        <LoginForm formType="UpdatePassword" />
      </Layout>
    </>
  )
}
