import React, { useEffect, useRef, useState, useContext } from "react";
import { OriginContext } from "../Context/OriginContext";
import "./Filters.css";

const OriginButton2results = ({
  buttonRef,
  onClose,
  searchResults,
  setSearchTerm,
  setShowResults,
}) => {
  const { origin, setOrigin } = useContext(OriginContext);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

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

  const handleSelect = (result) => {
    setOrigin(result);
    setSearchTerm(result.place_name);
    setShowResults(false);
  };

  const handleClick = () => {
    setShowModal(!showModal);
  };

  return (
    <div ref={modalRef} className="origin-search-modal">
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
