// InfoPanel.js
import React, { useState } from "react";
import Routes from "./routes.jsx"; // Make sure to import the Routes component
import stationImage from "./images/station.png"; // Adjust the path as needed
import busStopImage from "./images/busstop.png"; // Adjust the path as needed
import platformImage from "./images/platform.png"; // Adjust the path as needed
import shelterImage from "./images/has-shelter.png"; // Adjust the path as needed
import noshelterImage from "./images/no-shelter.png"; // Adjust the path as needed
import trainImage from "./images/train.png"; // Adjust the path as needed
import busImage from "./images/bus.png"; // Adjust the path as needed
import "./tool-tip.css";
import "./InfoPanel.css";

const InfoPanel = ({
  originStation,
  station,
  setIsPanelOpen,
  routes,
  calculatedRoutes,
  calculatedRoutesWT,
  selectedStationDestinations,
}) => {

  // Add a state to keep track of the current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Find the specific destination data for this station
  const destination = selectedStationDestinations?.destinations.find(
    (d) => d.destination_station === station.code
  );

   // Function to handle image toggle
   const handleImageClick = (event) => {
    const { clientX, currentTarget } = event;
    const { left, width } = currentTarget.getBoundingClientRect();
    const isRightSide = clientX > left + width / 2;

    if (isRightSide) {
      // Move to the next image or wrap to the first
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % station.image_paths.length);
    } else {
      // Move to the previous image or wrap to the last
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + station.image_paths.length) % station.image_paths.length);
    }
  };

  // Function to format and display the minimum time to the destination
  const formatMinTime = (stationCode) => {
    if (!destination) return "N/A";

    const hours = Math.floor(destination.min_time / 3600);
    const minutes = Math.floor((destination.min_time % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };


  // Function to check if a route includes the selected station
  const doesRouteIncludeStation = (route, stationCode) => {
    return route.trains.some((train) =>
      train.stations.some((st) => st.code === stationCode)
    );
  };

  // Filter routes that include the selected station
  const filteredRoutes = routes.filter((route) =>
    doesRouteIncludeStation(route, station.code)
  );

  // Determine the image to display based on station type
  const getImageForStationType = (stationType) => {
    switch (stationType) {
      case "Station Building":
        return stationImage;
      case "Curbside Bus Stop ":
        return busStopImage;
      case "Platform":
        return platformImage;
      default:
        return null; // Default image if no type matches
    }
  };

  // Determine the image to display based on shelter type
  const getImageForShelterType = (shelterType) => {
    if (shelterType === true) {
      return shelterImage;
    } else if (shelterType === false) {
      return noshelterImage;
    } else {
      return null; // Default image if no type matches
    }
  };

  // Determine the image to display based on station type
  const getImageForMode = (ModeType) => {
    switch (ModeType) {
      case "TRAIN":
        return trainImage;
      case "BUS":
        return busImage;
      case "Platform":
        return null; // Default image if no type matches
    }
  };

  const closeInfoPanel = () => {
    setIsPanelOpen(false); // Close the panel
  };

  return (
    <div className="info-panel">
      <div className="info-header">
        <div className="collapse-button" onClick={closeInfoPanel}>
          ﹥
        </div>
        <div className="station-info">
          <h2>{station.name}</h2>
          <div className="station-details">
          {formatMinTime(station.code)}
            <div className="tooltip">
              <img
                src={getImageForStationType(station.station_type)}
                alt={station.station_type}
                className="station-icon"
              />
              <span className="tooltiptext">{station.station_type}</span>
            </div>
            <div className="tooltip">
              <img
                src={getImageForShelterType(station.Shelter)}
                alt={station.shelter}
                className="station-icon"
              />
              <span className="tooltiptext">
                {station.Shelter ? "Has shelter" : "No shelter"}
              </span>
            </div>
            <div className="tooltip">
              <img
                src={getImageForMode(station.mode)}
                alt={station.mode}
                className="station-icon"
              />
              <span className="tooltiptext">{station.mode}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="image-container" onClick={handleImageClick}>
      <img src={station.image_paths[currentImageIndex]} alt="Station" />
        <a
          href="https://www.amtrak.com"
          target="_blank"
          rel="noopener noreferrer"
          className="book-button"
        >
          Book on Amtrak
        </a>
      </div>
      <div>
        {station.description}
      </div>

      <Routes
        originStation={originStation}
        destinationStation={station}
        calculatedRoutes={calculatedRoutes}
        calculatedRoutesWT={calculatedRoutesWT}
      />
    </div>
  );
};

export default InfoPanel;
