import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet'

export function Draw() {
  const map = useMap()
  useEffect(() => {
    map.pm.addControls({
      position: 'topleft',
      drawCircleMarker: false,
    });
  }, []);

  return null;
}
