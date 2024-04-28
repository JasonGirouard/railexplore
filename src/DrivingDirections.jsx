// DrivingDirections.jsx
import React, { useContext, useEffect, useState } from "react";
import { StationContext } from "./Context/StationContext";
import { OriginContext } from "./Context/OriginContext";
import "./DrivingDirections.css";

const DrivingDirections = () => {
  const { activeStation } = useContext(StationContext);
  const { origin } = useContext(OriginContext);
  const [mapUrl, setMapUrl] = useState("");

  useEffect(() => {
    if (origin && activeStation) {
      const originCoords = `${origin.center.lat},${origin.center.long}`;
      const destinationCoords = `${activeStation.lat},${activeStation.long}`;
      const embedUrl = `https://www.google.com/maps/embed/v1/directions?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&origin=${encodeURIComponent(originCoords)}&destination=${encodeURIComponent(destinationCoords)}&mode=driving`;
      setMapUrl(embedUrl);
    }
  }, [origin, activeStation]);

  return (
    <div>
      {mapUrl && (
        <div>
          <div className="title">Compare driving from {origin.place_name} to {activeStation.name}</div>

          <div style={{ borderRadius: "8px", overflow: "hidden" }}>
            <iframe
              title="Driving Directions"
              width="100%"
              height="400"
              frameBorder="0"
              src={mapUrl}
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default DrivingDirections;