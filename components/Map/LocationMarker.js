import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import Locate from 'leaflet.locatecontrol';

function LocationMarker({ startDirectly }) {

  console.log("startDirectly ", startDirectly);
  const map = useMap();

  console.log("map ", map);
  var options = {
    flyTo: true,
    keepCurrentZoomLevel: true,
    position: 'topleft',
    setView: 'once',
    strings: {
      title: 'Show me where I am, yo!'
    },
    locateOptions: { enableHighAccuracy: true, setView: false },
    onActivate: () => { } // callback before engine starts retrieving locations
  };
  useEffect(() => {
    const lc = new Locate(options);


    lc.addTo(map);

    if (startDirectly) {
      lc.start();
    }
  }, []);

  return null;
}

export default LocationMarker;
