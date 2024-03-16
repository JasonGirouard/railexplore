import React, { useState, useEffect } from "react";
import "./Explore.css";
import "./origin-button.css";
import MapComponent from "./MapComponent";
import InfoPanel from "./InfoPanel";
import stationSummary from "./data/all_stations_paths.json";
import stations from "./data/stations.json";
import LocationDetector from "./LocationDetector";
import Search from "./Search"; // Adjust the path as needed

const Explore = ({ originStation, setOriginStation }) => {
  const defaultStation = {
    name: "New York, NY",
    is_recommended: true,
    code: "NYP",
    city: "New York",
    state: "NY",
    address1: "351 West 31st Street",
    zipcode: "10001",
    lat: "40.7503352640001",
    long: "-73.9944604469999",
    Shelter: true,
    station_type: "Station Building",
    mode: "TRAIN",
    description: "",
  };

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedStationDestinations, setSelectedStationDestinations] =
    useState(null);
  const [activeStation, setActiveStation] = useState(defaultStation);

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
    <div className="main-content-explore">
      <Search
        stations={stations}
        originStation={originStation}
        setOriginStation={setOriginStation}
      />

      <div className="map-container-explore">
        <InfoPanel
          originStation={originStation}
          station={activeStation}
          isPanelOpen={isPanelOpen}
          setIsPanelOpen={setIsPanelOpen}
          selectedStationDestinations={selectedStationDestinations}
        />

        <div className="map-div">
          <MapComponent
            originStation={originStation}
            setIsPanelOpen={setIsPanelOpen}
            activeStation={activeStation}
            setActiveStation={setActiveStation}
            selectedStationDestinations={selectedStationDestinations}
          />
        </div>
      </div>
    </div>
  );
};
export default Explore;
