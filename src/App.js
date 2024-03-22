import React, { useState, useEffect, useContext } from "react";
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
import { LocationContext } from './LocationContext';


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
  const { userLocation } = useContext(LocationContext);
  console.log ('user location',userLocation)

 
  return (
    <Router>
      <div className="App">
        <div className="flex-container">
          <Navigation activePage={activePage} setActivePage={setActivePage} />

          <div className="content">
            {/* {!userLocation && (
              <LocationDetector
                stations={stations}
                setOriginStation={setOriginStation}
              />
            )} */}

<LocationDetector
                stations={stations}
                setOriginStation={setOriginStation}
              />

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
      </div>
    </Router>
  );
}
export default App;
