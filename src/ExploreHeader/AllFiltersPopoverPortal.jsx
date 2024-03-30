// DurationPopoverPortal.jsx
import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import "./Filters.css";
import AllFiltersPopoverContent from "./AllFiltersPopoverContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import filledDownCaretIcon from "../images/down-caret-filled.svg";

const AllFiltersPopoverPortal = ({ setShowFiltersPortal }) => {
  const PopoverRef = useRef(null);

  const handleArrowClick = () => {
    setShowFiltersPortal(false);
  };

  return ReactDOM.createPortal(
    <div
      ref={PopoverRef}
      
      className="filters-Popover-Portal"
    >
      <div className="filters-portal-header">
        <FontAwesomeIcon icon={faArrowLeft} onClick={handleArrowClick} />
        <div className="filters-label">Filters</div>
      </div>
      <AllFiltersPopoverContent />
      <div className="filters-portal-footer">
        <button className="filter-button set" onClick={handleArrowClick}>
          <div>Go back</div>
        </button>
      </div>
    </div>,
    document.body
  );
};

export default AllFiltersPopoverPortal;
