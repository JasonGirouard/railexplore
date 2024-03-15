import React, { useState, useEffect } from "react";
import { MapContainer, GeoJSON, useMap, ZoomControl } from "react-leaflet";
import TileComponent from "./TileComponent";
import StationCircleComponent from "./StationCircleComponent";
import stations from "./data/stations.json";
import Legend from "./Legend";
import amtrakSimplifiedData from "./data/amtrak_simplified.json"; // Import the GeoJSON data

// note there is some werid behavior when you hover near the top, it moves up. this is because the pop-up begins to open, but is outside the view of the screen. I'll need to fix that.

const CenterMap = ({ originStation }) => {
  const map = useMap();

  useEffect(() => {
    if (originStation && originStation.lat && originStation.long) {
      map.setView([originStation.lat, originStation.long], map.getZoom());
    }
  }, [originStation, map]);

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

  const [geoJsonData, setGeoJsonData] = useState(amtrakSimplifiedData);

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
      style={{ height: "100vh", width: "100%" }}
      maxBounds={northAmericaBounds}
      maxBoundsViscosity={1.0}
      scrollWheelZoom={false} // Disable scroll-to-zoom
      zoomControl={false} // Disable default zoom control
    >
      <ZoomControl position="bottomright" />
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
    </MapContainer>
  );
};

export default Map;
