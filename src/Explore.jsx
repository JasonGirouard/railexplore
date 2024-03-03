import React, { useState, useEffect } from "react";
import "./App.css";
import "./origin-button.css";
import MapComponent from "./MapComponent";
import InfoPanel from "./InfoPanel";
import stationSummary from "./data/all_stations_paths.json";
import stations from "./data/stations.json";
import LocationDetector from "./LocationDetector";
import Search from "./Search"; // Adjust the path as needed

const Explore = ({
  originStation,
  setOriginStation,

  activeStation,
  setActiveStation,
  selectedStationDestinations,
  setSelectedStationDestinations,
  
}) => {
    const [hasLocationBeenDetected, setHasLocationBeenDetected] = useState(false); // New state to track if location has been detected
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    // this is necessary to re-render the map
  useEffect(() => {

    console.log("isPanelOpen change");
  }, [isPanelOpen]);

 // this is necessary to re-render the map
  useEffect(() => {
    setSelectedStationDestinations(
      stationSummary.find(
        (entry) => entry.origin_station === originStation.code
      )
    );

    console.log("originSetAgain");
  }, [originStation]);

  return (
    <div className="main-content">
      <Search
        stations={stations}
        originStation={originStation}
        setOriginStation={setOriginStation}
       
      />

      {/* Only render LocationDetector if location hasn't been detected yet */}
      {!hasLocationBeenDetected && (
        <LocationDetector
          stations={stations}
          setOriginStation={setOriginStation}
      
          onLocationDetected={() => setHasLocationBeenDetected(true)}
        />
      )}

      <MapComponent
        originStation={originStation}
        setIsPanelOpen={setIsPanelOpen}
        activeStation={activeStation}
        setActiveStation={setActiveStation}
        selectedStationDestinations={selectedStationDestinations}
      />

      <InfoPanel
        station={activeStation}
        isPanelOpen={isPanelOpen}
        setIsPanelOpen={setIsPanelOpen}
        selectedStationDestinations={selectedStationDestinations}
      />
    </div>
  );
};
export default Explore;
