import dynamic from "next/dynamic";

const Layout = dynamic(() => import('../components/Layout'));

export default function Profile() {

  return (
    <>
      <Layout showFooter={false}>
        <h1>Profile</h1>
      </Layout>
    </>
  )
}


