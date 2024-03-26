import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useMap } from "react-leaflet";
import L from "leaflet";

const StationTooltip = ({ station, handleMarkerClick, handleMarkerMouseOver, handleMarkerMouseOut, formatMinTime }) => {
  const map = useMap();
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (!tooltipRef.current) return;

    const tooltipElement = tooltipRef.current;
    const markerIcon = L.divIcon({
      className: "custom-tooltip-icon",
      iconSize: [0, 0],
      iconAnchor: [0, 0],
    });

    const marker = L.marker([station.lat, station.long], { icon: markerIcon }).addTo(map);

    marker.bindTooltip(tooltipElement, {
      permanent: true,
      direction: "top",
      offset: [0, -10],
      interactive: true,
    });

    tooltipElement.addEventListener("mouseover", (event) => handleMarkerMouseOver(station, event));
    tooltipElement.addEventListener("mouseout", (event) => handleMarkerMouseOut(station, event));
    tooltipElement.addEventListener("click", (event) => handleMarkerClick(station, event));

    return () => {
      marker.remove();
    };
  }, [map, station, handleMarkerClick, handleMarkerMouseOver, handleMarkerMouseOut]);

  return createPortal(
    <div ref={tooltipRef} className="custom-tooltip">
      <div className="tooltip-content">
        <h2>{station.name}</h2>
        <div className="tooltip-info">
          <span>{formatMinTime(station.city)}</span>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default StationTooltip;