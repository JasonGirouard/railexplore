import React from "react";
import "./LandingPage.css";
import Trainy2 from "./images/Trainy2.png";
import LandingPageMap from "./images/landingPageMap2.png";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="landing-page-container">
        <div className="landing-page-text">
          <img
            src={Trainy2}
            className="landing-page-logo"
            alt="landing page map"
          />
          <h1>Travel by Train.</h1>
          <p className="travel-by-train-desc">
            Enter a city or address to see everywhere you can travel by train.
          </p>
        </div>
        <div className="landing-page-image">
          <img src={LandingPageMap} alt="landing page map" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
