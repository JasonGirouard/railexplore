// FiltersContext.js
import React, { createContext, useState } from 'react';

export const FiltersContext = createContext();

export const FiltersProvider = ({ children }) => {
  const [origin, setOrigin] = useState(null);

  return (
    <FiltersContext.Provider value={{ origin, setOrigin }}>
      {children}
    </FiltersContext.Provider>
  );
};