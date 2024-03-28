import React, { useEffect, useRef, useState, useContext } from "react";
import { FiltersContext } from "../Context/FiltersContext";
import { OriginContext } from "../Context/OriginContext";
import "./Filters.css";

const DestinationTypeModal = ({ buttonRef, onClose }) => {
  const {  destinationType, setDestinationType } = useContext(FiltersContext);
  const { origin } = useContext(OriginContext);
  const modalRef = useRef(null);

  const handleDestinationTypeChange = (selectedType) => {
      console.log('setting destination type to:', selectedType)
    setDestinationType(selectedType);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        //check if the clicked target is outside both the modal (modalRef.current) and the button (buttonRef.current).
        //If it is, we call the onClose function to close the modal.
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
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
    <div ref={modalRef} className="filters-modal">
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

export default DestinationTypeModal;