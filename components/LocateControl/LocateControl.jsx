import { useEffect } from 'react';
import { withLeaflet } from 'react-leaflet';
import Locate from 'leaflet.locatecontrol';

function LocateControl({ options, startDirectly, leaflet }) {
  useEffect(() => {
    var { map } = leaflet;
    const lc = new Locate(options);


    lc.addTo(map);

    if (startDirectly) {
      var message = `Will you allow ${window.location.hostname} to access your location?`;
      lc.start();
    }
  }, []);

  return null;
}



export default withLeaflet(LocateControl)
