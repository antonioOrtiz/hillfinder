import { useEffect } from 'react';
import { withLeaflet } from 'react-leaflet';
import Locate from 'leaflet.locatecontrol';

function LocateControl({ startDirectly, leaflet }) {
  var { map } = leaflet;

  var options = {
    flyTo: true,
    keepCurrentZoomLevel: true,
    position: 'topleft',
    setView: 'once',
    strings: {
      title: 'Show me where I am, yo!'
    },
    locateOptions: { enableHighAccuracy: true, setView: false },
    onActivate: () => {} // callback before engine starts retrieving locations
  };
  useEffect(() => {
    const lc = new Locate(options);

    console.log('lc ', lc);

    lc.addTo(map);

    console.log('startDirectly ', startDirectly);
    if (startDirectly) {
      lc.start();
    }
  }, []);

  return null;
}

export default withLeaflet(LocateControl);
