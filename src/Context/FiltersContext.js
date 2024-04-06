// FiltersContext.js
import React, { createContext, useState, useEffect } from 'react';

export const FiltersContext = createContext();
export const FiltersProvider = ({ children }) => {
  const [duration, setDuration] = useState(null);
  const [destinationType, setDestinationType] = useState(null);

  // WRITE THE VALUS DURING INITIALIZATION WHERE THEY EXIST
  useEffect(() => {
  

  const storedDuration = localStorage.getItem('duration');
  if (storedDuration) {
    setDuration(JSON.parse(storedDuration));
  }

  const storedDestinationType = localStorage.getItem('destinationType');
  if (storedDestinationType) {
    setDestinationType(JSON.parse(storedDestinationType));
  }
    
  }, []);

  useEffect(() => {
    if (duration) {
        localStorage.setItem('duration', JSON.stringify(duration));
    }
  }, [duration]);

  useEffect(() => {
    if (destinationType) {
        localStorage.setItem('destinationType', JSON.stringify(destinationType));
    }
  }, [destinationType]);



  return (
    <FiltersContext.Provider value={{ duration, setDuration, destinationType, setDestinationType}}>
      {children}
    </FiltersContext.Provider>
  );
};