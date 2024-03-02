import React, { useState, useEffect } from "react";
import "./App.css";
import "./origin-button.css";
import { AutoComplete, Form } from "antd";

import MapComponent from "./MapComponent";
import routes from "./data/routes.json";
import InfoPanel from "./InfoPanel";
import { useStationSearch } from "./useStationSearch";
import { openInfoPanel } from "./InfoPanelCalcs";
import stationSummary from "./data/all_stations_paths.json";
import stations from "./data/stations.json";
import LocationDetector from "./LocationDetector";
import LeftNav from "./LeftNav"; // Make sure the path is correct
import CustomAutoComplete from "./CustomAutoComplete";

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
  options,
  handleSearch,
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
    setInputValue(defaultStation.name);
    console.log("originSetAgain");
  }, [originStation]);

  //select the chosen origin station from the dropdown
  const handleSelect = (value, option) => {
    const selectedOption = stations.find(
      (station) => station.name === value || station.code === value
    );
    if (selectedOption) {
      setOriginStation(selectedOption);
      setInputValue(selectedOption.name);
      setHasLocationBeenDetected(true);
      setCoords([selectedOption.lat, selectedOption.long]);
      setSelectedStationDestinations(
        stationSummary.find(
          (entry) => entry.origin_station === originStation.code
        )
      );
    }
  };

  return (
    <div className="main-content">
      {!hasLocationBeenDetected && (
        <LocationDetector
          stations={stations}
          onNearestStationFound={(nearestStation) => {
            setOriginStation(nearestStation);
            setInputValue(nearestStation.name);
            setCoords([nearestStation.lat, nearestStation.long]);
            setHasLocationBeenDetected(true); // Ensure this runs only once
          }}
        />
      )}

      <Form autoComplete="off" className = "origin-button">
        <Form.Item name="station" 
        style={{ width: "100%" }}>





          <AutoComplete className = "originAutoComplete"
            options={options}
            value={inputValue}
            onSelect={handleSelect}
            onSearch={handleSearch}
            placeholder="Type your local station name"
            style={{ width: "100%" }}
          />


        </Form.Item>
      </Form>

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
