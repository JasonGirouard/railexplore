import React, { useState, useContext, useEffect, useRef } from "react";
import { FiltersContext } from "../FiltersContext";
import DurationFilterModal from "./DurationFilterModal";
import "./Filters.css";
import filledDownCaretIcon from "../images/down-caret-filled.svg";
import filledDownCaretIconBlack from "../images/down-caret-filled black.svg";

const DurationFilterButton = () => {
  const { duration, setDuration } = useContext(FiltersContext);

  const [showModal, setShowModal] = useState(false);
  const buttonRef = useRef(null);

  const handleClick = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      {duration ? (
        <button
          ref={buttonRef}
          className="filter-button set"
          onClick={handleClick}
        >
          <div className="from">Under&nbsp;</div>
          <div>{duration}</div>
          <div className="from">&nbsp;hrs</div>
          <img src={filledDownCaretIcon} alt="Down Caret Icon" />
        </button>
      ) : (
        <div>
          <button
            ref={buttonRef}
            className="filter-button"
            onClick={handleClick}
          >
            <div>Duration</div>
            <img src={filledDownCaretIconBlack} alt="Down Caret Icon" />
          </button>
        </div>
      )}
      {showModal && (
        <DurationFilterModal buttonRef={buttonRef} onClose={handleClick} />
      )}
    </div>
  );
};

export default DurationFilterButton;
