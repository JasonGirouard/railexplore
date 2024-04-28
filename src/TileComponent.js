// TileComponent.js
import React from 'react';
import { TileLayer } from 'react-leaflet';
import { useMap } from "react-leaflet";
import "mapbox-gl/dist/mapbox-gl.css";
import "mapbox-gl-leaflet";



//MAPBOX GL, first option given efficient loads 
const TileComponent = () => {
 // console.log("🔴 Tile Layer 🔴");
  const map = useMap();

  React.useEffect(() => {
    const leafletMap = map.getContainer();

    const mapboxGL = window.L.mapboxGL({
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com">Mapbox</a>',
      accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
      style: "mapbox://styles/jasontgirouard/cluq9fhp501ea01pb59f95prz"
    });

    map.addLayer(mapboxGL);

    return () => {
      map.removeLayer(mapboxGL);
    };
  }, [map]);

  return null;
};

// THUNDERFOREST second option 150k free, 1.5 mil is $100/month
// const TileComponent = () => {
//   console.log('🔴 Tile Layer 🔴'); // Thunderforest Atlas
//   return (
//     <TileLayer
//     apiKey={process.env.REACT_APP_THUNDERFOREST_API_KEY}
//       url="https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey={apiKey}"
//       attribution='Map data &copy; <a href="https://www.openstreetmap.org">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.thunderforest.com">Thunderforest</a>'
//     />
//   );
// };

//MAP TILER, 100k free? unclear. This is might be the last option. 
// const TileComponent = () => {
//   console.log('🔴 Tile Layer 🔴'); // Maptiler streets-v2
//   return (
//     <TileLayer
//       url="https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key={apiKey}"
//       apiKey={process.env.REACT_APP_MAPTILER_API_KEY}
//       attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
//     />
//   );
// };

// EMERGENCY ONLY: default 100% free google map in an emergency 
// const TileComponent = () => {
//   console.log("🔴 Tile Layer 🔴");

//   return (
//     <TileLayer
//       url={`https://www.google.com/maps/vt?pb=!1m5!1m4!1i{z}!2i{x}!3i{y}!4i256!2m3!1e0!2sm!3i!3m12!2sen-US!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!4e0`}
//       attribution="Map data &copy; Google"
//     />
//   );
// };

// OPEN STREET MAP, LAST OPTION
// // TileComponent.js
// import React from 'react';
// import { TileLayer } from 'react-leaflet';

// const TileComponent = () => {
//   return (
//     <TileLayer
//       url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
//       attribution='&copy; <a href="https://www.openstreetmap.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
//     />
//   );
// };

//  export default TileComponent;


export default TileComponent;


