import React, { useContext, useEffect, useState, Fragment } from "react";
import { StationContext } from "./Context/StationContext";
import { OriginStationContext } from "./Context/OriginStationContext";
import { FiltersContext } from "./Context/FiltersContext";
import { CircleMarker, Popup, Tooltip, useMap,useMapEvents } from "react-leaflet";
import StationTooltip from "./StationToolTip";
import { StarFilled } from "@ant-design/icons";
import Plausible from 'plausible-tracker';
import stationSummary from "./data/all_stations_paths.json";
import "./StationCircleComponent.css";

const StationCircleComponent = ({ station, radius }) => {
  // note that, here, station is just the individual station from the stations.json
  const { activeStation, setActiveStation, setIsPanelOpen } =
    useContext(StationContext);
  const { duration, destinationType } = useContext(FiltersContext);
  const { originStation, selectedStationDestinations } =
    useContext(OriginStationContext);

  const map = useMap();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 770);
  const [mapZoom, setMapZoom] = useState(map.getZoom());
  const [mapMoved, setMapMoved] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  

  // find the distance associated with this specific station.
  const destination = selectedStationDestinations?.destinations.find(
    (d) => d.destination_station === station.code
  );

   //handle click away from a selected station...it works, but it also rerenders the circles at a high rate
   useMapEvents({
    click: (event) => {
      if (!event.originalEvent.target.closest('.leaflet-interactive')) {
        setActiveStation(null);
        setIsPanelOpen(false);
      }
    },
  });


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 770);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleZoomEnd = () => {
      setMapZoom(map.getZoom());
    };

    const handleMoveEnd = () => {
      setMapMoved((prevState) => !prevState);
    };

    map.on("zoomend", handleZoomEnd);
    map.on("moveend", handleMoveEnd);

    return () => {
      map.off("zoomend", handleZoomEnd);
      map.off("moveend", handleMoveEnd);
    };
  }, [map]);

  const isStationInBounds = React.useMemo(() => {
    const bounds = map.getBounds();
    const latLng = [station.lat, station.long];
    return bounds.contains(latLng);
  }, [map, station.lat, station.long, mapMoved]);

  const handleMarkerClick = (station, event) => {
    setActiveStation(station);
    setIsPanelOpen(true);
     // Track the marker click event with Plausible
     Plausible({
      domain: 'yourdomain.com',
    })('Marker Clicked', {
      props: {
        station_name: station.name,
      },
    });

  };

  // Utility function to interpolate between two colors
  function interpolateColor(color1, color2, factor) {
    if (arguments.length < 3) {
      factor = 0.5;
    }
    var result = color1.slice();
    for (var i = 0; i < 3; i++) {
      result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
    }
    return result;
  }
  // Convert HEX to RGBimport React, { useEffect } from 'reimport React, { useEffect } from 'react';act';
  function hexToRgb(hex) {
    var r = 0,
      g = 0,
      b = 0;
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    }
    return [r, g, b];
  }
  // Convert RGB to HEX
  function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
  const getFillColor = (stationCode) => {
    let color = "#FFFFFF"; // Default color
   
    if (destination) {
      const hours = destination.min_time / 3600; // Convert seconds to hours
      const colors = [
        //0 to 2 solid dark blue
        { hours: 0, color: hexToRgb("#008DF3") },
        { hours: 2, color: hexToRgb("#008DF3") },
        // 2 to 4 fade from dark blue to light blue
        { hours: 4, color: hexToRgb("#AFDDFF") }, // light blue
        //4 to 6 solid light blue
        { hours: 6, color: hexToRgb("#AFDDFF") }, // light blue
        // 6 to 10 fade from light blue to light gray
        { hours: 6, color: hexToRgb("#AFDDFF") },
        { hours: 10, color: hexToRgb("#bfbfbf") }, // Light gray
      ];
      // Find the current segment
      for (let i = 0; i < colors.length - 1; i++) {
        if (hours >= colors[i].hours && hours < colors[i + 1].hours) {
          const factor =
            (hours - colors[i].hours) / (colors[i + 1].hours - colors[i].hours);
          color = rgbToHex(
            ...interpolateColor(colors[i].color, colors[i + 1].color, factor)
          );
          break;
        }
      }
      // If hours >= last threshold, use the last color
      if (hours >= colors[colors.length - 1].hours) {
        color = rgbToHex(...colors[colors.length - 1].color);
      }
    }
    if (originStation && originStation.code === stationCode) {
      color = "#353535"; // Override color for the origin station
    }

    return color;
  };

const getOutlineColor = (stationCode) => {
  if (activeStation && stationCode === activeStation.code) {
    return "#000000";
  } else if (destination) {
    return null;
  } else {
    return "#AFDDFF";
  }
}

const getOutlineWeight = (stationCode) => {
  if (activeStation && stationCode === activeStation.code) {
    return 0;
  } else if (destination) {
    return 0;
  } else {
    return 2;
  }
};

  // Function to format and display the minimum time to the destination
  const formatMinTime = (stationCode) => {
    if (!destination) return "N/A";
    const hours = Math.floor(destination.min_time / 3600);
    const minutes = Math.floor((destination.min_time % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const shouldOpenPopup = (tourismTier, zoomLevel) => {
    if (tourismTier === 4) return true;
    if (tourismTier === 3 && zoomLevel > 7) return true;
    if (tourismTier === 2 && zoomLevel > 8) return true;
    if (tourismTier === 1 && zoomLevel > 9) return true;
    return false;
  };

  if (!originStation || !selectedStationDestinations) {
    return null;
  }

  if ( (duration && destination && destination.min_time / 3600 > duration) || (duration && duration<1000 && !destination)) { 
    return null; 
  }

  if (
    destinationType &&
    destinationType === "Popular" &&
    station.tourism_tier < 4
  ) {
    return null;
  }
  const isSelected = activeStation && activeStation.code === station.code;

  return (
    <>
      {isStationInBounds && (
        <CircleMarker
          key={`${station.code}-${getFillColor(station.code)}-${isSelected}`}
          center={[station.lat, station.long]}
          fillColor={getFillColor(station.code)}
          color={getOutlineColor(station.code)}
          weight={getOutlineWeight(station.code)}
          fillOpacity={originStation.code === station.code ? 0.9 : 0.8}
          radius={radius}
          eventHandlers={{
            click: (event) => handleMarkerClick(station, event),
            mouseover: () => setShowTooltip(true),
            mouseout: () => setShowTooltip(false),
          }}
        >
          {station.code === originStation.code ? (
             <Tooltip
             permanent
             direction="top"
             interactive
             className={`${isSelected ? "selected" : ""}`}
           >
              <div className="custom-tooltip origin">
                <div className="tooltip-content origin">
                  <h2><StarFilled /></h2>
                  
                </div>
              </div>
            </Tooltip>
          ) : (
            (shouldOpenPopup(station.tourism_tier, mapZoom) || (showTooltip ) || isSelected) && (
              <Tooltip
                permanent
                direction="top"
                interactive
                className={`${isSelected ? "selected" : ""}`}
                offset={[0, 0]}
              >
                <div className="custom-tooltip">
                  <div className="tooltip-content">
                    <h2>{station.city}</h2>
                    <div className="tooltip-info">
                      <span>{formatMinTime(station.code)}</span>
                    </div>
                  </div>
                </div>
              </Tooltip>
            )
          )}
        </CircleMarker>
      )}
    </>
  );
};

export default StationCircleComponent;
