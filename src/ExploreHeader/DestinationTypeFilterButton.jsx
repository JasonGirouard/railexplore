import React, { useState, useContext, useRef } from "react";
import { FiltersContext } from "../Context/FiltersContext";
import DestinationTypePopover from "./DestinationTypePopover";
import "./Filters.css";
import filledDownCaretIcon from "../images/down-caret-filled.svg";
import filledDownCaretIconBlack from "../images/down-caret-filled black.svg";

const DestinationTypeFilterButton = () => {
  const { destinationType } = useContext(FiltersContext);
  const [showPopover, setShowPopover] = useState(false);
  const buttonRef = useRef(null);

  const handleClick = () => {
    setShowPopover(!showPopover);
  };

  return (
    <div>
      {destinationType==="Popular" ? (
        <button
          ref={buttonRef}
          className="filter-button set"
          onClick={handleClick}
        >
          <div>Popular Destinations</div>
          <img src={filledDownCaretIcon} alt="Down Caret Icon" />
        </button>
      ) : (
        <div>
          <button
            ref={buttonRef}
            className="filter-button"
            onClick={handleClick}
          >
            <div>Destination Type</div>
            <img src={filledDownCaretIconBlack} alt="Down Caret Icon" />
          </button>
        </div>
      )}
      {showPopover && (
        <DestinationTypePopover buttonRef={buttonRef} onClose={handleClick} />
      )}
    </div>
  );
};

export default DestinationTypeFilterButton;