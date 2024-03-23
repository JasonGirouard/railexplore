// FiltersContext.js
import React, { createContext, useState } from 'react';

export const FiltersContext = createContext();

export const FiltersProvider = ({ children }) => {
  const [origin, setOrigin] = useState(null);
  const [nearestStations, setNearestStations] = useState(null);
  const [originStation, setOriginStation] = useState(null);

  return (
    <FiltersContext.Provider value={{ origin, setOrigin , nearestStations, setNearestStations, originStation, setOriginStation}}>
      {children}
    </FiltersContext.Provider>
  );
};