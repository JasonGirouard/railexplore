import React, { useContext  } from "react";
import StationsFilterPopoverContent from "./StationsFilterPopoverContent";
import DestinationTypePopoverContent from "./DestinationTypePopoverContent";
import DurationFilterPopoverContent from "./DurationFilterPopoverContent";
import DestinationStationsFilterPopoverContent from "./DestinationStationsFilterPopoverContent";
import {DestinationContext} from "../Context/DestinationContext";

import "./Filters.css";

const AllFiltersPopoverContent = () => {
  const { selectedDestination } = useContext(DestinationContext);

  return (
    <div>
   <StationsFilterPopoverContent/>
   <hr className="divider" />
   <DestinationStationsFilterPopoverContent/>
   {selectedDestination && <hr className="divider" />}
   <DurationFilterPopoverContent/>
   <hr className="divider"  />
   <DestinationTypePopoverContent/>
   
   </div>
  );
};

export default AllFiltersPopoverContent;