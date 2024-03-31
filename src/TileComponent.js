// TileComponent.js
import React from 'react';
import { TileLayer } from 'react-leaflet';
import { useMap } from "react-leaflet";
import "mapbox-gl/dist/mapbox-gl.css";
import "mapbox-gl-leaflet";

// const TileComponent = () => {
//   console.log('🔴 Tile Layer 🔴'); // mapbox
//   return (
//     <TileLayer
//       url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
//       id="mapbox/light-v11"
//       accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
//       attribution='Map data &copy; <a href="https://www.openstreetmap.org">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com">Mapbox</a>'
//     />
//   );
// };

// export default TileComponent;


// if i need to, I can ship with a free tile that is less pretty ... openstreetmap

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

//mapbox gl 

const TileComponent = () => {
  console.log("🔴 Tile Layer 🔴");
  const map = useMap();

  React.useEffect(() => {
    const leafletMap = map.getContainer();

    const mapboxGL = window.L.mapboxGL({
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com">Mapbox</a>',
      accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
      style: "mapbox://styles/mapbox/light-v11",
    });

    map.addLayer(mapboxGL);

    return () => {
      map.removeLayer(mapboxGL);
    };
  }, [map]);

  return null;
};

export default TileComponent;