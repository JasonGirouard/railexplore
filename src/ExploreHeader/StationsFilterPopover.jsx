import React, { useEffect, useRef, useState, useContext } from "react";
import { OriginStationContext } from "../Context/OriginStationContext";
import {OriginContext} from "../Context/OriginContext";
import "./Filters.css";

const StationsFilterPopover = ({ buttonRef, onClose }) => {
  const { nearestStations, originStation, setOriginStation } =
    useContext(OriginStationContext);
    const {origin} = useContext(OriginContext);
  const [showAllStations, setShowAllStations] = useState(false); // acts when you click 'Show next 5 closest stations'
  const PopoverRef = useRef(null);

  const handleStationChange = (station) => {
    setOriginStation(station);
  };

 

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        //check if the clicked target is outside both the Popover (PopoverRef.current) and the button (buttonRef.current).
        //If it is, we call the onClose function to close the Popover.
        PopoverRef.current &&
        !PopoverRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [buttonRef, onClose]);

  return (
    <div ref={PopoverRef} className="filters-Popover">
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
                        <div className = "station-name-top-name">{station.name}</div>
                        <div className = "station-name-top-code">&nbsp;{station.code}</div>
                    
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
        {!showAllStations && nearestStations.length > 5 && (
          <div className="show-more" onClick={() => setShowAllStations(true)}>
            + Show next {nearestStations.length - 5} closest stations...
          </div>
        )}
      </>
    ) : (
      <div className = "placename"> Please set an origin before choosing your stations</div>
    )}

    </div>
  );
};

export default StationsFilterPopover;
