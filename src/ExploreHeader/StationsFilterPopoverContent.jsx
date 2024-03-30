import React, { useState, useContext } from "react";
import { OriginStationContext } from "../Context/OriginStationContext";
import {OriginContext} from "../Context/OriginContext";
import "./Filters.css";

const StationsFilterPopoverContent = () => {
  const { nearestStations, originStation, setOriginStation } =
    useContext(OriginStationContext);
    const {origin} = useContext(OriginContext);
  const [showAllStations, setShowAllStations] = useState(false); // acts when you click 'Show next 5 closest stations'

  const handleStationChange = (station) => {
    setOriginStation(station);
  };

  const toggleShowAllStations = () => {
    setShowAllStations((prevState) => !prevState);
  };

  return (
    <div>
      <div className="section-header origin">Origin Station</div>

      {origin ? (
        <>
          <div className="placename">{origin.place_name}</div>
          <div className="station-list">
            {nearestStations
              .slice(0, showAllStations ? nearestStations.length : 5)
              .map((station) => (
                <div key={station.code} className="station-item">
                  <div className="left-two-container">
                    <input
                      type="radio"
                      checked={originStation.code === station.code}
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
                      {Math.floor(station.distance_from_origin)} miles
                    </div>
                    <div className="station-distance-bottom">from origin</div>
                  </div>
                </div>
              ))}
          </div>
          {nearestStations.length > 5 && (
            <div className="show-more" onClick={toggleShowAllStations}>
              {showAllStations ? (
                <span>
                  - Hide {nearestStations.length - 5} furthest stations...
                </span>
              ) : (
                <span>
                  + Show next {nearestStations.length - 5} closest stations...
                </span>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="placename">
          Please set an origin before choosing your stations
        </div>
      )}
    </div>
  );
};

export default StationsFilterPopoverContent;