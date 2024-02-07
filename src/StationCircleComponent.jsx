import React from "react";
import { CircleMarker, Popup } from "react-leaflet";

const StationCircleComponent = ({
  station,
  onMarkerClick,
  onSeeMoreClicked,
  setOriginStation,
  isSelected,
  originStation

}) => {
  return (
    <CircleMarker
      key={originStation.code == station.code ? "origin" : station.code}
      center={[station.lat, station.long]}
      fillColor={
        originStation.code == station.code
          ? "#030303"
          : station.is_recommended
          ? "#f5f21d"
          : "#357ebd"
      }
      color={
        originStation.code == station.code
          ? "#030303"
          : station.is_recommended
          ? "#f5f21d"
          : "#357ebd"
      }
      fillOpacity={originStation.code == station.code ? 0.9 : 0.5}
      radius={8}
      weight={2}
      eventHandlers={{
        click: () => {
          onMarkerClick(station); // This should call the function passed as prop
        },
      }}
    >
      <Popup>
        <div className="custom-popup">
          <div className="popup-image-container">
            <img src="https://picsum.photos/300/200" alt="Random Image" />
          </div>
          <div className="popup-content">
            <h2>{station.name}</h2>
            <div className="popup-info">
              <span>2.5 hr  •</span>  <span> 75 mi</span>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onSeeMoreClicked();
                }}
                className="popup-link see-more"
              >
                see more
              </a>
             
            </div>
          </div>
        </div>
      </Popup>
    </CircleMarker>
  );
};

export default StationCircleComponent;
