import React, { useContext } from "react";
import { FiltersContext } from "../Context/FiltersContext";
import { OriginContext } from "../Context/OriginContext";
import "./Filters.css";

const DestinationTypePopoverContent = () => {
  const {  destinationType, setDestinationType } = useContext(FiltersContext);
  const { origin } = useContext(OriginContext);


  const handleDestinationTypeChange = (selectedType) => {
    setDestinationType(selectedType);
  };

  return (
    <div>
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

export default DestinationTypePopoverContent;