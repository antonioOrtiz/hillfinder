import Layout from '../components/Layout';
import LoginForm from '../components/Form/';

export default function Confirmation() {

  return (
    <>
      <Layout showFooter={false}>
        <LoginForm formType="Confirmation" />
      </Layout>
    </>
  )
}


