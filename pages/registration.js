import Layout from '../components/Layout';
import Register from '../components/Form';

export default function RegisterComponent() {
  return (
    <>
      <Layout showFooter={false}>
        <Register formType="Register" />
      </Layout>
    </>
  )
}
