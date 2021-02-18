import { useEffect } from 'react';
import { withLeaflet } from 'react-leaflet';
import Locate from 'leaflet.locatecontrol';

function LocateControl({ startDirectly, leaflet }) {
  var { map } = leaflet;

  var options = {
    flyTo: true,

    position: 'topleft',
    enableHighAccuracy: true,
    setView: 'always',
    strings: {
      title: 'Show me where I am, yo!'
    },
    onActivate: () => {} // callback before engine starts retrieving locations
  };
  useEffect(() => {
    const lc = new Locate(options);

    console.log('lc ', lc);
    // lc.on('locationfound', function(e) {
    //   var marker = L.marker([e.latitude, e.longitude]).bindPopup('Your are here :)');
    //   var circle = L.circle([e.latitude, e.longitude], e.accuracy / 2, {
    //     weight: 1,
    //     color: 'blue',
    //     fillColor: '#cacaca',
    //     fillOpacity: 0.2
    //   });
    //   map.addLayer(marker);
    //   map.addLayer(circle);+
    // }).on('locationerror', function(e) {
    //   console.log(e);
    //   alert('Location access denied.');
    // });

    // console.log('map.getCenter(); ', map.getCenter());

    lc.addTo(map);

    console.log('startDirectly ', startDirectly);
    if (startDirectly) {
      lc.start();
    }
  }, []);

  return null;
}

export default withLeaflet(LocateControl);
