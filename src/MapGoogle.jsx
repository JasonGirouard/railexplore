import React, { useState, useEffect, useContext, useRef } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { OriginContext } from "./Context/OriginContext";
import './MapComponent.css';

const mapId = '7806aec33871baea'; 

const CenterMap = () => {
    const mapRef = useRef(null); 
    const { origin } = useContext(OriginContext);

    useEffect(() => {
        if (mapRef.current && origin && origin.center.lat && origin.center.long) {
            mapRef.current.panTo({ lat: origin.center.lat, lng: origin.center.long });
        }
    }, [origin]); 

    return (
        <GoogleMap ref={mapRef}> 
            {/* Add your map components here as needed */}
        </GoogleMap>
    );
};

const MapComponentGoogle = () => {
    const { isLoaded } = useLoadScript({ googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY });
    const { origin } = useContext(OriginContext);
    const [zoomLevel, setZoomLevel] = useState(7);

    const mapContainerStyle = {
        height: '400px', 
        width: '100%',
    };

    const center = origin ? { lat: origin.center.lat, lng: origin.center.long } : { lat: 37.7749, lng: -122.4194}; 

    const options = {
        mapId: mapId,
        zoomControl: false,
        disableDefaultUI: true, 
        restriction: {
            latLngBounds: { 
                north: 83,
                south: 5,
                east: -52,
                west: -167,
            },
            strictBounds: false, 
        } 
    }

    const onLoad = (map) => {
        // You can store the map instance in a ref here if needed for other purposes
    }

    const onZoomChanged = () => {
        // Update zoomLevel state if needed
    }

    return isLoaded ? (
        <CenterMap 
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={zoomLevel}
            options={options}
            onLoad={onLoad}
            onZoomChanged={onZoomChanged}
        /> 
    ) : <div>Loading...</div>;
};

export default MapComponentGoogle;
