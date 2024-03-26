import React, { useState, useEffect } from "react";
import LogisticsHeader from "./LogisticsHeader";
import FiltersHeader from "./FiltersHeader";
import "./AppHeader.css"; // Ensure your CSS styles are defined here

const AppHeader = () => {
     return (
       <div className="app-header-container">
           <div className = "app-header-top">
               <LogisticsHeader/>
           </div>
           <div className = "app-header-bottom">
              <FiltersHeader/>
           </div>
       </div>
     );
   };
   export default AppHeader;