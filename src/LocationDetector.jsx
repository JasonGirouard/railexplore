

// LocationDetector.js
import React, { useEffect } from 'react';

const IPGEOLOCATION_API_KEY = 'a15c0cedd5334e90a383368e3358572b';

const LocationDetector = ({ stations, setOriginStation, setCoords }) => {
  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
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
          console.log('nearest station found: ',nearestStation.name)
        setOriginStation(nearestStation);
        setCoords([parseFloat(nearestStation.lat), parseFloat(nearestStation.long)]);
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
  }, [stations, setOriginStation, setCoords]);

  return null; // This component doesn't render anything itself
};

export default LocationDetector;
