// InfoPanel.js
import React from "react";
import Routes from "./routes.jsx"; // Make sure to import the Routes component
import stationImage from "./images/station.png"; // Adjust the path as needed
import busStopImage from "./images/busstop.png"; // Adjust the path as needed
import platformImage from "./images/platform.png"; // Adjust the path as needed
import shelterImage from "./images/has-shelter.png"; // Adjust the path as needed
import noshelterImage from "./images/no-shelter.png"; // Adjust the path as needed
import trainImage from "./images/train.png"; // Adjust the path as needed
import busImage from "./images/bus.png"; // Adjust the path as needed
import "./tool-tip.css";

const InfoPanel = ({
  station,
  onClose,
  originStation,
  routes,
  calculatedRoutes,
  calculatedRoutesWT,
}) => {
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

  return (
    <div className="info-panel">
      <div className="info-header">
        <div className="collapse-button" onClick={onClose}>
          ﹥
        </div>
        <div className="station-info">
          <h2>{station.name}</h2>
          <div className="station-details">
            2.5 hr • 75 mi
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

      <div className="image-container">
        <img src="https://picsum.photos/300/200" alt="Random image" />
        <a
          href="https://www.amtrak.com"
          target="_blank"
          rel="noopener noreferrer"
          className="book-button"
        >
          Book on Amtrak
        </a>
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
