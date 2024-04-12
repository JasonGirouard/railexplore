// InfoPanel.js
import React, { useContext, useState, useEffect } from "react";
import { StationContext } from "./Context/StationContext";
import { OriginStationContext } from "./Context/OriginStationContext";
import { OriginContext } from "./Context/OriginContext";
import stationImage from "./images/station.png"; // Adjust the path as needed
import busStopImage from "./images/busstop.png"; // Adjust the path as needed
import platformImage from "./images/platform.png"; // Adjust the path as needed
import shelterImage from "./images/has-shelter.png"; // Adjust the path as needed
import noshelterImage from "./images/no-shelter.png"; // Adjust the path as needed
import trainImage from "./images/train.png"; // Adjust the path as needed
import busImage from "./images/bus.png"; // Adjust the path as needed
import "./InfoPanel.css";
import TrainPathFinder from "./TrainPathFinder";
import placeholderImage from "./images/placeholder.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import StationMap from "./StationMap";
import { useNavigate, useLocation } from "react-router-dom";

const InfoPanel = ({ isMobile }) => {

  console.log("📚 in info panel");
  const { activeStation, isPanelOpen, setIsPanelOpen } =
    useContext(StationContext);
  const { originStation, selectedStationDestinations } =
    useContext(OriginStationContext);
  const { origin } = useContext(OriginContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isPanelOpen && origin && originStation && activeStation) {
      console.log('setting params in infopanel')
      navigate(`/explore/${origin.id}/${originStation.code}/${activeStation.code}`);
    }
  }, [isPanelOpen, originStation, activeStation]);

  const handleInfoPanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

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
    (d) => activeStation && d.destination_station === activeStation.code
  );
  // Function to navigate to the previous image
  const goToPreviousImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + activeStation.image_urls.length) %
        activeStation.image_urls.length
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

  function getDepartureDate() {
    const today = new Date();
    const dayOfWeek = today.getDay();

    if (dayOfWeek === 6) {
      // If today is Saturday, set the departure date to the next Saturday
      const nextSaturday = new Date(today);
      nextSaturday.setDate(today.getDate() + 7);
      return nextSaturday;
    } else {
      // If today is not Saturday, set the departure date to the nearest Saturday
      const daysUntilSaturday = (6 - dayOfWeek + 7) % 7;
      const nearestSaturday = new Date(today);
      nearestSaturday.setDate(today.getDate() + daysUntilSaturday);
      return nearestSaturday;
    }
  }

  function getReturnDate() {
    const departureDate = getDepartureDate();
    const returnDate = new Date(departureDate);
    returnDate.setDate(departureDate.getDate() + 1);
    return returnDate;
  }

  // Function to handle image load error
  const handleImageError = (e) => {
    e.target.src = placeholderImage; // Replace with placeholder image
  };

  if (!activeStation) {
    return null;
  }

  if (!originStation) {
    return null;
  }
  

  return (
    <div className={panelClass}>
      <div className="info-header">
        <div className="collapse-button" onClick={handleInfoPanel}>
          {isMobile ? (
            <FontAwesomeIcon icon={faArrowLeft} onClick={handleInfoPanel} />
          ) : (
            <FontAwesomeIcon icon={faArrowRight} onClick={handleInfoPanel} />
          )}
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
              <span className="tooltiptext-header">
                {activeStation.station_type}
              </span>
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
              <span className="tooltiptext-header">
                {activeStation.mode === "TRAIN" ? "Train" : "Bus"}
              </span>
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

        <form
          action="https://www.amtrak.com/services/journeysearch"
          method="post"
          target="_blank"
        >
          <input type="hidden" name="wdf_origin" value={originStation.code} />
          <input
            type="hidden"
            name="wdf_destination"
            value={activeStation.code}
          />
          <input type="hidden" name="wdf_TripType" value="Return" />
          <input
            type="hidden"
            name="/sessionWorkflow/productWorkflow[@product='Rail']/tripRequirements/journeyRequirements[1]/departDate.date"
            value={getDepartureDate().toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          />
          <input
            type="hidden"
            name="/sessionWorkflow/productWorkflow[@product='Rail']/tripRequirements/journeyRequirements[2]/departDate.date"
            value={getReturnDate().toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          />
          <input type="hidden" name="wdf_person_type1" value="Adult" />
          <button
            type="submit"
            className="book-button plausible-event-name=Book"
          >
            Book on Amtrak
          </button>
        </form>
      </div>
      <div className="station-description">
        <h3>Things to Do in {activeStation.name}</h3>
        {activeStation.things_to_do &&
          activeStation.things_to_do.map((thing, index) => (
            <div key={index} className="thing-to-do">
              <p className="activity">
                <span className="activity-number">{index + 1}.</span>{" "}
                <strong>{thing.activity}</strong>
              </p>
              <p className="description">{thing.description}</p>
            </div>
          ))}
      </div>

      <div>
        <TrainPathFinder
          originStation={originStation.code}
          destinationStation={activeStation.code}
        />

<form
          action="https://www.amtrak.com/services/journeysearch"
          method="post"
          target="_blank"
        >
          <input type="hidden" name="wdf_origin" value={originStation.code} />
          <input
            type="hidden"
            name="wdf_destination"
            value={activeStation.code}
          />
          <input type="hidden" name="wdf_TripType" value="Return" />
          <input
            type="hidden"
            name="/sessionWorkflow/productWorkflow[@product='Rail']/tripRequirements/journeyRequirements[1]/departDate.date"
            value={getDepartureDate().toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          />
          <input
            type="hidden"
            name="/sessionWorkflow/productWorkflow[@product='Rail']/tripRequirements/journeyRequirements[2]/departDate.date"
            value={getReturnDate().toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          />
          <input type="hidden" name="wdf_person_type1" value="Adult" />
          <button
            type="submit"
            className="book-button2 plausible-event-name=Book2"
          >
            View all trains on Amtrak.com
          </button>
        </form>

      </div>

      {originStation.code === activeStation.code && (
        <div className="station-description">
          <p>
            {activeStation.name} is set as your origin. You can change this by
            adjusting the origin station, or city/address.
          </p>
        </div>
      )}

    
      <div className="info-panel-map">
        <p>{activeStation.address1}{', '}{activeStation.city}{', '}{activeStation.state}{', '}{activeStation.zipcode}</p>
        <StationMap activeStation={activeStation} /> 
        </div>

        {isMobile && (
        <div className="info-panel-footer">
          <button className="filter-button set" onClick={handleInfoPanel}>
            <div>Go back</div>
          </button>
        </div>
      )}

{!isMobile && (
        <div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        </div>
      )}

     

    </div>
  );
};

export default InfoPanel;
