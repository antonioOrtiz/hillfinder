import dynamic from "next/dynamic";
import { PageLoader } from '../components/Loader/index'

const Layout = dynamic(() => import('../components/Layout'), {
  loading: () => <PageLoader />
});
import { AuthCheck } from '../components/AuthCheck/'

function Dashboard() {
  return (
    <>
      <AuthCheck>
        <Layout>
          <h1>Dashboard</h1>
        </Layout>
      </AuthCheck>

    </>
  )
}


export default Dashboard;
