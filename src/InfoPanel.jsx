// InfoPanel.js
import React, { useContext, useState, useEffect, useRef } from "react";
import { StationContext } from "./StationContext";
import stationImage from "./images/station.png"; // Adjust the path as needed
import busStopImage from "./images/busstop.png"; // Adjust the path as needed
import platformImage from "./images/platform.png"; // Adjust the path as needed
import shelterImage from "./images/has-shelter.png"; // Adjust the path as needed
import noshelterImage from "./images/no-shelter.png"; // Adjust the path as needed
import trainImage from "./images/train.png"; // Adjust the path as needed
import busImage from "./images/bus.png"; // Adjust the path as needed
import "./InfoPanel.css";
import TrainPathFinder from "./TrainPathFinder";
import placeholderImage from "./images/placeholder.png"; // Adjust the path as needed


const InfoPanel = ({
  originStation,
  selectedStationDestinations,
}) => {
  const { activeStation, isPanelOpen, setIsPanelOpen } = useContext(StationContext);

  // Define CSS classes based on state
  let panelClass = "info-panel";
  if (isPanelOpen) {
    panelClass += " open";
  } else {
    panelClass += " close";
  }

  // Add a state to keep track of the current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Find the specific destination data for this station
  const destination = selectedStationDestinations?.destinations.find(
    (d) => d.destination_station === activeStation.code
  );
  // Function to navigate to the previous image
  const goToPreviousImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + activeStation.image_urls.length) % activeStation.image_urls.length
    );
  };
  // Function to navigate to the next image
  const goToNextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % activeStation.image_urls.length
    );
  };
  // Function to format and display the minimum time to the destination
  const formatMinTime = (stationCode) => {
    if (!destination) return "N/A";

    const hours = Math.floor(destination.min_time / 3600);
    const minutes = Math.floor((destination.min_time % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  // Function to format the time in the cards
  const formatTime = (timeString) => {
    if (typeof timeString !== "string") {
      console.error("Invalid timeString:", timeString);
      return "";
    }

    const date = new Date(timeString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

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

  const handleInfoPanel = () => {
    console.log("setting if panel is open");
    setIsPanelOpen(!isPanelOpen); // Close the panel
  };

  // Function to handle image load error
  const handleImageError = (e) => {
    e.target.src = placeholderImage; // Replace with placeholder image
  };

  return (
    <div className={panelClass}>
      <div className="info-header">
        <div className="collapse-button" onClick={handleInfoPanel}>
          ﹥
        </div>
        <div className="station-info">
          <h2>{activeStation.name}</h2>
          <div className="station-details">
            {formatMinTime(activeStation.code)}
            <div className="tooltip-header">
              <img
                src={getImageForStationType(activeStation.station_type)}
                alt={activeStation.station_type}
                className="station-icon"
              />
              <span className="tooltiptext-header">{activeStation.station_type}</span>
            </div>
            <div className="tooltip-header">
              <img
                src={getImageForShelterType(activeStation.Shelter)}
                alt={activeStation.shelter}
                className="station-icon"
              />
              <span className="tooltiptext-header">
                {activeStation.Shelter ? "Has shelter" : "No shelter"}
              </span>
            </div>
            <div className="tooltip-header">
              <img
                src={getImageForMode(activeStation.mode)}
                alt={activeStation.mode}
                className="station-icon"
              />
              <span className="tooltiptext-header">{activeStation.mode === 'TRAIN' ? 'Train' : 'Bus'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="image-container">
        {activeStation.image_urls && activeStation.image_urls.length > 0 && (
          <>
            <img
              src={activeStation.image_urls[currentImageIndex]}
              alt="Station"
              className="station-image"
              onError={handleImageError} // Error handling here
            />
          </>
        )}
        <div className="arrow-container">
          <button className="arrow left-arrow" onClick={goToPreviousImage}>
            &#10094; {/* This is a Unicode left-pointing angle bracket */}
          </button>

          <button className="arrow right-arrow" onClick={goToNextImage}>
            &#10095; {/* This is a Unicode right-pointing angle bracket */}
          </button>
        </div>

        <a
          href="https://www.amtrak.com"
          target="_blank"
          rel="noopener noreferrer"
          className="book-button"
        >
          Book on Amtrak
        </a>
      </div>
      <div className="station-description">{activeStation.description}</div>

      <div>
        <TrainPathFinder
          originStation={originStation.code}
          destinationStation={activeStation.code}
        />
      </div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      
      
     
     
    
    </div>
  );
};

export default InfoPanel;
