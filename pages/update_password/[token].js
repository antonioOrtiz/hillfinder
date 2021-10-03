import Layout from '../../components/Layout';
import UpdatePasswordForm from '../../components/Form';

export default function UpdatePassword() {
  return (
    <>
      <Layout showFooter={false}>
        <UpdatePasswordForm formType="UpdatePassword" />
      </Layout>
    </>
  )
}
