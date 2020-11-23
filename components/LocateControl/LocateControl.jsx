import { useEffect } from 'react';
import { withLeaflet } from 'react-leaflet';
import Locate from 'leaflet.locatecontrol';

function LocateControl({  startDirectly, leaflet }) {
  var options = {
    position: 'topleft',
    strings: {
      title: 'Show me where I am, yo!'
    },
    onActivate: () => {} // callback before engine starts retrieving locations
  };
  useEffect(() => {
    var { map } = leaflet;
    const lc = new Locate(options);

    lc.addTo(map);

    if (startDirectly) {
      lc.start();
    }
  }, []);

  return null;
}

export default withLeaflet(LocateControl)
