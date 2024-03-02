import React, { useState, useEffect } from "react";
import { MapContainer, GeoJSON, useMap, ZoomControl  } from "react-leaflet";
import TileComponent from "./TileComponent";
import StationCircleComponent from "./StationCircleComponent";
import stations from "./data/stations.json";
import Legend from "./Legend";



function CenterMap({ coords }) {
  const map = useMap();
  useEffect(() => {
    console.log(map.getZoom())
    map.setView(coords, map.getZoom());
  }, [coords, map]);
  return null;
}

const Map = ({
  coords,
  onSeeMoreClicked,
  originStation,
  setOriginStation,
  isPanelOpen,
  setIsPanelOpen,
  activeStation,
  setActiveStation,
  selectedStationDestinations,
}) => {

  const [geoJsonData, setGeoJsonData] = useState(); 


  //const clearSelectedStation = () => setSelectedStation(null);
  // const handleClose = () => {
  //   setSelectedStation(null);
  // };

  useEffect(() => {
    fetch(
      "https://geo.dot.gov/server/rest/services/Hosted/Amtrak_Routes_DS/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson"
    )
      .then((response) => response.json())
      .then((data) => setGeoJsonData(data));
  }, []);

 
  useEffect(() => {

    if (activeStation ) {
   //   console.log('activeStation=',activeStation.code)
    }
 
  }, [activeStation]);

  const onMarkerClick = (station) => {
    setActiveStation(station);
  //  console.log(activeStation)
   // console.log(station)

    //update the panel here, or use state updates of station to drive info panel updates
  };

  const northAmericaBounds = [
    [5, -167], // Southwest coordinates
    [83, -52], // Northeast coordinates
  ];

  return (
    <MapContainer
      center={coords}
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

          />
        );
      })
        }

        

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
      <Legend />
    </MapContainer>
  );
};

export default Map;
