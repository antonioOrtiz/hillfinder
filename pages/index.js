import Head from 'next/head';
import Layout from '../components/Layout.js'
import Home from './home'

export default function Index() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Home />
      </Layout>
    </div>
  )
}
