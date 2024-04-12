import React, { useState, useContext, useRef , useEffect} from "react";
import { StationContext } from "../Context/StationContext";
import DestinationStationsFilterPopover from "./DestinationStationsFilterPopover";
import "./Filters.css";
import filledDownCaretIcon from "../images/down-caret-filled.svg";
import filledDownCaretIconBlack from "../images/down-caret-filled black.svg";
import { useParams } from "react-router-dom";
import stations from "../data/stations.json";

const DestinationStationsFilterButton = ({isMobile, showFiltersPortal, setShowFiltersPortal}) => {
  const { activeStation , setActiveStation } = useContext(StationContext);
  const [showPopover, setShowPopover] = useState(false);
  const buttonRef = useRef(null);
 // const { originId, originStationCode } = useParams();
 // eventually update this to read the destination station


  // remember to take code from the origin station button to set the active Station based on the parms here

  const handleClick = () => {
    if (isMobile && isMobile.isMobile) {
      setShowFiltersPortal(!showFiltersPortal);
    } else {
      setShowPopover(!showPopover);
    }
  };

  return (
    <div>
      {activeStation ? (
        <button
          ref={buttonRef}
          className="stations-filter-button set"
          onClick={handleClick}
        >
          <div className="from">To:&nbsp;</div>
          <div>{activeStation.name}</div>
          <img src={filledDownCaretIcon} alt="Down Caret Icon" />
        </button>
      ) : (
        <div>
          <button
            ref={buttonRef}
            className="stations-filter-button"
            onClick={handleClick}
          >
            <div>Destination Station</div>
            <img src={filledDownCaretIconBlack} alt="Down Caret Icon" />
          </button>
        </div>
      )}
      {showPopover && (
        <DestinationStationsFilterPopover buttonRef={buttonRef} onClose={handleClick} />
      )}
    </div>
  );
};

export default DestinationStationsFilterButton;