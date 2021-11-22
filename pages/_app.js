
import Head from 'next/head'

import 'tailwindcss/tailwind.css'
import 'leaflet/dist/leaflet.css';
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

import { CloudinaryContext } from 'cloudinary-react';

import '../styles/styles.scss'

import { UIProvider, uiState } from '../components/Context/UIContext'

import { UserProvider, userState } from '../components/Context/UserContext';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider value={userState}>
      <UIProvider value={uiState}>
        <CloudinaryContext cloudName="hillfinders">
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
          </Head>
          <Component {...pageProps} />
        </CloudinaryContext>
      </UIProvider>
    </UserProvider>
  )
}

export default MyApp
