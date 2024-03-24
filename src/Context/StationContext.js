// StationContext.js
import { createContext, useState } from 'react';

export const StationContext = createContext();

export const StationProvider = ({ children }) => {
    const defaultStation = {
        name: "New York, NY",
        is_recommended: true,
        code: "NYP",
        city: "New York",
        state: "NY",
        address1: "351 West 31st Street",
        zipcode: "10001",
        lat: "40.7503352640001",
        long: "-73.9944604469999",
        Shelter: true,
        station_type: "Station Building",
        mode: "TRAIN",
        description: "",
      };
  const [activeStation, setActiveStation] = useState(defaultStation);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <StationContext.Provider value={{ activeStation, setActiveStation, isPanelOpen, setIsPanelOpen }}>
      {children}
    </StationContext.Provider>
  );
};