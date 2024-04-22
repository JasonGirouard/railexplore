// FiltersContext.js
import React, { createContext, useState, useEffect , useContext} from 'react';
 import { OriginContext } from './OriginContext';
 import stations from "../data/stations.json"; 
 //import stationSummary from "../data/all_stations_paths.json";
// import stations from "../data/stations.json"; 
export const OriginStationContext = createContext();

export const OriginStationProvider = ({ children }) => {

     const {origin } = useContext(OriginContext);
const [stationSummary, setStationSummary] = useState(null);
  const [originStation, setOriginStation] = useState(null);
  const [nearestStations, setNearestStations] = useState(null);
  const [selectedStationDestinations, setSelectedStationDestinations] = useState(null);

  useEffect(() => {
    const fetchStationSummary = async () => {
      try {
      //  const response = await fetch('https://traingang.s3.amazonaws.com/all_stations_paths.json');
       // const response = await fetch('/all_stations_paths.json');
        const response = await fetch('/optimized_stations_paths.json');
       
        const data = await response.json();
        setStationSummary(data);
        console.log('setting111')
      } catch (error) {
        console.error('Error fetching station summary:', error);
      }
    };
  
    fetchStationSummary();
  }, []);


  useEffect(() => {
    if (origin && origin.center) {
     // console.time('Nearest Stations Calculation'); // Start the timer
     // const startTime = performance.now(); // Get the start time in milliseconds
  
      const { lat: originLat, long: originLong } = origin.center;
  
      // Define a threshold for the difference in latitude and longitude
      const threshold = 1; // Adjust this value based on your requirements
  
      // Filter stations within the threshold
      const filteredStations = stations.filter((station) => {
        const latDiff = Math.abs(station.lat - originLat);
        const longDiff = Math.abs(station.long - originLong);
        return latDiff <= threshold && longDiff <= threshold;
      });
  
      // Sort the filtered stations based on Euclidean distance
      const sortedStations = filteredStations.sort((a, b) => {
        const distA = getEuclideanDistanceInMiles(originLat, originLong, a.lat, a.long);
        const distB = getEuclideanDistanceInMiles(originLat, originLong, b.lat, b.long);
        return distA - distB;
      });
  
      // Take the nearest ten stations and calculate their Euclidean distances in miles
      const nearestTenStations = sortedStations.slice(0, 10).map((station) => {
        const distance = getEuclideanDistanceInMiles(originLat, originLong, station.lat, station.long);
        return {
          ...station,
          distance_from_origin: distance.toFixed(2), // Round to 2 decimal places
        };
      });
  
      setNearestStations(nearestTenStations);
      console.log('set the nearest and origin stations, origin:', nearestTenStations[0].name);
      const closestStation = nearestTenStations[0];
      setOriginStation(closestStation);
  
    //  const endTime = performance.now(); // Get the end time in milliseconds
    //  const elapsedTime = endTime - startTime; // Calculate the elapsed time
    //   console.log(`Start Time: ${startTime.toFixed(2)} ms`);
    //   console.log(`End Time: ${endTime.toFixed(2)} ms`);
    //   console.log(`Elapsed Time: ${elapsedTime.toFixed(2)} ms`);
    //   console.timeEnd('Nearest Stations Calculation'); // End the timer and log the elapsed time
    }
  }, [origin]);
  
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
  

  // WRITE THE VALUS DURING INITIALIZATION WHERE THEY EXIST
//   useEffect(() => {
//     // wait for origin to be defined 
// if (origin) {
//    // const storedOriginStation = localStorage.getItem('originStation');
//     // only set the origin station based on the local storage value if the originStation is currently null or undefined, and the local storage value is not null or undefined
//     if ((originStation === null || originStation === undefined)) {
//       console.log('in initialization, setting origin station based on local storage, storedOrigin:',storedOriginStation.substring(9, 20))

//     setOriginStation(JSON.parse(storedOriginStation));
//   }
// }
//   }, [origin]);

   // WRITE THE VALUES TO LOCAL STORAGE AS THEY CHANGE
   useEffect(() => {
    if (originStation && stationSummary) {

        // optimized all_stations_paths
        setSelectedStationDestinations(stationSummary[originStation.code]);

        //old all_stations_paths
    //   setSelectedStationDestinations(
    //     stationSummary.find(
    //       (entry) => entry.origin_station === originStation.code
    //     )
    //   );
    }
  }, [originStation, stationSummary]);


  return (
    <OriginStationContext.Provider value={{ nearestStations, setNearestStations, originStation, setOriginStation , selectedStationDestinations, setSelectedStationDestinations}}>
      {children}
    </OriginStationContext.Provider>
  );
};