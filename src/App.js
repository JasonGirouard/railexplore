import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import About from "./About";
import Donate from "./Donate";
import LeftNav from "./LeftNav";
import Explore from "./Explore";

function App() {
  console.log('rerendering app')
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

  // I think the app will re-render each time one of these is set. 
  const [originStation, setOriginStation] = useState(defaultStation);
  const [activePage, setActivePage] = useState("Explore"); // Default active page

  const [activeStation, setActiveStation] = useState(defaultStation);
  const [selectedStationDestinations, setSelectedStationDestinations] = useState(null);
 // const { options, handleSearch } = useStationSearch(originStation,setOriginStation);






  return (
    <Router>
    <div className="App">
      <div className="flex-container">
        <LeftNav    
          activePage={activePage}
          setActivePage={setActivePage}
           />
        <Routes>
{/*           
          <Route
            path="/"
            element={
              <Explore
                originStation={originStation}
                setOriginStation={setOriginStation}
                coords={coords}
                setCoords={setCoords}
                isPanelOpen={isPanelOpen}
                setIsPanelOpen={setIsPanelOpen}
                activeStation={activeStation}
                setActiveStation={setActiveStation}
                selectedStationDestinations={selectedStationDestinations}
                setSelectedStationDestinations={setSelectedStationDestinations}
                hasLocationBeenDetected={hasLocationBeenDetected}
                setHasLocationBeenDetected={setHasLocationBeenDetected}
              />
            }
          /> */}

          <Route
            path="/explore"
            element={
              <Explore
                originStation={originStation}
                setOriginStation={setOriginStation}
       
             
                activeStation={activeStation}
                setActiveStation={setActiveStation}
                selectedStationDestinations={selectedStationDestinations}
                setSelectedStationDestinations={setSelectedStationDestinations}
                
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
