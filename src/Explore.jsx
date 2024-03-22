import React, { useState, useContext, useEffect } from "react";
import { StationContext } from "./StationContext";
import "./Explore.css";
import "./origin-button.css";
import MapComponent from "./MapComponent";
import InfoPanel from "./InfoPanel";
import stationSummary from "./data/all_stations_paths.json";
import AppHeader from "./ExploreHeader/AppHeader";
import stations from "./data/stations.json";
import LocationDetector from "./LocationDetector";
import Search from "./Search"; // Adjust the path as needed

const Explore = ({ originStation, setOriginStation }) => {
 // const {  setSelectedStationDestinations } = useContext(StationContext);

 const [selectedStationDestinations, setSelectedStationDestinations] =
    useState(null);

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

      <AppHeader/>
     
      {/* <Search
        stations={stations}
        originStation={originStation}
        setOriginStation={setOriginStation}
      /> */}

      <div className="map-container-explore">
        <InfoPanel
          originStation={originStation}
          selectedStationDestinations={selectedStationDestinations}
        />

        <div className="map-div">
          <MapComponent
            originStation={originStation}
            selectedStationDestinations={selectedStationDestinations}
          />
        </div>
      </div>
    </div>
  );
};
export default Explore;
