import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import About from "./About"; //
import Donate from "./Donate";
import Explore from "./Explore";
import Navigation from "./Navigation";

function App() {
  console.log("1️⃣ in app ");
  const [activePage, setActivePage] = useState("Explore"); // Default active page

  return (
    <Router>
      <div className="App">
        <div className="flex-container">
          <Navigation activePage={activePage} setActivePage={setActivePage} />
          <div className="content">
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
