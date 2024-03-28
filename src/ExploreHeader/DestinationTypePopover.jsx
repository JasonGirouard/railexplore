import React, { useEffect, useRef, useState, useContext } from "react";
import { FiltersContext } from "../Context/FiltersContext";
import { OriginContext } from "../Context/OriginContext";
import "./Filters.css";

const DestinationTypePopover = ({ buttonRef, onClose }) => {
  const {  destinationType, setDestinationType } = useContext(FiltersContext);
  const { origin } = useContext(OriginContext);
  const PopoverRef = useRef(null);

  const handleDestinationTypeChange = (selectedType) => {
      console.log('setting destination type to:', selectedType)
    setDestinationType(selectedType);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        //check if the clicked target is outside both the Popover (PopoverRef.current) and the button (buttonRef.current).
        //If it is, we call the onClose function to close the Popover.
        PopoverRef.current &&
        !PopoverRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [buttonRef, onClose]);


  return (
    <div ref={PopoverRef} className="filters-Popover">
    <div className="section-header origin">Destination Type</div>
  
    {origin ? (
        <>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                value="All"
                checked={destinationType === null || destinationType === "All"}
                onChange={() => handleDestinationTypeChange("All")}
                className="radio-button-class"
              />
              All
            </label>
            <label>
              <input
                type="radio"
                value="Popular"
                checked={destinationType === "Popular"}
                onChange={() => handleDestinationTypeChange("Popular")}
                className="radio-button-class"
              />
              Popular
            </label>
          </div>
        </>
      ) : (
        <div className="placename">
          Please set an origin before choosing your destination type
        </div>
      )}
  </div>
  );
};

export default DestinationTypePopover;
