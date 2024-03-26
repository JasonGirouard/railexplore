import React, { useState, useContext, useEffect } from "react";
import "./Explore.css";
import MapComponent from "./MapComponent";
import InfoPanel from "./InfoPanel";
import AppHeader from "./ExploreHeader/AppHeader";
import TopNav from "./TopNav";

const Explore = ({ setActivePage }) => {
 console.log('2️⃣ in explore');
  return (
    <div className="main-content-explore">
      <TopNav  setActivePage={setActivePage}/>
      <AppHeader/>
      
      <div className="map-container-explore">
        <InfoPanel/>
        <div className="map-div">
          <MapComponent/>
        </div>
      </div>
    </div>
  );
};
export default Explore;
