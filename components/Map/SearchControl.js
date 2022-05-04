import { useEffect, useState } from 'react';
import { GeoSearchControl, MapBoxProvider } from 'leaflet-geosearch';
import { useMap } from 'react-leaflet';

const SearchControl = props => {

  const map = useMap();

  const provider = new MapBoxProvider({
    params: {
      access_token: process.env.MAPBOX_ACCESS_TOKEN,
    },
    showBounds: false

  })



  useEffect(() => {
    const searchControl = new GeoSearchControl({
      position: 'topright',
      style: 'bar',/* <---- add this, options: 'topleft', 'topright', 'bottomleft', 'bottomright' */
      provider: provider,
      ...props,
      useMapBounds: false,
    });

    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, [props]);

  return null;
};
export default SearchControl;
