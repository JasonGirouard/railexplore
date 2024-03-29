// DurationFilterButton.jsx
import React, { useContext , useRef, useEffect} from "react";
import { FiltersContext } from "../Context/FiltersContext";
import "./Filters.css";
import filledDownCaretIcon from "../images/down-caret-filled.svg";
import filledDownCaretIconBlack from "../images/down-caret-filled black.svg";

const DurationFilterButton = ({ toggleDurationPopover, showDurationPopover }) => {
  const { duration } = useContext(FiltersContext);
  const durationButtonRef = useRef(null);

  const handleClick = () => {
    toggleDurationPopover(durationButtonRef.current.getBoundingClientRect());
  };

  useEffect(() => {
    console.log('durationbuttonref:',durationButtonRef.current.getBoundingClientRect())
    //  if the duration popover is currently shown
    if (showDurationPopover) {
      // Create a new MutationObserver instance
      const observer = new MutationObserver(() => {
        // When the observed element's position changes, call toggleDurationPopover...
        // ...with the current bounding rectangle of the duration button
        toggleDurationPopover(durationButtonRef.current.getBoundingClientRect());
      });
  
      // if the duration button reference exists
      if (durationButtonRef.current) {
        // Start observing the duration button for position changes
        observer.observe(durationButtonRef.current, {
          // Observe changes to the element's attributes
          attributes: true,
          // Specifically observe changes to the 'style' attribute
          attributeFilter: ['style'],
          // Observe changes to the element's direct children
          childList: true,
          // Observe changes to the element's descendants
          subtree: true,
        });
      }
  
      // Cleanup function that runs when the component is unmounted or the effect dependencies change
      return () => {
        // Check if the duration button reference exists
        if (durationButtonRef.current) {
          // Stop observing the duration button
          observer.disconnect();
        }
      };
    }
  }, [toggleDurationPopover, showDurationPopover, durationButtonRef]);


  return (
    <div>
      {duration === null || duration >= 24 ? (
        <button
        ref={durationButtonRef}
        className="filter-button"
        onClick={handleClick}
        >
          <div>Duration</div>
          <img src={filledDownCaretIconBlack} alt="Down Caret Icon" />
        </button>
      ) : (
        <button
        ref={durationButtonRef}
        className="filter-button set"
        onClick={handleClick}
        >
          <div className="from">Under&nbsp;</div>
          <div>{duration}</div>
          <div className="from">&nbsp;hrs</div>
          <img src={filledDownCaretIcon} alt="Down Caret Icon" />
        </button>
      )}
    </div>
  );
};

export default DurationFilterButton;