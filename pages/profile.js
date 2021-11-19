import dynamic from "next/dynamic";

const Layout = dynamic(() => import('../components/Layout'));
import { AuthCheck } from '../components/AuthCheck'

export default function Profile() {
  return (
    <>
      <AuthCheck>
        <Layout showFooter={false}>
          <h1>Profile</h1>
        </Layout>
      </AuthCheck>
    </>
  )
}


