import { useState, useEffect } from "react";
import { calculateRoutesBetweenStations, calculateRoutesWithTransfers } from './routeCalculations';

export const openInfoPanel = (station, originStation, routes, setCalculatedRoutes, setCalculatedRoutesWT, setIsPanelOpen,  setActiveStation) => {
    setActiveStation(station); // Save the data of the active station

    if (originStation) {
      // Perform route calculation here and update state
      const newCalculatedRoutes = calculateRoutesBetweenStations(routes, originStation.code, station.code);
      const newCalculatedRoutesWT = calculateRoutesWithTransfers(routes, originStation.code, station.code);
      console.log('routes to ', station.name, ':',newCalculatedRoutes)
    console.log('routes with transfers to ', station.name, ':', newCalculatedRoutesWT)
      setCalculatedRoutes(newCalculatedRoutes); // Store calculated routes in state
      setCalculatedRoutesWT(newCalculatedRoutesWT); // Store calculated routesWT in state

    
      // calculatedRoutesWT
    }

    setIsPanelOpen(true); // Open the panel
 
  };