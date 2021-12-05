import Head from 'next/head';

import dynamic from "next/dynamic";

import Home from './home'
import { Loader } from '../components/Loader/index'

const Layout = dynamic(() => import('../components/Layout'), {
  ssr: false,
  loading: () => <Loader />
});
export default function Index() {
  return (
    <div>
      <Head>
        <title>Hillfinder!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Home />
      </Layout>
    </div>
  )
}

