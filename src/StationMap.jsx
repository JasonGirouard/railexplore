// StationMap.jsx
import React, { useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styled from "styled-components"; 

const MapContainerStyled = styled(MapContainer)`
  border-radius: 10px;
  overflow: hidden;
  max-width: min(511px, 100%);
  .leaflet-container {
    touch-action: none;
  }
`;

const UpdateMapCenter = ({ center }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(center);
      //map.zoomControl.remove();
      map.dragging.disable();
      map.touchZoom.disable();
      map.doubleClickZoom.disable();
      map.scrollWheelZoom.disable();
      map.boxZoom.disable();
      map.keyboard.disable();
      if (map.tap) map.tap.disable();
    }, [map, center]);
    return null;
  };
  
const StationMap = ({ activeStation }) => {
  return (
    <MapContainerStyled
      center={[activeStation.lat, activeStation.long]}
      zoom={15}
      style={{ height: "511px", width: "100%" }}
      zoomControl={false}
      dragging={false}
      doubleClickZoom={false}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
        id="mapbox/streets-v11"
        accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        attribution='Map data &copy; <a href="https://www.openstreetmap.org">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com">Mapbox</a>'
      />
      <UpdateMapCenter center={[activeStation.lat, activeStation.long]} />
      <CircleMarker
        center={[activeStation.lat, activeStation.long]}
        radius={10}
        weight ={2}
        fillOpacity={0.5}
        color="#2479e9"
        fillColor="#2479e9"
        interactive={false}
      />
    </MapContainerStyled>
  );
};

export default StationMap;