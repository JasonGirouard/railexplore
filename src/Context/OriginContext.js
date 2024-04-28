// OriginContext.js
import React, { createContext, useState, useEffect } from 'react';

export const OriginContext = createContext();

export const OriginProvider = ({ children }) => {

  const [origin, setOrigin] = useState(null);

  useEffect(() => {
    
    const origin = localStorage.getItem('origin');
    if (origin) {
   
        setOrigin(JSON.parse(origin));
      }
  }, []);

  useEffect(() => {
  
    if (origin) {
      
    
        localStorage.setItem('origin', JSON.stringify(origin));
    }
  }, [origin]);


  return (
    <OriginContext.Provider value={{ origin, setOrigin }}>
      {children}
    </OriginContext.Provider>
  );
};