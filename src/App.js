import React, { useState, useEffect } from "react"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css"; 
import stations from "./data/stations.json";
import About from "./About"; // 
import Donate from "./Donate";
import TopNav from "./TopNav";
// import LeftNav from "./LeftNav";
import Explore from "./Explore";
import Navigation from "./Navigation";
import LocationDetector from "./LocationDetector";

function App() {
  console.log("rerendering app");
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
  const [activePage, setActivePage] = useState("Explore"); // Default active page
  // Check if location has been detected
  const locationDetected = localStorage.getItem('locationDetected');

  return (


    <Router>
      <div className="App">
        <div className="flex-container">
        {/* <TopNav activePage={activePage} setActivePage={setActivePage} /> */}
          {/* <LeftNav activePage={activePage} setActivePage={setActivePage} /> */}
          <Navigation activePage={activePage} setActivePage={setActivePage} />
         
       
          {!locationDetected && (
            <LocationDetector
              stations={stations}
              setOriginStation={setOriginStation}
            />
          )}
       
          <Routes>
          <Route
              path="/"
              element={
                <Explore
                  originStation={originStation}
                  setOriginStation={setOriginStation}
                />
              }
            />
            <Route
              path="/explore"
              element={
                <Explore
                  originStation={originStation}
                  setOriginStation={setOriginStation}
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
