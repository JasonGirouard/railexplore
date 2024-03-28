// DurationModal.jsx
import React, { useEffect, useRef, useContext } from "react";
import { FiltersContext } from "../Context/FiltersContext";
import { OriginContext } from "../Context/OriginContext";
import { Slider } from "antd";
import "./Filters.css";

const DurationModal = ({ onClose }) => {
  const { duration, setDuration } = useContext(FiltersContext);
  const { origin } = useContext(OriginContext);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleDurationChange = (value) => {
    if (value >= 24) {
      setDuration(1000);
    } else {
      setDuration(value);
    }
  };

  return (
    <div ref={modalRef} className="filters-modal">
      <div className="section-header origin">Duration</div>
      {origin ? (
        <>
          <div className="duration-text">
            Travel duration:{" "}
            {duration === null || duration >= 24 ? "Any" : `Under ${duration} hrs`}
          </div>
          <Slider
            min={0}
            max={24}
            value={duration === null || duration > 24 ? 24 : duration}
            onChange={handleDurationChange}
            step={1}
          />
        </>
      ) : (
        <div className="placename">
          Please set an origin before choosing your duration
        </div>
      )}
    </div>
  );
};

export default DurationModal;