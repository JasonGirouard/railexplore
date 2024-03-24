// FiltersContext.js
import React, { createContext, useState, useEffect , useContext} from 'react';
 import { OriginContext } from './OriginContext';
 import stations from "../data/stations.json"; 
 import stationSummary from "../data/all_stations_paths.json";
// import stations from "../data/stations.json"; 
export const OriginStationContext = createContext();
export const OriginStationProvider = ({ children }) => {

     const {origin } = useContext(OriginContext);

    const defaultStation = {
        name: "New York, NY",
        is_recommended: true,
        code: "NYP",
        city: "New York",
        state: "NY",
        address1: "351 West 31st Street",
        zipcode: "10001",
        lat: "40.7503352640001",
        long: "-73.9944604469999",
        Shelter: true,
        station_type: "Station Building",
        mode: "TRAIN",
        description: "",
      };
  const [originStation, setOriginStation] = useState(defaultStation);
  const [nearestStations, setNearestStations] = useState(null);
  const [selectedStationDestinations, setSelectedStationDestinations] = useState(null);

  // WRITE THE VALUS DURING INITIALIZATION WHERE THEY EXIST
  useEffect(() => {
    // const storedUserIP = localStorage.getItem('userIP');
    // if (storedUserIP) {
    //   const { lat, long } = JSON.parse(storedUserIP);
    //   if (lat !== undefined && long !== undefined) {
    //     setUserLocation({ lat, long });
    //   }
    // }

    const storedNearestStations = localStorage.getItem('nearestStations');
    if (storedNearestStations) {
        console.log('in initialization, setting nearest stations')
      setNearestStations(JSON.parse(storedNearestStations));
    }

    const storedOriginStation = localStorage.getItem('originStation');
  if (storedOriginStation) {
      console.log('in initialization, setting origin station')
    setOriginStation(JSON.parse(storedOriginStation));
  }
  }, []);

   // WRITE THE VALUES TO LOCAL STORAGE AS THEY CHANGE
   useEffect(() => {
    if (originStation) {
        console.log('writing originStation to local Storage') 
        localStorage.setItem('originStation', JSON.stringify(originStation));

        console.log('in set selected stations destinations:',selectedStationDestinations);
        setSelectedStationDestinations(
      stationSummary.find(
        (entry) => entry.origin_station === originStation.code
      )
    );
    }


  }, [originStation]);

  useEffect(() => {
    if (nearestStations) {
        console.log('writing nearestStations to local Storage') 
        localStorage.setItem('nearestStations', JSON.stringify(nearestStations));
    }
  }, [nearestStations]);

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
     const closestStation = nearestTenStations[0];
      setOriginStation(closestStation);
    }
  
}, [origin]);

// limit the summary of the data
// maybe move this into the same useEffect
//    useEffect(() => {
//     console.log('in set selected stations destinations:',selectedStationDestinations);
//     setSelectedStationDestinations(
//       stationSummary.find(
//         (entry) => entry.origin_station === originStation.code
//       )
//     );
//   }, [originStation]);


  return (
    <OriginStationContext.Provider value={{ nearestStations, setNearestStations, originStation, setOriginStation , selectedStationDestinations, setSelectedStationDestinations}}>
      {children}
    </OriginStationContext.Provider>
  );
};