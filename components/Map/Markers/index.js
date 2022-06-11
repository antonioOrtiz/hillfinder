import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Circle, Marker } from "react-leaflet";

export function RandomMarkers({ handleInitPointsInRoutingMachine, initRadiusForCircle, amountOfMarkersOnLoad = 5 }) {
  const [markers, setMarkers] = useState(() => new Array(amountOfMarkersOnLoad));

  useEffect(() => {
    handleInitPointsInRoutingMachine(randomMarkersInCircle(...initRadiusForCircle))
  }, [])


  function randomMarkersInCircle(originalLat, originalLng) {
    var r = 500 / 111300,
      y0 = originalLat,
      x0 = originalLng,
      u = Math.random(),
      v = Math.random(),
      w = r * Math.sqrt(u),
      t = 2 * Math.PI * v,
      x = w * Math.cos(t),
      y1 = w * Math.sin(t),
      x1 = x / Math.cos(y0);

    const newY = y0 + y1;
    const newX = x0 + x1

    return [
      newY,
      newX
    ]
  }

  console.log("markers ", markers);

  return (
    <>
      {markers.map((marker, index) => {
        return <Marker key={index} position={randomMarkersInCircle(...initRadiusForCircle)
        } ></Marker>
      }
      )}
    </>
  );
}

