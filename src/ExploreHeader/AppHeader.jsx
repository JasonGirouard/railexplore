// AppHeader.jsx
import React, { useState, useRef } from "react";
import LogisticsHeader from "./LogisticsHeader";
import FiltersHeader from "./FiltersHeader";
import DurationPopoverPortal from "./DurationPopoverPortal";
import "./AppHeader.css";

const AppHeader = () => {
  const [showDurationPopover, setShowDurationPopover] = useState(false);
  const [durationButtonRect, setDurationButtonRect] = useState(null);
  const durationButtonRef = useRef(null);

  const toggleDurationPopover = (buttonRect) => {
    setShowDurationPopover((prevState) => !prevState);
    setDurationButtonRect(buttonRect);
  };

  return (
    <div className="app-header-container">
      <div className="app-header-top">
        <LogisticsHeader />
      </div>
      <div className="app-header-bottom">
        <FiltersHeader
          toggleDurationPopover={toggleDurationPopover}
          durationButtonRef={durationButtonRef}
        />
      </div>
      {showDurationPopover && (
        <DurationPopoverPortal
          onClose={toggleDurationPopover}
          buttonRect={durationButtonRect}
          showDurationPopover={showDurationPopover}
        />
      )}
    </div>
  );
};

export default AppHeader;