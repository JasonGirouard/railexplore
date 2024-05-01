import React, { useEffect, useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { OriginContext } from "../Context/OriginContext";
import "./Filters.css";

const OriginButton2results = ({
  buttonRef,
  onClose,
  searchResults,
  setSearchTerm,
  setShowResults,
}) => {
  const { setOrigin } = useContext(OriginContext);
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

  const handleSelect = (result) => {
    setOrigin(result);
    setSearchTerm(result.place_name);
    setShowResults(false);
    navigate(`/explore/${result.id}`);
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
            className={`autocomplete-option plausible-event-name=Origin+Select plausible-event-Origin+Select=${result.place_name} `}
            onClick={() => handleSelect(result)}
          >
            {result.place_name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OriginButton2results;