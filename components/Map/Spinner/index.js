import { useEffect } from 'react';
import { useMap } from 'react-leaflet'
import 'spin.js'
import 'leaflet-spin'

export function Spinner({ showOrHide }) {

  const map = useMap()

  useEffect(() => {
    console.log("showOrHide ", showOrHide);
    if (showOrHide) {
      map.spin(true)
    }
    if (showOrHide === false) {
      map.spin(false)
    }
    return () => {
      return () => map.spin(false)
    }

  }, [showOrHide]);

  return null;
}
