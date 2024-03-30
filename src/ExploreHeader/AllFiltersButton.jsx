import React, { useState, useRef } from "react";
import AllFiltersPopover from "./AllFiltersPopover";
import "./Filters.css";
import filterSettingsIcon from '../images/filter-settings.svg';


const AllFiltersButton = ({isMobile, showFiltersPortal, setShowFiltersPortal}) => {
 
  const [showPopover, setShowPopover] = useState(false);
  const buttonRef = useRef(null);

  const handleClick = () => {
    if (isMobile && isMobile.isMobile) {
      setShowFiltersPortal(!showFiltersPortal);
    } else {
      setShowPopover(!showPopover);
    }
  };

  return (
    <div>
      <button
        ref={buttonRef}
        className="all-filters-button"
        onClick={handleClick}
      >
       <img src={filterSettingsIcon} alt="Filter Settings Icon" />
        All Filters
      </button>

      {showPopover && (
        <AllFiltersPopover buttonRef={buttonRef} onClose={handleClick} />
      )}
    </div>
  );
};

export default AllFiltersButton;