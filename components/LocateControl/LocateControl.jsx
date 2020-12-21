import { useEffect } from 'react';
import { withLeaflet } from 'react-leaflet';
import Locate from 'leaflet.locatecontrol';

function LocateControl({ startDirectly, leaflet }) {
  var options = {
    position: 'topright',
    strings: {
      title: 'Show me where I am, yo!'
    },
    onActivate: () => {} // callback before engine starts retrieving locations
  };
  useEffect(() => {
    var { map } = leaflet;

    // console.log('map; ', map);

    const lc = new Locate(options);

    // console.log('lc ', lc);

    // console.log('startDirectly ', startDirectly);
    lc.addTo(map);

    if (startDirectly) {
      lc.start();
    }
  }, []);

  return null;
}

export default withLeaflet(LocateControl);
