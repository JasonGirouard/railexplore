import React, { useState, useContext, useRef , useEffect} from "react";
import { OriginStationContext } from "../Context/OriginStationContext";
import { StationContext } from "../Context/StationContext";
import StationsFilterPopover from "./StationsFilterPopover";
import "./Filters.css";
import filledDownCaretIcon from "../images/down-caret-filled.svg";
import filledDownCaretIconBlack from "../images/down-caret-filled black.svg";
import { useParams } from "react-router-dom";
import stations from "../data/stations.json";

const StationsFilterButton = ({isMobile, showFiltersPortal, setShowFiltersPortal}) => {
  const { originStation , setOriginStation} = useContext(OriginStationContext);
  const { activeStation , setActiveStation, setIsPanelOpen } = useContext(StationContext);
  const [showPopover, setShowPopover] = useState(false);
  const buttonRef = useRef(null);
  const { originId, originStationCode, destinationStationCode } = useParams();


  // set the originStation based on url params
  useEffect(() => {
    if (originStationCode) {
      const selectedStation = stations.find(
        (station) => station.code === originStationCode
      );
      if (selectedStation) {
          console.log('Setting origin station based on params:',selectedStation.name)
        setOriginStation(selectedStation);
      }
    }
  }, [originStationCode, setOriginStation]);

  // set the activeStation based on url params
  useEffect(() => {
    if (destinationStationCode) {
      const selectedStation = stations.find(
        (station) => station.code === destinationStationCode
      );
      if (selectedStation) {
          console.log('Setting destination station based on params:',selectedStation.name)
        setActiveStation(selectedStation);
        setIsPanelOpen(true);
        
      }
    }
  }, [destinationStationCode]);

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
          <img src={filledDownCaretIcon} alt="Down Caret Icon" className={showPopover ? 'rotate-180' : ''}/>
        </button>
      ) : (
        <div>
          <button
            ref={buttonRef}
            className="stations-filter-button"
            onClick={handleClick}
          >
            <div>Origin Station</div>
            <img src={filledDownCaretIconBlack} alt="Down Caret Icon" className={showPopover ? 'rotate-180' : ''}/>
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