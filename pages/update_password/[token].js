import dynamic from "next/dynamic";

import Layout from '../../components/Layout/'
import Form from '../../components/Form/'

export default function UpdatePassword() {
  return (
    <>
      <Layout showFooter={false}>
        <Form formType="UpdatePassword" />
      </Layout>
    </>
  )
}
