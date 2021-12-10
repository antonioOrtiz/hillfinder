import Head from 'next/head';

import Home from './home'


export default function Index() {
  return (
    <div>
      <Head>
        <title>Hillfinder!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home />
    </div>
  )
}

