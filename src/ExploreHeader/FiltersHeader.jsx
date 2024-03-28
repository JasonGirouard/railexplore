import React from "react";
import AllFiltersButton from "./AllFiltersButton.jsx";
import StationsFilterButton from "./StationsFilterButton.jsx";
import DurationFilterButton from "./DurationFilterButton.jsx";
import DestinationTypeFilterButton from "./DestinationTypeFilterButton.jsx";
import "./FiltersHeader.css"; // Ensure your CSS styles are defined here

const FiltersHeader = ({ toggleDurationPopover }) => {
   
     return (
       <div className="filters-container">
           <AllFiltersButton/>
           <StationsFilterButton/>
           <DurationFilterButton toggleDurationPopover={toggleDurationPopover} />
           <DestinationTypeFilterButton/>
       </div>
     );
   };
   export default FiltersHeader;