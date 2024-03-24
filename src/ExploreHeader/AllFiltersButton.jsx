import React, { useState, useContext, useEffect, useRef } from "react";
import { FiltersContext } from "../FiltersContext";
import AllFiltersModal from "./AllFiltersModal";
import "./Filters.css";
import filterSettingsIcon from '../images/filter-settings.svg';


const AllFiltersButton = () => {
 
  const [showModal, setShowModal] = useState(false);
  const buttonRef = useRef(null);

  const handleClick = () => {
    setShowModal(!showModal);
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
      {showModal && (
        <AllFiltersModal buttonRef={buttonRef} onClose={handleClick} />
      )}
    </div>
  );
};

export default AllFiltersButton;