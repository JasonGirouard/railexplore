import { TileLayer } from 'react-leaflet';

const TileComponent = () => {
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  // Assuming 'mapId' is the correct query parameter, though this is conceptual
  const mapId = '7806aec33871baea';
  // Construct the URL with the Map ID
  // This URL structure is hypothetical and must be aligned with Google's documentation
  const googleMapsTileUrl = `https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&key=${googleMapsApiKey}&mapId=${mapId}`;

  return (
    <TileLayer
      url={googleMapsTileUrl}
      attribution='&copy; <a href="https://maps.google.com/maps">Google Maps</a>'
    />
  );
};

export default TileComponent;
