import Layout from '../components/Layout';
import Form from '../components/Form';

export default function ForgotPassword() {
  return (
    <>
      <Layout showFooter={false}>
        <Form formType="ForgotPassword" />
      </Layout>
    </>
  )
}
