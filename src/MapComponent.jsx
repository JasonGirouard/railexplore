import React, { useState, useEffect } from "react";
import { MapContainer, GeoJSON, useMap, ZoomControl } from "react-leaflet";
import TileComponent from "./TileComponent";
import StationCircleComponent from "./StationCircleComponent";
import stations from "./data/stations.json";
import Legend from "./Legend";
import amtrakSimplifiedData from "./data/amtrak_simplified.json"; // Import the GeoJSON data
import "./MapComponent.css";

// note there is some werid behavior when you hover near the top, it moves up. this is because the pop-up begins to open, but is outside the view of the screen. I'll need to fix that.



// separate  handler so that useMap can be used
const CenterMap = ({ originStation }) => {
  
  const map = useMap();

  useEffect(() => {
    if (originStation && originStation.lat && originStation.long) {
      map.setView([originStation.lat, originStation.long], map.getZoom());
    }
  }, [originStation, map]);

  return null;
};
// separate handler so that useMap can be used
const ZoomHandler = ({ onZoomLevelChange }) => {
  const map = useMap();

  useEffect(() => {
    const handleZoomEnd = () => {
      onZoomLevelChange(map.getZoom());
    };

    map.on("zoomend", handleZoomEnd);

    return () => {
      map.off("zoomend", handleZoomEnd);
    };
  }, [map, onZoomLevelChange]);

  return null;
};




const Map = ({
  originStation,
  setIsPanelOpen,
  activeStation,
  setActiveStation,
  selectedStationDestinations,
}) => {
  console.log("in the map");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 770);
  const [geoJsonData, setGeoJsonData] = useState(amtrakSimplifiedData);

  // note that one optimization could be logging the users zoom level in localStorage to reduce their need to zoom in to their desired level each time
  const [zoomLevel, setZoomLevel] = useState(7);

   // Function to calculate the radius based on the zoom level
   const getRadius = () => {
    if (zoomLevel <= 6) {
      return 8;
    } else if (zoomLevel === 7) {
      return 11;
    } else if (zoomLevel === 8) {
      return 14;
    } else if (zoomLevel === 9) {
      return 16;
    } else {
      return 18;
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

  const onMarkerClick = (station) => {
    setActiveStation(station);
  };

  

  const northAmericaBounds = [
    [5, -167], // Southwest coordinates
    [83, -52], // Northeast coordinates
  ];

  return (
    <MapContainer
      center={[originStation.lat, originStation.long]}
      zoom={7}
  //    style={{ height: "100vh", width: "100%" }} // note that 100% height breaks the map, but that might be my kew to fixing this bug. 
      maxBounds={northAmericaBounds}
      maxBoundsViscosity={1.0}
      scrollWheelZoom={false} // Disable scroll-to-zoom
      zoomControl={false} // Disable default zoom control
      className="map-container"
      
    >
      <ZoomHandler onZoomLevelChange={setZoomLevel} />

      {stations
        .filter((station) => station.mode === "TRAIN")
        .map((station) => {
          // Find the specific destination data for this station
          const destination = selectedStationDestinations?.destinations.find(
            (d) => d.destination_station === station.code
          );
          return (
            <StationCircleComponent
              key={station.code}
              station={station}
              radius={getRadius()} // Pass the calculated radius as a prop
              onMarkerClick={onMarkerClick}
              // onSeeMoreClicked={onSeeMoreClicked(station)}
              onSeeMoreClicked={() => setIsPanelOpen(true)}
              activeStation={activeStation}
              setActiveStation={setActiveStation}
              isSelected={activeStation && station.code === activeStation.code}
              originStation={originStation}
              destination={destination} // Pass specific destination data
              setIsPanelOpen={setIsPanelOpen}
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
      <CenterMap originStation={originStation} />
      <Legend />
      {!isMobile && <ZoomControl position="bottomleft" />}
      
    </MapContainer>
  );
};

export default Map;
