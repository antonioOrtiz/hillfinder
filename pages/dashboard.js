import dynamic from "next/dynamic";

const Layout = dynamic(() => import('../components/Layout'));
import { AuthCheck } from '../components/AuthCheck'

export default function Dashboard() {
  return (
    <AuthCheck>
      <Layout showFooter={false}>
        <h1>Dashboard</h1>
      </Layout>
    </AuthCheck>
  )
}


