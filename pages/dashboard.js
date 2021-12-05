import dynamic from "next/dynamic";
import { Loader } from '../components/Loader/index'

const Layout = dynamic(() => import('../components/Layout'), {
  loading: () => <Loader />
});
import { AuthCheck } from './AuthCheck/index'

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
