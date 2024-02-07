// CardComponent.js
import React from 'react';
import { useMap } from 'react-leaflet'
import { Card } from 'antd';
import { CloseOutlined } from '@ant-design/icons'; // Import CloseOutlined icon
import routes from "./routes.json";

const CardComponent = ({ selectedStation , onClose }) => {
  if (!selectedStation) return null; 
 return (
    <Card
      title={selectedStation.name}
      extra={<CloseOutlined onClick={onClose} style={{ cursor: 'pointer' }} />}
      style={{
        position: 'absolute',
        zIndex: 1000,
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: '20%',
      }}
    >
      <p>Code: {selectedStation.code}</p>
      <p>Latitude: {selectedStation.lat}</p>
      <p>Longitude: {selectedStation.long}</p>
      {/* Additional details */}
    </Card>
  );
};

export default CardComponent;