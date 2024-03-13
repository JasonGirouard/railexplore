// InfoPanel.js
import React, { useState, useEffect, useRef } from "react";
//import axios from "axios";
import stationImage from "./images/station.png"; // Adjust the path as needed
import busStopImage from "./images/busstop.png"; // Adjust the path as needed
import platformImage from "./images/platform.png"; // Adjust the path as needed
import shelterImage from "./images/has-shelter.png"; // Adjust the path as needed
import noshelterImage from "./images/no-shelter.png"; // Adjust the path as needed
import trainImage from "./images/train.png"; // Adjust the path as needed
import busImage from "./images/bus.png"; // Adjust the path as needed
import "./tool-tip.css";
import "./InfoPanel.css";
import stations from "./data/stations.json";
import TrainPathFinder from './TrainPathFinder';

import placeholderImage from "./images/placeholder.png"; // Adjust the path as needed

const getStationName = (stationCode) => {
  const station = stations.find((station) => station.code === stationCode);
  return station ? station.name : "";
};

const InfoPanel = ({
  originStation,
  station,
  isPanelOpen,
  setIsPanelOpen,
  selectedStationDestinations,
}) => {
  const [everOpened, setEverOpened] = useState(false);
  const isFirstRender = useRef(true);


  useEffect(() => {
    if (isPanelOpen && isFirstRender.current) {
      isFirstRender.current = false;
      setEverOpened(true);
    } else if (isPanelOpen) {
      setEverOpened(true);
    }
  }, [isPanelOpen]);

  // Define CSS classes based on state
  let panelClass = "info-panel";
  if (isPanelOpen) {
    panelClass += " open";
  } else if (everOpened && !isFirstRender.current) {
    panelClass += " close";
  }
  // Add a state to keep track of the current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // Find the specific destination data for this station
  const destination = selectedStationDestinations?.destinations.find(
    (d) => d.destination_station === station.code
  );
  // Function to navigate to the previous image
  const goToPreviousImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + station.image_urls.length) % station.image_urls.length
    );
  };
  // Function to navigate to the next image
  const goToNextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % station.image_urls.length
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

  // Function to format the elapsed time
  const formatElapsedTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
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

  // If the panel has never been opened, don't render it
  if (!everOpened) {
    return null;
  }

  return (
    <div className={panelClass}>
      <div className="info-header">
        <div className="collapse-button" onClick={handleInfoPanel}>
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

      <div className="image-container">
        {station.image_urls && station.image_urls.length > 0 && (
          <>
            <img
              src={station.image_urls[currentImageIndex]}
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
      <div className="station-description">{station.description}</div>

      <div> 
      <TrainPathFinder originStation={originStation.code} destinationStation={station.code} />
      </div>


    {originStation.code !== station.code && (
        <div className="trains-container">
          <div className="trains-title">Today's trains</div>

          
        </div>
      )} 
     
    </div>
  );
};

export default InfoPanel;
