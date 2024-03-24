import React, { useState, useContext, useRef } from "react";
import { OriginStationContext } from "../Context/OriginStationContext";
import StationsFilterModal from "./StationsFilterModal";
import "./Filters.css";
import filledDownCaretIcon from "../images/down-caret-filled.svg";
import filledDownCaretIconBlack from "../images/down-caret-filled black.svg";

const StationsFilterButton = () => {
  const { originStation } = useContext(OriginStationContext);
  const [showModal, setShowModal] = useState(false);
  const buttonRef = useRef(null);

  const handleClick = () => {
    setShowModal(!showModal);
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
      {showModal && (
        <StationsFilterModal buttonRef={buttonRef} onClose={handleClick} />
      )}
    </div>
  );
};

export default StationsFilterButton;
