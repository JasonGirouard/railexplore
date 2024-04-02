// OriginContext.js
import React, { createContext, useState, useEffect } from 'react';

export const OriginContext = createContext();

export const OriginProvider = ({ children }) => {

  const [origin, setOrigin] = useState(null);

  useEffect(() => {

    const origin = localStorage.getItem('origin');
    if (origin) {
        console.log('reading from localstorage and setting origin') 
        setOrigin(JSON.parse(origin));
      }
  }, []);

  useEffect(() => {
    if (origin) {
        console.log('writing origin to local Storage') 
        localStorage.setItem('origin', JSON.stringify(origin));
    }
  }, [origin]);
  


  return (
    <OriginContext.Provider value={{ origin, setOrigin }}>
      {children}
    </OriginContext.Provider>
  );
};