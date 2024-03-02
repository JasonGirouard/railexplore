import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { AutoComplete, Form } from "antd";
import About from "./About";
import Donate from "./Donate";

import MapComponent from "./MapComponent";
import routes from "./data/routes.json";
import InfoPanel from "./InfoPanel";

import { openInfoPanel } from "./InfoPanelCalcs";
import stationSummary from "./data/all_stations_paths.json";
import stations from "./data/stations.json";
import LocationDetector from "./LocationDetector";
import LeftNav from "./LeftNav";
import Explore from "./Explore";

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
  const [activeStation, setActiveStation] = useState(defaultStation);
  const [calculatedRoutes, setCalculatedRoutes] = useState([]);
  const [calculatedRoutesWT, setCalculatedRoutesWT] = useState([]);
  const [inputValue, setInputValue] = useState(defaultStation.name); // Local state for managing input value
  const [selectedStationDestinations, setSelectedStationDestinations] =
    useState(null);
 // const { options, handleSearch } = useStationSearch(originStation,setOriginStation);

  return (
    <Router>
    <div className="App">
      <div className="flex-container">
        <LeftNav    onDistanceChange={(value) => console.log(value)}
          activePage={activePage}
          setActivePage={setActivePage}
          collapsed={collapsed}
          setCollapsed={setCollapsed} />

        <Routes>
          <Route
            path="/"
            element={
              <Explore
                defaultStation={defaultStation}
                originStation={originStation}
                setOriginStation={setOriginStation}
                coords={coords}
                setCoords={setCoords}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                isPanelOpen={isPanelOpen}
                setIsPanelOpen={setIsPanelOpen}
                activeStation={activeStation}
                setActiveStation={setActiveStation}
                calculatedRoutes={calculatedRoutes}
                setCalculatedRoutes={setCalculatedRoutes}
                calculatedRoutesWT={calculatedRoutesWT}
                setCalculatedRoutesWT={setCalculatedRoutesWT}
                inputValue={inputValue}
                setInputValue={setInputValue}
                selectedStationDestinations={selectedStationDestinations}
                setSelectedStationDestinations={setSelectedStationDestinations}
                hasLocationBeenDetected={hasLocationBeenDetected}
                setHasLocationBeenDetected={setHasLocationBeenDetected}
              />
            }
          />
          <Route
            path="/explore"
            element={
              <Explore
                defaultStation={defaultStation}
                originStation={originStation}
                setOriginStation={setOriginStation}
                coords={coords}
                setCoords={setCoords}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                isPanelOpen={isPanelOpen}
                setIsPanelOpen={setIsPanelOpen}
                activeStation={activeStation}
                setActiveStation={setActiveStation}
                calculatedRoutes={calculatedRoutes}
                setCalculatedRoutes={setCalculatedRoutes}
                calculatedRoutesWT={calculatedRoutesWT}
                setCalculatedRoutesWT={setCalculatedRoutesWT}
                inputValue={inputValue}
                setInputValue={setInputValue}
                selectedStationDestinations={selectedStationDestinations}
                setSelectedStationDestinations={setSelectedStationDestinations}
 
                hasLocationBeenDetected={hasLocationBeenDetected}
                setHasLocationBeenDetected={setHasLocationBeenDetected}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/donate" element={<Donate />} />
        </Routes>
      </div>
    </div>
    </Router>
  );
}
export default App;
