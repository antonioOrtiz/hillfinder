import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout/'
import Home from './home'

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


