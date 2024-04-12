import React, { useState, useContext, useEffect } from "react";
import { StationContext } from "../Context/StationContext";
import { OriginContext } from "../Context/OriginContext";
import { OriginStationContext } from "../Context/OriginStationContext";
import {DestinationContext} from "../Context/DestinationContext";
import "./Filters.css";
import { useNavigate } from "react-router-dom";

const DestinationStationsFilterPopoverContent = () => {
  const { nearestStationsDestination, activeStation, setActiveStation } = useContext(StationContext);
  const { originStation } = useContext(OriginStationContext);
  const { origin } = useContext(OriginContext);

    const { selectedDestination } = useContext(DestinationContext);
  const [showAllStations, setShowAllStations] = useState(false); // acts when you click 'Show next 5 closest stations'
  const navigate = useNavigate();

  const handleStationChange = (station) => {
    //  console.log('handling station change',station.code)
    setActiveStation(station);
    /// POSSIBLY FIX ME: OPEN THE INFO PANEL 
    // FIX ME: SET THE URL PARAMS WHEN A STATION CHANGES -- 
    navigate(`/explore/${origin.id}/${originStation.code}/${station.code}`);
  };

  const toggleShowAllStations = () => {
    setShowAllStations((prevState) => !prevState);
  };

  if (!selectedDestination) {
    return null;
  }


  return (
    <div>
      <div className="section-header origin">Destination Station</div>

      {selectedDestination ? (
        <>
          <div className="placename">{selectedDestination.place_name}</div>
          <div className="station-list">
            {nearestStationsDestination
              .slice(0, showAllStations ? nearestStationsDestination.length : 5)
              .map((station) => (
                <div key={station.code} className="station-item">
                  <div className="left-two-container">
                    <input
                      type="radio"
                      checked={activeStation.code === station.code}
                      onChange={() => handleStationChange(station)}
                      className="radio-button-class"
                    />
                    <div className="station-name-body">
                      <div className="station-name-top">
                        <div className="station-name-top-name">
                          {station.name}
                        </div>
                        <div className="station-name-top-code">
                          &nbsp;{station.code}
                        </div>
                      </div>
                      <div className="station-address">{station.address1}</div>
                    </div>
                  </div>
                  <div className="station-distance">
                    <div className="station-distance-top">
                      {Math.floor(station.distance_from_selectedDestination)} miles
                    </div>
                    <div className="station-distance-bottom">from dest</div>
                  </div>
                </div>
              ))}
          </div>
          {nearestStationsDestination.length > 5 && (
            <div className="show-more" onClick={toggleShowAllStations}>
              {showAllStations ? (
                <span>
                  - Hide {nearestStationsDestination.length - 5} furthest stations...
                </span>
              ) : (
                <span>
                  + Show next {nearestStationsDestination.length - 5} closest stations...
                </span>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="placename">
          Please set a destination before choosing your stations
        </div>
      )}
    </div>
  );
};

export default DestinationStationsFilterPopoverContent;