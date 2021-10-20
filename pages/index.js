import React from 'react';
import Head from 'next/head';

import dynamic from "next/dynamic";


import Home from './home'


const Layout = dynamic(() => import('../components/Layout'));


export default function Index() {

  return (
    <div>
      <Head>
        <title>Hillfinder</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout showFooter>
        <Home />
      </Layout>
    </div>
  )
}


