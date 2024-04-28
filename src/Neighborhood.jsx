// Neighborhood.jsx
import React, { useContext, useEffect, useState } from 'react';
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import { StationContext } from './Context/StationContext';

const Neighborhood = () => {
  const { activeStation } = useContext(StationContext);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [mapRef, setMapRef] = useState(null);

  useEffect(() => {
    if (activeStation && mapRef) {
      const { lat, long } = activeStation;
      const location = { lat, lng: long };

      const request = {
        location,
        radius: 1000, // Adjust the radius as needed (in meters)
        type: 'neighborhood',
      };

      const service = new window.google.maps.places.PlacesService(mapRef);
      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          results.forEach((place) => {
            const marker = new window.google.maps.Marker({
              map: mapRef,
              position: place.geometry.location,
              title: place.name,
            });

            marker.addListener('click', () => {
              setSelectedPlace(place);
            });
          });
        }
      });
    }
  }, [activeStation, mapRef]);

  const onMapLoad = (map) => {
    setMapRef(map);
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} libraries={['places']}>
      <div>
        <h3>Neighborhood Activities</h3>
        <GoogleMap
          mapContainerStyle={{ height: '400px', width: '100%' }}
          center={activeStation ? { lat: activeStation.lat, lng: activeStation.long } : undefined}
          zoom={14}
          onLoad={onMapLoad}
        >
          {selectedPlace && (
            <InfoWindow
              position={selectedPlace.geometry.location}
              onCloseClick={() => setSelectedPlace(null)}
            >
              <div>
                <h4>{selectedPlace.name}</h4>
                <p>{selectedPlace.vicinity}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default Neighborhood;