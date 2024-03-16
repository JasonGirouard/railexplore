import React, { useState, useEffect } from "react";
import "./Search.css"; // Ensure your CSS styles are defined here
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiamFzb250Z2lyb3VhcmQiLCJhIjoiY2xzNWc3Njc3MWp1OTJpbzloMHJxZW81MyJ9.QDgWPxx_rkmp3LALwpvuGg';

function Search({ stations, originStation, setOriginStation }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStations, setFilteredStations] = useState([]);

  useEffect(() => {
      
    setSearchTerm(originStation.name);
  }, [originStation]);

  const geocodeInput = async (input) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(input)}.json?access_token=${MAPBOX_ACCESS_TOKEN}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const { center } = data.features[0]; // Use the first result
        return { longitude: center[0], latitude: center[1] };
      }
    } catch (error) {
      console.error('Error geocoding input:', error);
    }
    return null;
  };

  const findStationsByName = (input) => {
    return stations.filter(station =>
      station.mode === "TRAIN" && station.name.toLowerCase().includes(input.toLowerCase())
    ).slice(0, 2); // Get up to the first 2 name-matched stations
  };

  const findNearestStations = async (latitude, longitude, excludeStations = []) => {
    let allStations = stations
      .filter(station => !excludeStations.includes(station.code)) // Exclude already matched by name
      .map(station => ({
        ...station,
        distance: Math.sqrt(
          Math.pow(station.lat - latitude, 2) + Math.pow(station.long - longitude, 2)
        )
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 5); // Get up to the next 5 nearest stations

    return allStations;
  };


  const handleSearchChange = async (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (!value) {
      setFilteredStations([]);
      return;
    }

    // First, find matches by station name
    const nameMatches = findStationsByName(value);

    // Then, geocode input and find nearest stations, excluding name matches
    const coordinates = await geocodeInput(value);
    if (coordinates) {
      const nearestStations = await findNearestStations(coordinates.latitude, coordinates.longitude, nameMatches.map(station => station.code));
      // Combine nameMatches and nearestStations, ensuring no duplicates
      const combinedResults = [...nameMatches, ...nearestStations].slice(0, 5); // Ensure only up to 5 results in total
      setFilteredStations(combinedResults);
    } else {
      setFilteredStations(nameMatches.slice(0, 5)); // Fallback to name matches if geocoding fails
    }
  };



  const handleSelect = (station) => {
    
    setOriginStation(station);
    setSearchTerm(station.name); // Update input to show the name of the selected station
    setFilteredStations([]); // Clear the search results
    //setCoords([station.lat, station.long]);
  };

  return (
    <div className = "search-container">

    
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
    </div>
  );
}

export default Search;
