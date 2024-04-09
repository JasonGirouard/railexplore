// TileComponent.js
import React, { useEffect } from 'react';
import { TileLayer } from 'react-leaflet';
import { useMap } from "react-leaflet";
import "mapbox-gl/dist/mapbox-gl.css";
import "mapbox-gl-leaflet";
// import { GoogleLayer } from 'react-leaflet-google-layer';


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

//MAPBOX GL

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
      style: "mapbox://styles/jasontgirouard/cluq9fhp501ea01pb59f95prz"
    });

    map.addLayer(mapboxGL);

    return () => {
      map.removeLayer(mapboxGL);
    };
  }, [map]);

  return null;
};

// const TileComponent = () => {
//   const map = useMap();

//   useEffect(() => {
//     const googleLayer = L.tileLayer('https://maps.googleapis.com/maps/api/staticmap?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&center=0,0&zoom=1&format=png&maptype=roadmap&style=feature:all%7Celement:all%7Cvisibility:on&map_id=7806aec33871baea', {
//       maxZoom: 20,
//       attribution: '&copy; Google Maps',
//     });

//     googleLayer.addTo(map);

//     return () => {
//       map.removeLayer(googleLayer);
//     };
//   }, [map]);

//   return null;
// };


// const TileComponent = () => {
//   const map = useMap();

//   useEffect(() => {
//     const googleMapsLayer = new L.GridLayer();

//     googleMapsLayer.createTile = (coords, done) => {
//       const tile = document.createElement('div');

//       const googleMapsUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${y},${x}&zoom=${coords.z}&size=256x256&maptype=roadmap&style=feature:all%7Celement:all%7Cvisibility:on&map_id=7806aec33871baea&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

//       const img = document.createElement('img');
//       img.setAttribute('src', googleMapsUrl);
//       img.setAttribute('alt', 'Google Maps Tile');
//       img.addEventListener('load', () => {
//         tile.appendChild(img);
//         done(null, tile);
//       });

//       return tile;
//     };

//     googleMapsLayer.addTo(map);

//     return () => {
//       map.removeLayer(googleMapsLayer);
//     };
//   }, [map]);

//   return null;
// };

// const TileComponent = () => {
//   console.log("🔴 Tile Layer 🔴");

//   const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
//   const mapId = '7806aec33871baea';
// //  const mapId = '687432693' kayak map id? 
//  // const apiKey = 'AIzaSyBG5-u4E7PcX7yEpoC8d2OAKOkBs-MQK6U'; kayak's api key

//   return (
//     <TileLayer
//       url={`https://www.google.com/maps/vt?pb=!1m5!1m4!1i{z}!2i{x}!3i{y}!4i256!2m3!1e0!2sm!3i${mapId}!3m12!2sen-US!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!4e0&key=${apiKey}`}
//       attribution="Map data &copy; Google"
//     />
//   );
// };

//  const mapId = '687432693' kayak map id? 
 // const apiKey = 'AIzaSyBG5-u4E7PcX7yEpoC8d2OAKOkBs-MQK6U'; kayak's api key

// const TileComponent = () => {
//   console.log("🔴 Tile Layer 🔴");

//   const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
//   const mapId = '7806aec33871baea';

//   return (
//     <>
//       <TileLayer
//         url={`https://www.google.com/maps/vt?pb=!1m5!1m4!1i{z}!2i{x}!3i{y}!4i256!2m3!1e0!2sm!3i${mapId}!3m12!2sen-US!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!4e0&key=${apiKey}&libraries=places`}
//         attribution="Map data &copy; Google"
//       />
//       <script
//         async
//         defer
//         src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`}
//       ></script>
//     </>
//   );
// };

export default TileComponent;


