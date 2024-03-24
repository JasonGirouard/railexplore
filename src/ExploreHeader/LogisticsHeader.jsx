import React from "react";
import "./LogisticsHeader.css"; // Ensure your CSS styles are defined here
import OriginButton from "./OriginButton";

import DestinationButton from "./DestinationButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const LogisticsHeader = () => {
   
     return (
       <div className="logistics-container">
       
 
           <OriginButton/>
           {/* <FontAwesomeIcon icon={faChevronRight} /> */}
           {/* <FontAwesomeIcon icon={faCaretRight} /> */}
           <FontAwesomeIcon icon={faArrowRight} />
        
           <DestinationButton/>
       </div>
     );
   };
   export default LogisticsHeader;