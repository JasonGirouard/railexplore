import React, { useEffect, useRef, useState, useContext } from "react";
import { OriginContext } from "../Context/OriginContext";
import { OriginStationContext } from "../Context/OriginStationContext";
import { useNavigate } from "react-router-dom";
import { DestinationContext } from "../Context/DestinationContext";
import "./Filters.css";

const DestinationButtonResults = ({
  buttonRef,
  onClose,
  searchResults,
  setSearchTerm,
  setShowResults,
}) => {
  const { setDestination } = useContext(DestinationContext);
  const { origin } = useContext(OriginContext);
  const { originStation } = useContext(OriginStationContext);
  const navigate = useNavigate();
  const [showPopover, setShowPopover] = useState(false);
  const PopoverRef = useRef(null);

  
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

  //FIX ME: SET THE PARAMS 
  // set to /anywhere and handle this appropriately if an origin station is set but nothing else 
  const handleSelect = (result) => {
    setDestination(result);
    setSearchTerm(result.place_name);
    setShowResults(false);
    navigate(`/explore/${origin.id}/${originStation.code}/${result.id}`);
  };

  const handleClick = () => {
    setShowPopover(!showPopover);
  };

  return (
    <div ref={PopoverRef} className="origin-search-Popover">
      <div className="search-results">
        {searchResults.map((result) => (
          <div
            key={result.id}
            className="autocomplete-option"
            onClick={() => handleSelect(result)}
          >
            {result.place_name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DestinationButtonResults;