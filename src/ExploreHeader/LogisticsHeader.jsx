import React, { useState, useEffect } from "react";
import "./LogisticsHeader.css"; // Ensure your CSS styles are defined here
import OriginButton from "./OriginButton";


const LogisticsHeader = () => {
   
     return (
       <div className="logistics-container">
           <OriginButton/>
       </div>
     );
   };
   export default LogisticsHeader;