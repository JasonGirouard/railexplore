import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { OriginStationContext } from "./Context/OriginStationContext";
import "./App.css";
import About from "./About"; //
import Donate from "./Donate";
//import TopNav from "./TopNav"; // note that when I remove TopNav the formatting goes off. 
import Explore from "./Explore";
import Navigation from "./Navigation";
// import LocationDetector from "./LocationDetector";

function App() {
  console.log("1️⃣ in app ");
  // const { userLocation } = useContext(OriginContext);
  // const {originStation, setOriginStation } =  useContext(OriginStationContext);
  // const [originStation, setOriginStation] = useState(defaultStation);
  const [activePage, setActivePage] = useState("Explore"); // Default active page

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

      {/* <LocationDetector
                stations={stations}
                setOriginStation={setOriginStation}
              /> */}

            <Routes>
              <Route
                path="/"
                element={
                  <Explore
                  />
                }
              />
              <Route
                path="/explore"
                element={
                  <Explore
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
