import React, { useEffect } from 'react';

const LocationDetector = ({ stations, onNearestStationFound }) => {
    useEffect(() => {
        const findNearestStation = (latitude, longitude) => {
            let nearestDistance = Infinity;
            let nearestStation = null;

            stations.forEach(station => {
                const distance = getDistanceFromLatLonInKm(latitude, longitude, parseFloat(station.lat), parseFloat(station.long));
                if (distance < nearestDistance) {
                    nearestDistance = distance;
                    nearestStation = station;
                }
            });

            if (nearestStation) {
                onNearestStationFound(nearestStation);
            }
        };

        const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
            var R = 6371; // Radius of the earth in kilometers
            var dLat = deg2rad(lat2-lat1);  
            var dLon = deg2rad(lon2-lon1); 
            var a = 
                Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
                Math.sin(dLon/2) * Math.sin(dLon/2)
                ; 
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
            var distance = R * c; // Distance in km
            return distance;
        };

        const deg2rad = (deg) => {
            return deg * (Math.PI/180)
        };

        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            findNearestStation(latitude, longitude);
        }, error => {});
    }, [stations, onNearestStationFound]);

    return null; // This component doesn't render anything
};

export default LocationDetector;
