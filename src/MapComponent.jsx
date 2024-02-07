import React, { useState, useEffect } from "react";
import { MapContainer, GeoJSON, useMap } from "react-leaflet";
import TileComponent from "./TileComponent";
import StationCircleComponent from "./StationCircleComponent";
import stations from "./stations.json";

function CenterMap({ coords }) {
  const map = useMap();
  useEffect(() => {
    map.setView(coords, map.getZoom());
  }, [coords, map]);
  return null;
}

const Map = ({ coords, onSeeMoreClicked, originStation, setOriginStation , isPanelOpen}) => {
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [selectedStation, setSelectedStation] = useState(null);

  const clearSelectedStation = () => setSelectedStation(null);

  const handleClose = () => {
    setSelectedStation(null);
  };

  useEffect(() => {
    fetch(
      "https://geo.dot.gov/server/rest/services/Hosted/Amtrak_Routes_DS/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson"
    )
      .then((response) => response.json())
      .then((data) => setGeoJsonData(data));
  }, []);

  const onMarkerClick = (station) => {
    
    setSelectedStation(station);
    if (isPanelOpen) {
      onSeeMoreClicked(station);
    }
  };

  const northAmericaBounds = [
    [5, -167], // Southwest coordinates
    [83, -52], // Northeast coordinates
  ];

  return (
    <MapContainer
      center={coords}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
      maxBounds={northAmericaBounds}
      maxBoundsViscosity={1.0}
    >
      {stations.map((station) => (
        <StationCircleComponent
          key={station.code}
          station={station}
          onMarkerClick={onMarkerClick}
         // onSeeMoreClicked={onSeeMoreClicked(station)}
          onSeeMoreClicked={() => onSeeMoreClicked(station)}
          setOriginStation={setOriginStation}
          isSelected={selectedStation && station.code === selectedStation.code}
          originStation={originStation}
        />
      ))}

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
      <CenterMap coords={coords} />
    </MapContainer>
  );
};

export default Map;
