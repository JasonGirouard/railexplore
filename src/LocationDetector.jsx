

// LocationDetector.js
import React, { useEffect } from 'react';

const IPGEOLOCATION_API_KEY = '2c8154a0b3bc4ac0a27c1a91b700fd41';

const LocationDetector = ({ stations, setOriginStation, onLocationDetected }) => {
   
  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
          console.log('pinging ip api')
        const response = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${IPGEOLOCATION_API_KEY}`);
        const data = await response.json();
        const { latitude, longitude } = data;
        findNearestStation(latitude, longitude);
      } catch (error) {
        console.error('Error fetching user location:', error);
      }
    };

    const findNearestStation = (lat, lon) => {
      let nearestStation = null;
      let shortestDistance = Infinity;

      stations.forEach(station => {
        const distance = calculateDistance(lat, lon, station.lat, station.long);
        if (distance < shortestDistance) {
          shortestDistance = distance;
          nearestStation = station;
        }
      });

      if (nearestStation) {
          console.log('nearest station found, setting origin & coords ',nearestStation.name)
        setOriginStation(nearestStation);
        // note that I might need to set the searchTerm here -- e.g. setSearchTerm(station.name). But then again, the search.jsx listens to changes in originStation on its own. 
      //  setCoords([parseFloat(nearestStation.lat), parseFloat(nearestStation.long)]);
        onLocationDetected();
      }
    };

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
      // Haversine formula to calculate distance between two points on the Earth
      const R = 6371; // Earth's radius in km
      const dLat = deg2rad(lat2-lat1);
      const dLon = deg2rad(lon2-lon1); 
      const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2); 
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      const distance = R * c; // Distance in km
      return distance;
    };

    const deg2rad = (deg) => {
      return deg * (Math.PI/180);
    };

    fetchUserLocation();
  }, [stations, setOriginStation]);

  return null; // This component doesn't render anything itself
};

export default LocationDetector;
