import Layout from '../components/Layout';
import Form from '../components/Form';

export default function FormComponent() {
  return (
    <>
      <Layout showFooter={false}>
        <Form formType="Register" />
      </Layout>
    </>
  )
}
