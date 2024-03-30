// DurationFilterButton.jsx
import React, { useContext , useRef, useState } from "react";
import { FiltersContext } from "../Context/FiltersContext";
import "./Filters.css";
import filledDownCaretIcon from "../images/down-caret-filled.svg";
import filledDownCaretIconBlack from "../images/down-caret-filled black.svg";
import DurationFilterPopover from "./DurationFilterPopover";

const DurationFilterButton = ({isMobile, showFiltersPortal, setShowFiltersPortal}) => {
  const { duration } = useContext(FiltersContext);
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
      {duration === null || duration >= 24 ? (
        <button
        ref={buttonRef}
        className="filter-button"
        onClick={handleClick}
        >
          <div>Duration</div>
          <img src={filledDownCaretIconBlack} alt="Down Caret Icon" className={showPopover ? 'rotate-180' : ''} />
        </button>
      ) : (
        <button
        ref={buttonRef}
        className="filter-button set"
        onClick={handleClick}
        >
          <div className="from">Under&nbsp;</div>
          <div>{duration}</div>
          <div className="from">&nbsp;hrs</div>
          <img src={filledDownCaretIcon} alt="Down Caret Icon" className={showPopover ? 'rotate-180' : ''}/>
        </button>
      )}

{showPopover && (
        <DurationFilterPopover buttonRef={buttonRef} onClose={handleClick} />
      )}

    </div>
  );
};

export default DurationFilterButton;