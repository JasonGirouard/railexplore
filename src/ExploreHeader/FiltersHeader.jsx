// FiltersHeader.jsx
import React from "react";
import AllFiltersButton from "./AllFiltersButton.jsx";
import StationsFilterButton from "./StationsFilterButton.jsx";
import DurationFilterButton from "./DurationFilterButton.jsx";
import DestinationTypeFilterButton from "./DestinationTypeFilterButton.jsx";
import "./FiltersHeader.css";

const FiltersHeader = ({ toggleDurationPopover, showDurationPopover }) => {
  return (
    <div className="filters-container">
      <AllFiltersButton />
      <StationsFilterButton />
      <DurationFilterButton
         toggleDurationPopover={toggleDurationPopover}
         showDurationPopover={showDurationPopover}
      />
      <DestinationTypeFilterButton />
    </div>
  );
};

export default FiltersHeader;