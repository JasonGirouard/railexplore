// AppHeader.jsx
import React, { useState, useRef, useEffect } from "react";
import AllFiltersPopoverPortal from "./AllFiltersPopoverPortal";
import "./AppHeader.css";

import OriginButton from "./OriginButton";
import DestinationButton from "./DestinationButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';


import AllFiltersButton from "./AllFiltersButton.jsx";
import StationsFilterButton from "./StationsFilterButton.jsx";
import DurationFilterButton from "./DurationFilterButton.jsx";
import DestinationTypeFilterButton from "./DestinationTypeFilterButton.jsx";

const AppHeader = (isMobile) => {
  const [showFiltersPortal, setShowFiltersPortal] = useState(false);
  const appHeaderRef = useRef(null);

  // const filterButtonRef = useRef(null);

  //const durationButtonRef = useRef(null);
  const toggleFiltersPortal = () => {
    // on the click, display it, and let it know where to render it
    setShowFiltersPortal(!showFiltersPortal);
  };

  return (
    <div ref={appHeaderRef} className="app-header-container">
      <div className="app-header-top">

      <div className="logistics-container">
           <OriginButton/>
           <FontAwesomeIcon icon={faArrowRight} />
           <DestinationButton/>
       </div>

      </div>
      <div className="app-header-bottom">
        <div className="filters-container">
          <AllFiltersButton isMobile={isMobile} showFiltersPortal={showFiltersPortal} setShowFiltersPortal={setShowFiltersPortal}/>
          <StationsFilterButton isMobile={isMobile} showFiltersPortal={showFiltersPortal} setShowFiltersPortal={setShowFiltersPortal}/>
          <DurationFilterButton isMobile={isMobile} showFiltersPortal={showFiltersPortal} setShowFiltersPortal={setShowFiltersPortal}/>
          <DestinationTypeFilterButton isMobile={isMobile} showFiltersPortal={showFiltersPortal} setShowFiltersPortal={setShowFiltersPortal} />
        </div>
      </div>

      {showFiltersPortal && (
        <AllFiltersPopoverPortal
          setShowFiltersPortal={setShowFiltersPortal}
        />
      )}
    </div>
  );
};

export default AppHeader;
