import React, { useState, useContext, useEffect } from "react";
import "./Explore.css";
import MapComponent from "./MapComponent";
import InfoPanel from "./InfoPanel";
import AppHeader from "./ExploreHeader/AppHeader";

const Explore = () => {
 // const {  setSelectedStationDestinations } = useContext(StationContext);
 console.log('2️⃣ in explore');
   // this is necessary to re-render the map
  //  useEffect(() => {
  //   setSelectedStationDestinations(
  //     stationSummary.find(
  //       (entry) => entry.origin_station === originStation.code
  //     )
  //   );
  // }, [originStation]);


  return (
    <div className="main-content-explore">
      <AppHeader/>
      <div className="map-container-explore">
        <InfoPanel
          // selectedStationDestinations={selectedStationDestinations}
        />
        <div className="map-div">
          <MapComponent
            // selectedStationDestinations={selectedStationDestinations}
          />
        </div>
      </div>
    </div>
  );
};
export default Explore;
