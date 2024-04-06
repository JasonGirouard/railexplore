// DestinationContext.js
import React, { createContext, useState, useEffect } from 'react';

export const DestinationContext = createContext();

export const DestinationProvider = ({ children }) => {

  const [selectedDestination, setSelectedDestination] = useState(null);
  //note that destination doesn't need to be stored in local storage. 

  return (
    <DestinationContext.Provider value={{ selectedDestination, setSelectedDestination }}>
      {children}
    </DestinationContext.Provider>
  );
};