import React from "react";
import StationsFilterPopoverContent from "./StationsFilterPopoverContent";
import DestinationTypePopoverContent from "./DestinationTypePopoverContent";
import DurationFilterPopoverContent from "./DurationFilterPopoverContent";

import "./Filters.css";

const AllFiltersPopoverContent = () => {

  return (
    <div>
   <StationsFilterPopoverContent/>
   <hr className="divider" />
   <DurationFilterPopoverContent/>
   <hr className="divider"  />
   <DestinationTypePopoverContent/>
   
   </div>
  );
};

export default AllFiltersPopoverContent;