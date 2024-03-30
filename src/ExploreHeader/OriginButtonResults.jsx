import React, { useEffect, useRef, useState, useContext } from "react";
import { OriginContext } from "../Context/OriginContext";
import "./Filters.css";
import * as fathom from 'fathom-client';

const OriginButton2results = ({
  buttonRef,
  onClose,
  searchResults,
  setSearchTerm,
  setShowResults,
}) => {
  const { origin, setOrigin } = useContext(OriginContext);
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


     fathom.trackEvent('Origin Button Select',{
       _value: result.place_name,
     });

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

export default OriginButton2results;