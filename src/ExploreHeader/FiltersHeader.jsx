import React, { useState, useEffect } from "react";
import AllFiltersButton from "./AllFiltersButton.jsx";
import StationsFilterButton from "./StationsFilterButton.jsx";
import DurationFilterButton from "./DurationFilterButton.jsx";
import "./FiltersHeader.css"; // Ensure your CSS styles are defined here



const FiltersHeader = () => {
   
     return (
       <div className="filters-container">
           <AllFiltersButton/>
           <StationsFilterButton/>
           <DurationFilterButton/>
       </div>
     );
   };
   export default FiltersHeader;