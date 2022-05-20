import { useEffect } from 'react';
import { useMap } from 'react-leaflet'
import Locate from 'leaflet.locatecontrol';

export function LocateComponent({ startDirectly }) {
  const map = useMap()
  const options = {
    fillColor: '#4e9524',
    flyTo: true,
    keepCurrentZoomLevel: true,
    position: 'topleft',
    setView: 'always',
    showCompass: true,
    strings: {
      title: 'Your current location!'
    },
    locateOptions: { enableHighAccuracy: true, setView: false, watch: true },
    onActivate: () => {
    } // callback before engine starts retrieving locations
  };

  useEffect(() => {
    const lc = new Locate(options);

    console.log("lc ", lc);
    lc.addTo(map);

    if (startDirectly) {
      lc.start();
    }
  }, []);

  return null;
}
