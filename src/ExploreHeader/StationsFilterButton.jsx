import React, { useState, useContext, useRef } from "react";
import { OriginStationContext } from "../Context/OriginStationContext";
import StationsFilterPopover from "./StationsFilterPopover";
import "./Filters.css";
import filledDownCaretIcon from "../images/down-caret-filled.svg";
import filledDownCaretIconBlack from "../images/down-caret-filled black.svg";

const StationsFilterButton = ({isMobile, showFiltersPortal, setShowFiltersPortal}) => {
  const { originStation } = useContext(OriginStationContext);
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
      {originStation ? (
        <button
          ref={buttonRef}
          className="stations-filter-button set"
          onClick={handleClick}
        >
          <div className="from">From:&nbsp;</div>
          <div>{originStation.name}</div>
          <img src={filledDownCaretIcon} alt="Down Caret Icon" />
        </button>
      ) : (
        <div>
          <button
            ref={buttonRef}
            className="stations-filter-button"
            onClick={handleClick}
          >
            <div>Origin Station</div>
            <img src={filledDownCaretIconBlack} alt="Down Caret Icon" />
          </button>
        </div>
      )}
      {showPopover && (
        <StationsFilterPopover buttonRef={buttonRef} onClose={handleClick} />
      )}
    </div>
  );
};

export default StationsFilterButton;