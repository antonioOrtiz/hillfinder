import dynamic from "next/dynamic";
import { Loader } from '../components/Loader/index'

const Layout = dynamic(() => import('../components/Layout'), {
  ssr: false,
  loading: () => <Loader />
});
import { AuthCheck } from './AuthCheck/index'

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


