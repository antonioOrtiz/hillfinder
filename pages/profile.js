import dynamic from "next/dynamic";
import { PageLoader } from '../components/Loader/index'

const Layout = dynamic(() => import('../components/Layout'), {
  ssr: false,
  loading: () => <PageLoader />
});
import { AuthCheck } from '../components/AuthCheck/'

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


