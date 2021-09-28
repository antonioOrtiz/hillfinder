
import 'tailwindcss/tailwind.css'
import 'leaflet/dist/leaflet.css';
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

import { CloudinaryContext } from 'cloudinary-react';


import '../styles/styles.scss'


// import { userState, userDispatch } from '../components/Context/UserContext';

import { UserProvider, userState } from '../components/Context/UserContext';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider value={userState}>
      <CloudinaryContext cloudName="hillfinders">
        <Component {...pageProps} />
      </CloudinaryContext>
    </UserProvider>
  )
}

export default MyApp
