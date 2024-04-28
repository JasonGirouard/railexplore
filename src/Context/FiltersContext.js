// FiltersContext.js
import React, { createContext, useState, useEffect } from 'react';

export const FiltersContext = createContext();
export const FiltersProvider = ({ children }) => {
  const [duration, setDuration] = useState(null);
  const [destinationType, setDestinationType] = useState(null);

  const [tripType, setTripType] = useState("Return");
  const [departureDate, setDepartureDate] = useState(getDepartureDate());
  const [returnDate, setReturnDate] = useState(getReturnDate());
  const [travelers, setTravelers] = useState(1);

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

  function getDepartureDate() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysUntilSaturday = (6 - dayOfWeek + 7) % 7;
    const nearestSaturday = new Date(today);
    nearestSaturday.setDate(today.getDate() + daysUntilSaturday);

    const defaultDepartureDate = new Date(nearestSaturday);
    defaultDepartureDate.setDate(nearestSaturday.getDate() + 14); // Add 2 weeks

    return defaultDepartureDate;
  }

  function getReturnDate(departureDate) {
    if (!departureDate) {
      departureDate = getDepartureDate();
    }
    const returnDate = new Date(departureDate);
    returnDate.setDate(departureDate.getDate() + 1); // Add 1 day
    return returnDate;
  }



  return (
    <FiltersContext.Provider value={{ duration, setDuration, destinationType, setDestinationType, tripType, setTripType, departureDate, setDepartureDate, returnDate, setReturnDate, travelers, setTravelers}}>
      {children}
    </FiltersContext.Provider>
  );
};