import React, { useState, useEffect } from "react";
import "./App.css";
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

function App() {
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
  const [originStation, setOriginStation] = useState(defaultStation);
  const [coords, setCoords] = useState([
    defaultStation.lat,
    defaultStation.long,
  ]);
 
  const [collapsed, setCollapsed] = useState(window.innerWidth < 600); // State for nav collapsed note that I could add more dynamic setting of the inner width using a handler 
  const [activePage, setActivePage] = useState("Explore"); // Default active page
  const [hasLocationBeenDetected, setHasLocationBeenDetected] = useState(false); // New state to track if location has been detected
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [activeStation, setActiveStation] = useState(null);
  const [calculatedRoutes, setCalculatedRoutes] = useState([]);
  const [calculatedRoutesWT, setCalculatedRoutesWT] = useState([]);
  const [inputValue, setInputValue] = useState(defaultStation.name); // Local state for managing input value
  const [selectedStationDestinations, setSelectedStationDestinations] =
    useState(null);
  const { options, handleSearch } = useStationSearch(
    originStation,
    setOriginStation
  );

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
    <div className="App">
      {/* Conditionally render LocationDetector based on hasLocationBeenDetected */}
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
      <div className="flex-container">
        <LeftNav
          onDistanceChange={(value) => console.log(value)}
          activePage={activePage}
          setActivePage={setActivePage}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        <div className="main-content">
          <div className="origin-button">
            <Form autoComplete="off">
              <Form.Item name="station" className = "originSelector"
              style={{ width: '100%' }}>
                <AutoComplete
                  options={options}
                  value={inputValue}
                  onSelect={handleSelect}
                  onSearch={handleSearch}
                  placeholder="Type your local station name"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Form>
          </div>

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
          {isPanelOpen && (
            <InfoPanel
              originStation={originStation}
              station={activeStation}
              setIsPanelOpen={setIsPanelOpen}
              routes={routes}
              calculatedRoutes={calculatedRoutes}
              calculatedRoutesWT={calculatedRoutesWT}
              selectedStationDestinations={selectedStationDestinations}
            />
          )}
        </div>
      </div>
    </div>
  );
}
export default App;
