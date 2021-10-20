import dynamic from "next/dynamic";

const Layout = dynamic(() => import('../components/Layout'));

export default function Dashboard() {

  return (
    <>
      <Layout showFooter={false}>
        <h1>Dashboard</h1>
      </Layout>
    </>
  )
}


