import React from "react";
import StationsFilterPopoverContent from "./StationsFilterPopoverContent";
import DestinationTypePopoverContent from "./DestinationTypePopoverContent";
import DurationFilterPopoverContent from "./DurationFilterPopoverContent";
import "./Filters.css";

const AllFiltersPopoverContent = () => {

  return (
    <div>
   <StationsFilterPopoverContent/>
   <hr style={{ borderTop: '1px solid #e0e0e0', margin: '12px 0' }} />
   <DurationFilterPopoverContent/>
   <hr style={{ borderTop: '1px solid #e0e0e0', margin: '12px 0' }} />
   <DestinationTypePopoverContent/>
   </div>
  );
};

export default AllFiltersPopoverContent;