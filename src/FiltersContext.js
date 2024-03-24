// FiltersContext.js
import React, { createContext, useState } from 'react';

export const FiltersContext = createContext();

export const FiltersProvider = ({ children }) => {
  const [origin, setOrigin] = useState(null);
  const [nearestStations, setNearestStations] = useState(null);
  const [originStation, setOriginStation] = useState(null);
  const [duration, setDuration] = useState(null);
  const [destinationType, setDestinationType] = useState(null);

  return (
    <FiltersContext.Provider value={{ origin, setOrigin , nearestStations, setNearestStations, originStation, setOriginStation, duration, setDuration, destinationType, setDestinationType}}>
      {children}
    </FiltersContext.Provider>
  );
};