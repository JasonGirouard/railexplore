// StationContext.js
import { createContext, useState , useEffect, useContext } from 'react';
import { DestinationContext } from './DestinationContext';
import stations from "../data/stations.json"; 
import { useNavigate } from "react-router-dom";

export const StationContext = createContext();

export const StationProvider = ({ children }) => {
  const { selectedDestination } = useContext(DestinationContext);

  const [activeStation, setActiveStation] = useState(null);
  const [nearestStationsDestination, setNearestStationsDestination] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  

  // set the nearest stations for destination
  useEffect(() => {
    if (selectedDestination && selectedDestination.center) {
      console.log('selectedDestination:',selectedDestination)
  
      const { lat: selectedDestinationLat, long: selectedDestinationLong } = selectedDestination.center;
      // Define a threshold for the difference in latitude and longitude
      const threshold = 1; // Adjust this value based on your requirements
  
      // Filter stations within the threshold
      const filteredStations = stations.filter((station) => {
        const latDiff = Math.abs(station.lat - selectedDestinationLat);
        const longDiff = Math.abs(station.long - selectedDestinationLong);
        return latDiff <= threshold && longDiff <= threshold;
      });
  
      // Sort the filtered stations based on Euclidean distance
      const sortedStations = filteredStations.sort((a, b) => {
        const distA = getEuclideanDistanceInMiles(selectedDestinationLat, selectedDestinationLong, a.lat, a.long);
        const distB = getEuclideanDistanceInMiles(selectedDestinationLat, selectedDestinationLong, b.lat, b.long);
        return distA - distB;
      });
  
      // Take the nearest ten stations and calculate their Euclidean distances in miles
      const nearestTenStationsDestination = sortedStations.slice(0, 10).map((station) => {
        const distance = getEuclideanDistanceInMiles(selectedDestinationLat, selectedDestinationLong, station.lat, station.long);
        return {
          ...station,
          distance_from_selectedDestination: distance.toFixed(2), // Round to 2 decimal places
        };
      });
  
      setNearestStationsDestination(nearestTenStationsDestination);
      console.log('set the nearest and origin stations, origin:', nearestTenStationsDestination[0].name);
      const closestStation = nearestTenStationsDestination[0];
      setActiveStation(closestStation);
    
      setIsPanelOpen(true);
      console.log('selectedDestination:',selectedDestination)
      console.log('nearestTentoDest:',nearestTenStationsDestination)
  
    }
  }, [selectedDestination]);

   // Euclidean distance calculation function in miles
   const getEuclideanDistanceInMiles = (lat1, lon1, lat2, lon2) => {
    const R = 3958.8; // Earth's radius in miles
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };
  
  // Helper function to convert degrees to radians
  const toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
  };

  return (
    <StationContext.Provider value={{ activeStation, setActiveStation, isPanelOpen, setIsPanelOpen , nearestStationsDestination, setNearestStationsDestination}}>
      {children}
    </StationContext.Provider>
  );
};