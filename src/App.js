import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import About from "./About"; //
import Donate from "./Donate";
import Explore from "./Explore";
import Navigation from "./Navigation";
import Feedback from "./Feedback";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Plausible from "plausible-tracker";

function App() {
  console.log("1️⃣ in app ");
  const [activePage, setActivePage] = useState("Explore"); // Default active page
  const [isMobile, setIsMobile] = useState(window.innerWidth < 770);

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

  return (
    <Router>
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
                path="/explore/:originId/:originStationCode"
                element={<Explore setActivePage={setActivePage} />}
              />
              <Route
                path="/explore/:originId"
                element={<Explore setActivePage={setActivePage} />}
              />
              <Route
                path="/explore"
                element={<Explore setActivePage={setActivePage} />}
              />
              <Route
                path="/"
                element={
                  <Explore setActivePage={setActivePage} isMobile={isMobile} />
                }
              />
              <Route
                path="/about"
                element={<About setActivePage={setActivePage} />}
              />
              <Route
                path="/donate"
                element={<Donate setActivePage={setActivePage} />}
              />
              <Route
                path="/feedback"
                element={<Feedback setActivePage={setActivePage} />}
              />
            </Routes>
          </div>
        </div>

        <SpeedInsights />
        <Analytics />
      </div>
    </Router>
  );
}
export default App;
