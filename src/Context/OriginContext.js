// OriginContext.js
import React, { createContext, useState, useEffect } from 'react';

export const OriginContext = createContext();

export const OriginProvider = ({ children }) => {

  const [origin, setOrigin] = useState(null);

  useEffect(() => {
    
    const origin = localStorage.getItem('origin');
    if (origin) {
      // console.log('reading from localstorage and setting origin:',origin.substr(5,20)) 
        setOrigin(JSON.parse(origin));
      }
  }, []);

  useEffect(() => {
  //  console.log('origin context triggered:', origin )
    if (origin) {
      
      //  console.log('writing origin to local Storage') 
        localStorage.setItem('origin', JSON.stringify(origin));
    }
  }, [origin]);


  return (
    <OriginContext.Provider value={{ origin, setOrigin }}>
      {children}
    </OriginContext.Provider>
  );
};