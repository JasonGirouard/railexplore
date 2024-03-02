import React, { useState, useEffect } from "react";
import "./App.css";
import "./origin-button.css";
import { AutoComplete, Form } from "antd";

import MapComponent from "./MapComponent";
import routes from "./data/routes.json";
import InfoPanel from "./InfoPanel";

import { openInfoPanel } from "./InfoPanelCalcs";
import stationSummary from "./data/all_stations_paths.json";
import stations from "./data/stations.json";
import LocationDetector from "./LocationDetector";
import LeftNav from "./LeftNav"; // Make sure the path is correct
import Search from "./Search"; // Adjust the path as needed

const Explore = ({
  defaultStation,
  originStation,
  setOriginStation,
  coords,
  setCoords,
  collapsed,
  setCollapsed,
  isPanelOpen,
  setIsPanelOpen,
  activeStation,
  setActiveStation,
  calculatedRoutes,
  setCalculatedRoutes,
  calculatedRoutesWT,
  setCalculatedRoutesWT,
  inputValue,
  setInputValue,
  selectedStationDestinations,
  setSelectedStationDestinations,
  hasLocationBeenDetected,
  setHasLocationBeenDetected,
}) => {
  //this is necessary to re-render the map
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
        setCoords={setCoords}
      />

      <LocationDetector
        stations={stations}
        setOriginStation={setOriginStation}
        setCoords={setCoords}
        setHasLocationBeenDetected={setHasLocationBeenDetected}
      />

      <MapComponent
        coords={coords}
        onSeeMoreClicked={() => setIsPanelOpen(true)}
        originStation={originStation}
        setOriginStation={setOriginStation}
        isPanelOpen={isPanelOpen}
        setIsPanelOpen={setIsPanelOpen}
        activeStation={activeStation}
        setActiveStation={setActiveStation}
        selectedStationDestinations={selectedStationDestinations}
      />

      <InfoPanel
        originStation={originStation}
        station={activeStation}
        isPanelOpen={isPanelOpen}
        setIsPanelOpen={setIsPanelOpen}
        routes={routes}
        calculatedRoutes={calculatedRoutes}
        calculatedRoutesWT={calculatedRoutesWT}
        selectedStationDestinations={selectedStationDestinations}
      />
    </div>
  );
};
export default Explore;
