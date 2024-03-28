import React, { useState, useEffect } from "react";
import LogisticsHeader from "./LogisticsHeader";
import FiltersHeader from "./FiltersHeader";
import DurationPopover from "./DurationPopover";
import "./AppHeader.css"; // Ensure your CSS styles are defined here

const AppHeader = () => {
  const [showDurationPopover, setShowDurationPopover] = useState(false);

  const toggleDurationPopover = () => {
    setShowDurationPopover(!showDurationPopover);
  };

     return (
       <div className="app-header-container">
           <div className = "app-header-top">
               <LogisticsHeader/>
           </div>
           <div className = "app-header-bottom">
           <FiltersHeader toggleDurationPopover={toggleDurationPopover} />
              {showDurationPopover && <DurationPopover onClose={toggleDurationPopover} />}
           </div>
       </div>
     );
   };
   export default AppHeader;