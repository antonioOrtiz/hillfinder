import { useState, useEffect } from 'react';
import { withLeaflet } from 'react-leaflet';
import Locate from 'leaflet.locatecontrol';

function LocateControl({ options, startDirectly, leaflet, latLng }) {
  useEffect(() => {
    var { map } = leaflet;
    var lc = new Locate(options);

    lc.addTo(map);

    if (startDirectly) {
      lc.start();
    }
  }, [latLng]);

  return null;
}

export default withLeaflet(LocateControl);
