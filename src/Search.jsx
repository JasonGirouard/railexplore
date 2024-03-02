import React, { useState } from "react";
import "./Search.css"; // Ensure your CSS styles are defined here
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

function Search({ stations, setOriginStation, setCoords }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStations, setFilteredStations] = useState([]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (!value) {
      setFilteredStations([]);
      return;
    }

    const filteredOptions = stations
      .filter(
        (station) =>
          station.mode === "TRAIN" &&
          station.name.toLowerCase().includes(value.toLowerCase())
      )
      .slice(0, 5); // Adjust the slice as needed

    setFilteredStations(filteredOptions);
  };

  const handleSelect = (station) => {
    setOriginStation(station);
    setSearchTerm(station.name); // Update input to show the name of the selected station
    setFilteredStations([]); // Clear the search results
    setCoords([station.lat, station.long]);
  };

  return (
    <div className="search">
      <FontAwesomeIcon icon={faHouse} className="search-icon" />
      <form className="search-form">
        <div className="div-search-form">
          <input
            type="text"
            className="search-input"
            placeholder="Search for a station"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ paddingLeft: "40px" }} // Move to CSS
          />
          {filteredStations.length > 0 && (
            <div className="search-results">
              {filteredStations.map((station) => (
                <div
                  key={station.code}
                  className="autocomplete-option"
                  onClick={() => handleSelect(station)}
                >
                  <div className="result-icon-div">
                    <FontAwesomeIcon icon={faHouse} className="result-icon" />
                  </div>
                  <div className="station-set">
                    <div className="top-row">
                      <span className="station-name">{station.name}</span>
                      <span className="station-code">{station.code}</span>
                    </div>
                    <div className="bottom-row">
                      {station.city}, {station.state}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default Search;
