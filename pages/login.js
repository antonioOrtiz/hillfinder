import Layout from '../components/Layout';
import LoginForm from '../components/Form/';
import { userState } from '../components/Context/UserContext';

export default function () {

  return (
    <>
      <Layout showFooter={false}>
        <LoginForm formType="Login" />
      </Layout>
    </>
  )
}


