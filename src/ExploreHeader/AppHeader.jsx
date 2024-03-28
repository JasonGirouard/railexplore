import React, { useState, useEffect } from "react";
import LogisticsHeader from "./LogisticsHeader";
import FiltersHeader from "./FiltersHeader";
import DurationModal from "./DurationModal";
import "./AppHeader.css"; // Ensure your CSS styles are defined here

const AppHeader = () => {
  const [showDurationModal, setShowDurationModal] = useState(false);

  const toggleDurationModal = () => {
    setShowDurationModal(!showDurationModal);
  };

     return (
       <div className="app-header-container">
           <div className = "app-header-top">
               <LogisticsHeader/>
           </div>
           <div className = "app-header-bottom">
           <FiltersHeader toggleDurationModal={toggleDurationModal} />
              {showDurationModal && <DurationModal onClose={toggleDurationModal} />}
           </div>
       </div>
     );
   };
   export default AppHeader;