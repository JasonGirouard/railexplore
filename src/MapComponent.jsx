import React, { useState, useEffect , useContext } from "react";
import { OriginContext } from "./Context/OriginContext";
import { MapContainer, GeoJSON, useMap, ZoomControl } from "react-leaflet";
import TileComponent from "./TileComponent";
import StationCircleComponent from "./StationCircleComponent";
import stations from "./data/stations.json";
import Legend from "./Legend";
import amtrakSimplifiedData from "./data/amtrak_simplified.json"; // Import the GeoJSON data
import "./MapComponent.css";
import LandingPage from "./LandingPage";

// separate  handler so that useMap can be used
const CenterMap = () => {
  const map = useMap();
  const { origin } = useContext(OriginContext);

  useEffect(() => {
    if (origin && origin.center.lat && origin.center.long) {
      map.setView([origin.center.lat, origin.center.long], map.getZoom());
    }
  }, [origin]);
  return null;
};

// separate handler so that useMap can be used
const ZoomHandler = ({ onZoomLevelChange }) => {
  const map = useMap();

  useEffect(() => {
    const handleZoomEnd = () => {
      onZoomLevelChange(map.getZoom());
      console.log('zoom = ',map.getZoom());
    };
     map.on("zoomend", handleZoomEnd);
    return () => {
      map.off("zoomend", handleZoomEnd);
    };
  }, [onZoomLevelChange]);

  return null;
};

const Map = () => {
  console.log("📍 in the map");
  const { origin } = useContext(OriginContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 770);
  const [geoJsonData, setGeoJsonData] = useState(amtrakSimplifiedData);
  // note that one optimization could be logging the users zoom level in localStorage to reduce their need to zoom in to their desired level each time
  const [zoomLevel, setZoomLevel] = useState(7);
   // Function to calculate the radius based on the zoom level
   const getRadius = () => {
    if (zoomLevel < 6) {
      return 6;
    } else if (zoomLevel === 6) {
      return 8;
    } else if (zoomLevel === 7) {
      return 10;
    } else if (zoomLevel === 8) {
      return 11;
    } else if (zoomLevel === 9) {
      return 11;
    } else {
      return 11;
    }
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 770);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const northAmericaBounds = [
    [5, -167], // Southwest coordinates
    [83, -52], // Northeast coordinates
  ];

  return origin ? (
    <MapContainer
      center={[origin.center.lat, origin.center.long]}
      zoom={7}
      maxBounds={northAmericaBounds}
      maxBoundsViscosity={1.0}
     // scrollWheelZoom={false} // Disable scroll-to-zoom
      zoomControl={false} // Disable default zoom control
      className="map-container"
    >
      <ZoomHandler onZoomLevelChange={setZoomLevel} />
      {stations
        .filter((station) => station.mode === "TRAIN")
        .map((station) => {
          return (
            <StationCircleComponent
              key={station.code}
              station={station}
              radius={getRadius()} 
            />
          );
        })}

      {geoJsonData && (
        <GeoJSON
          data={geoJsonData}
          style={() => ({
            color: "#4a83ec",
            weight: 1,
            fillColor: "#1a1d62",
            fillOpacity: 0.5,
          })}
        />
      )}
      <TileComponent />
      <CenterMap />
      <Legend />
      {!isMobile && <ZoomControl position="bottomleft" />}
    </MapContainer>
  ) : (<LandingPage/>);
};

export default Map;
