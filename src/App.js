import React, { useState, useContext, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoadScript } from "@react-google-maps/api";
import "./App.css";
import About from "./About"; //
import Donate from "./Donate";
import Explore from "./Explore";
import Navigation from "./Navigation";
import Feedback from "./Feedback";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Plausible from "plausible-tracker";
// import { OriginProvider } from './Context/OriginContext';
// import { DestinationProvider } from './Context/DestinationContext';
// import { OriginStationProvider } from './Context/OriginStationContext';
// import { FiltersProvider } from './Context/FiltersContext';
// import { StationProvider } from './Context/StationContext';

function App() {
  console.log("1️⃣ in app ");
  const [activePage, setActivePage] = useState("Explore"); // Default active page
  const [isMobile, setIsMobile] = useState(window.innerWidth < 770);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    // Simulating an asynchronous operation
    setTimeout(() => {
      setIsLoading(false);
    }, 10);
  }, []);

  

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 770);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const { enableAutoPageviews } = Plausible({
      domain: "railexplore.vercel.app",
    });

    enableAutoPageviews();
  }, []);

  useEffect(() => {
    const updateVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
  
    updateVh();
    window.addEventListener('resize', updateVh);
  
    return () => {
      window.removeEventListener('resize', updateVh);
    };
  }, []);

  

  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (

    
    <Router>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
       {/* <OriginProvider>
      <OriginStationProvider>
        <StationProvider>
          <DestinationProvider>
            <FiltersProvider> */}
      <div className="App">
        <div className="flex-container">
          <Navigation
            activePage={activePage}
            setActivePage={setActivePage}
            isMobile={isMobile}
          />
          <div className="content">
            <Routes>

            <Route
                path="/explore/:originId/:originStationCode/:destinationStationCode"
                element={<Explore setActivePage={setActivePage} isMobile={isMobile}/>}
              />

              <Route
                path="/explore/:originId/:originStationCode"
                element={<Explore setActivePage={setActivePage} isMobile={isMobile}/>}
              />
              <Route
                path="/explore/:originId"
                element={<Explore setActivePage={setActivePage} isMobile={isMobile}/>}
              />
              <Route
                path="/explore"
                element={<Explore setActivePage={setActivePage} isMobile={isMobile} />}
              />
              <Route
                path="/"
                element={
                  <Explore setActivePage={setActivePage} isMobile={isMobile} />
                }
              />
              <Route
                path="/about"
                element={<About setActivePage={setActivePage} isMobile={isMobile}/>}
              />
              <Route
                path="/donate"
                element={<Donate setActivePage={setActivePage}isMobile={isMobile} />}
              />
              <Route
                path="/feedback"
                element={<Feedback setActivePage={setActivePage} isMobile={isMobile}/>}
              />
            </Routes>
          </div>
        </div>

        <SpeedInsights />
        <Analytics />
      </div>
      {/* </FiltersProvider>
          </DestinationProvider>
        </StationProvider>
      </OriginStationProvider>
    </OriginProvider> */}
    </LoadScript>
    </Router>
  );
}
export default App;