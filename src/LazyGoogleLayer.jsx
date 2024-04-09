// LazyGoogleLayer.js
import React, { useState, useEffect } from "react";
import { useMap, TileLayer } from "react-leaflet";

const LazyGoogleLayer = ({ mapId }) => {
  const map = useMap();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onChange = () => {
        console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
      setIsVisible(map.getBounds().isValid() && map.getZoom() >= 7);
    };

    map.on("moveend", onChange);
    map.on("zoomend", onChange);

    return () => {
      map.off("moveend", onChange);
      map.off("zoomend", onChange);
    };
  }, [map]);

  return isVisible ? (
    <TileLayer
      url={`https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&apistyle=s.t%3A2%7Cp.v%3Aoff&map_id=${mapId}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
      attribution="Map data &copy; Google"
    />
  ) : null;
};

export default LazyGoogleLayer;