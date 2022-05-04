import { MapContainer, TileLayer } from 'react-leaflet'

import LocationMarker from './LocationMarker'

import { PageLoader } from 'components/Loader/index'

import dynamic from "next/dynamic";

const SearchControl = dynamic(() => import('./SearchControl'), { loading: () => <PageLoader />, ssr: false });

export default function Map() {

  return (
    <MapContainer center={[37.0902, 95.7129]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/${process.env.MAPBOX_USERNAME}/${process.env.MAPBOX_STYLE_ID
          }/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.MAPBOX_ACCESS_TOKEN}`}
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
      />
      <LocationMarker startDirectly />
      <SearchControl
        showMarker={false}
        showPopup={false}
        popupFormat={({ query, result }) => result.label}
        retainZoomLevel={false}
        animateZoom={true}
        autoClose={false}
        searchLabel={"Enter address, please"}
        keepResult={true}
      />
    </MapContainer>
  )
}
