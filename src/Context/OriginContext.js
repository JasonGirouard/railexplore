// OriginContext.js
import React, { createContext, useState, useEffect } from 'react';

export const OriginContext = createContext();

export const OriginProvider = ({ children }) => {

// const [userLocation, setUserLocation] = useState(null);
  const [origin, setOrigin] = useState(null);


  // JSON.parse(localStorage.getItem('userIP'))

  useEffect(() => {
    // const storedUserIP = localStorage.getItem('userIP');
    // if (storedUserIP) {
    //   const { lat, long } = JSON.parse(storedUserIP);
    //   if (lat !== undefined && long !== undefined) {
    //     setUserLocation({ lat, long });
    //   }
    // }

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