import Head from 'next/head'
import dynamic from "next/dynamic";
import { useRouter } from 'next/router'

import { useEffect } from 'react';
import NextNprogress from 'nextjs-progressbar';
import { CloudinaryContext } from 'cloudinary-react';

import 'tailwindcss/tailwind.css'
import 'leaflet/dist/leaflet.css';
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

import '../styles/styles.scss'

import { UIProvider, uiState } from '../components/Context/UIContext'

import { UserProvider, userState } from '../components/Context/UserContext';


import { PageLoader } from '../components/Loader/index'

import { useUser } from '../lib/hooks'

import Login from '../pages/login'

const Layout = dynamic(() => import('../components/Layout'));

function MyApp({ Component, pageProps }) {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    router.replace(router.pathname, undefined, { shallow: true })
  }, [user])

  function AuthLogin() {
    useEffect(() => {
      router.replace('/login', undefined, { shallow: true })
    }, [])
    return <Login />
  }

  return (
    <UserProvider value={userState}>
      <UIProvider value={uiState}>
        <CloudinaryContext cloudName="hillfinders">
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
          </Head>
          <NextNprogress
            color="#abf581"
            startPosition={0.3}
            stopDelayMs={200}
            height={4}
            showOnShallow
          />
          <Layout>
            {isLoading ? <PageLoader /> :
              pageProps.auth && !user ? (
                <AuthLogin />
              ) : (
                <Component {...pageProps} />
              )
            }
          </Layout>
        </CloudinaryContext>
      </UIProvider>
    </UserProvider>
  );
}

export default MyApp
