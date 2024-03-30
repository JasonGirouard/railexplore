// DurationPopoverPortal.jsx
import React, { useEffect, useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import { FiltersContext } from "../Context/FiltersContext";
import { OriginContext } from "../Context/OriginContext";
import { Slider } from "antd";
import "./Filters.css";
import DurationFilterPopoverContent from './DurationFilterPopoverContent';

const DurationPopoverPortal = ({ onClose, buttonRect }) => {
  const { duration, setDuration } = useContext(FiltersContext);
  const { origin } = useContext(OriginContext);
  const [popoverPosition, setPopoverPosition] = useState({});

  useEffect(() => {
    const handleResize = () => {
      const { left, bottom } = buttonRect;
      const windowWidth = window.innerWidth;
      const popoverWidth = 360;
      const spaceOnRight = windowWidth - left;

      if (spaceOnRight < popoverWidth) {
        setPopoverPosition({
          left: windowWidth - popoverWidth,
          top: bottom,
        });
      } else {
        setPopoverPosition({
          left,
          top: bottom,
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [buttonRect]);

  const handleDurationChange = (value) => {
    if (value >= 24) {
      setDuration(1000);
    } else {
      setDuration(value);
    }
  };

  return ReactDOM.createPortal(
    <div
      style={{
        position: 'absolute',
        top: popoverPosition.top,
        left: popoverPosition.left,
        zIndex: 1000,
      }}
      className="filters-Popover"
    >
      <DurationFilterPopoverContent/>
    </div>,
    document.body
  );
};

export default DurationPopoverPortal;