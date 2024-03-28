import React, { useState, useContext, useEffect, useRef } from "react";
import { FiltersContext } from "../Context/FiltersContext";
import DurationFilterPopover from "./DurationFilterPopover";
import "./Filters.css";
import filledDownCaretIcon from "../images/down-caret-filled.svg";
import filledDownCaretIconBlack from "../images/down-caret-filled black.svg";

const DurationFilterButton = ({ toggleDurationPopover }) => {
  const { duration, setDuration } = useContext(FiltersContext);
  const [showPopover, setShowPopover] = useState(false);
  const buttonRef = useRef(null);
  const handleClick = () => {
    setShowPopover(!showPopover);
  };

  return (
    <div >
      {duration === null || duration >= 24 ? (
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
      ) : (
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
      )}
      {showPopover && (
        <DurationFilterPopover buttonRef={buttonRef} onClose={handleClick} />
      )}
    </div>


//  <div>
// {duration === null || duration >= 24 ? (
//   <div>
//     <button className="filter-button" onClick={toggleDurationPopover}>
//       <div>Duration</div>
//       <img src={filledDownCaretIconBlack} alt="Down Caret Icon" />
//     </button>
//   </div>
// ) : (
//   <button className="filter-button set" onClick={toggleDurationPopover}>
//     <div className="from">Under&nbsp;</div>
//     <div>{duration}</div>
//     <div className="from">&nbsp;hrs</div>
//     <img src={filledDownCaretIcon} alt="Down Caret Icon" />
//   </button>
// )}
// </div> 

  );
};

export default DurationFilterButton;
