
import 'tailwindcss/tailwind.css'
import 'leaflet/dist/leaflet.css';
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

import { CloudinaryContext } from 'cloudinary-react';

import '../styles/styles.scss'

import { userState as uiUserState, UIProvider } from '../components/Context/UIContext'

import { UserProvider, userState } from '../components/Context/UserContext';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider value={userState}>
      <UIProvider value={uiUserState}>
        <CloudinaryContext cloudName="hillfinders">
          <Component {...pageProps} />
        </CloudinaryContext>
      </UIProvider>
    </UserProvider>
  )
}

export default MyApp
