// DestinationButton.js
import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import "./OriginButton.css";
 // Ensure your CSS styles are defined here


const DestinationButton = () => {

  return (
    <div className="search-container">
      <div className="search" disabled = {true}>
        <FontAwesomeIcon icon={faMapMarkerAlt} className="search-icon search-icon-destination"  />
        <form className="search-form" disabled = {true}>
          <div className="div-search-form" disabled = {true}>
            <input
              type="text"
              className="search-input"
              placeholder="Anywhere"
              disabled={true}

            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default DestinationButton;
