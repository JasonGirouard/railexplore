// FiltersContext.js
import React, { createContext, useState, useEffect , useContext} from 'react';
 import { OriginContext } from './OriginContext';
 import stations from "../data/stations.json"; 
 import stationSummary from "../data/all_stations_paths.json";
// import stations from "../data/stations.json"; 
export const OriginStationContext = createContext();
export const OriginStationProvider = ({ children }) => {
     const {origin } = useContext(OriginContext);
  const [originStation, setOriginStation] = useState(null);
  const [nearestStations, setNearestStations] = useState(null);
  const [selectedStationDestinations, setSelectedStationDestinations] = useState(null);

  useEffect(() => {
    if (origin && origin.center) {
      const { lat: originLat, long: originLong } = origin.center;
      const sortedStations = stations.sort((a, b) => {
        const distA = getDistance(originLat, originLong, a.lat, a.long);
        const distB = getDistance(originLat, originLong, b.lat, b.long);
        return distA - distB;
      });
      const nearestTenStations = sortedStations.slice(0, 10).map((station) => {
        const distance = getDistance(originLat, originLong, station.lat, station.long);
        const distanceInMiles = distance * 0.621371; // Convert kilometers to miles
        return {
          ...station,
          distance_from_origin: distanceInMiles.toFixed(2), // Round to 2 decimal places
        };
      });

      setNearestStations(nearestTenStations);
     // console.log('set the nearest and origin stations, origin:', nearestTenStations[0].name)
     const closestStation = nearestTenStations[0];
      setOriginStation(closestStation);
    }
  
}, [origin]);


  // WRITE THE VALUS DURING INITIALIZATION WHERE THEY EXIST
  useEffect(() => {
    // wait for origin to be defined 
if (origin) {
    const storedOriginStation = localStorage.getItem('originStation');
    // only set the origin station based on the local storage value if the originStation is currently null or undefined, and the local storage value is not null or undefined
    if (storedOriginStation && storedOriginStation !== null && (originStation === null || originStation === undefined)) {
   //   console.log('in initialization, setting origin station based on local storage, storedOrigin:',storedOriginStation.substring(9, 20))

    setOriginStation(JSON.parse(storedOriginStation));
  }
}
  }, [origin]);

   // WRITE THE VALUES TO LOCAL STORAGE AS THEY CHANGE
   useEffect(() => {
    if (originStation) {
      //  console.log('writing originStation to local Storage', originStation) 
        localStorage.setItem('originStation', JSON.stringify(originStation));

       // console.log('in set selected stations destinations:',selectedStationDestinations);
        setSelectedStationDestinations(
      stationSummary.find(
        (entry) => entry.origin_station === originStation.code
      )
    );
    }


  }, [originStation]);

  // when origin is updated, update the originStation and nearestStations 
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in kilometers
    return d;
  };
  
  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  return (
    <OriginStationContext.Provider value={{ nearestStations, setNearestStations, originStation, setOriginStation , selectedStationDestinations, setSelectedStationDestinations}}>
      {children}
    </OriginStationContext.Provider>
  );
};