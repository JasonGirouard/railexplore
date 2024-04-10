import React, { useState, useContext, useEffect } from "react";
import "./Explore.css";
import MapComponent from "./MapComponent";
import MapComponentGoogle from "./MapGoogle";
import InfoPanel from "./InfoPanel";
import AppHeader from "./ExploreHeader/AppHeader";
import TopNav from "./TopNav";
//import { GoogleMap, LoadScript } from '@react-google-maps/api';


//import { useParams } from 'react-router-dom';

const Explore = ({ setActivePage, isMobile }) => {
  // const { originId } = useParams();
 console.log('2️⃣ in explore');
 //console.log('originId in Explore component:', originId);
  return (
    <div className="main-content-explore">
      <TopNav  setActivePage={setActivePage}/>
      <AppHeader isMobile={isMobile} />
      
      <div className="map-container-explore">
        <InfoPanel isMobile={isMobile}/>
        <div className="map-div">
          <MapComponent/>
          {/* <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
            <MapComponentGoogle/>
          </LoadScript> */}
          
        </div>
       
      </div>
    </div>
  );
};
export default Explore;