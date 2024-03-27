// StationContext.js
import { createContext, useState } from 'react';

export const StationContext = createContext();

export const StationProvider = ({ children }) => {
  const [activeStation, setActiveStation] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <StationContext.Provider value={{ activeStation, setActiveStation, isPanelOpen, setIsPanelOpen }}>
      {children}
    </StationContext.Provider>
  );
};