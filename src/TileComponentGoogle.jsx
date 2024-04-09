import { TileLayer } from 'react-leaflet';

const TileComponent = () => {
  // Your Google Maps API key stored in environment variables
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  // Base URL for Google Maps tile layer
  const googleMapsTileUrl = `https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&key=${googleMapsApiKey}`;

  return (
    <TileLayer
      url={googleMapsTileUrl}
      attribution='&copy; <a href="https://maps.google.com/maps">Google Maps</a>'
    />
  );
};

export default TileComponent;
