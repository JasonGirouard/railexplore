import React from "react";
import { CircleMarker, Popup, useMap } from "react-leaflet";
import placeholderImage from "./images/placeholder.png"; // Adjust the path as needed
import "./StationCircleComponent.css";

const StationCircleComponent = ({
  station,
  radius,
  onMarkerClick,
  onSeeMoreClicked,
  activeStation,
  setActiveStation,
  isSelected,
  originStation,
  destination,
  setIsPanelOpen
}) => {

  const map = useMap();

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

  // Convert HEX to RGB
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
    // If this station is the active station, make it gray
    if (activeStation && stationCode === activeStation.code) {
      return "#8D6B94"; // purple color for active station
    }

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
    // If this station is the active station, make it gray
    if (activeStation && stationCode === activeStation.code) {
      return "#8D6B94"; // purple color for active station
    }

    let color = "#AFDDFF"; // Default color

    if (destination) {
      const hours = destination.min_time / 3600; // Convert seconds to hours
      // Define your color thresholds here, removing the light blue
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

  // Function to format and display the minimum time to the destination
  const formatMinTime = (stationCode) => {
    if (!destination) return "N/A";

    const hours = Math.floor(destination.min_time / 3600);
    const minutes = Math.floor((destination.min_time % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  // Function to handle image load error
  const handleImageError = (e) => {
    e.target.src = placeholderImage; // Replace with placeholder image
  };

 
  const visualRadius = 8; // Visual radius of the marker

  return (
    <>
  
      <CircleMarker
        key={`${station.code}-${getFillColor(station.code)}`}
        center={[station.lat, station.long]}
        fillColor={getFillColor(station.code)}
    
    //    stroke={false} another way to remove the outline
       // color={null}
        // color={getOutlineColor(station.code)}

        // outline
       // color={destination  ? null : '#AFDDFF'} // if destination is not found then set the color to blue
       // weight={destination  ? 0 : 2} // if destination is not found then set weight to two

       color={(station.code === originStation.code || destination)  ? null : '#AFDDFF'}
       weight={(station.code === originStation.code || destination) ? 0 : 2}


        fillOpacity={originStation.code === station.code ? 0.9 : 0.8} // for the home station set it to .9, otherwise set it to .6
        radius={radius} // Use the getRadius function to set the radius
        //radius={visualRadius}
       // weight={2}
        eventHandlers={{
          click: (event) => {
            console.log('station: ', station)
            console.log('destination: ', destination)
            onMarkerClick(station);
            onSeeMoreClicked();
            event.target.openPopup();
          },
          mouseover: (event) => {
            event.target.openPopup();
          },
          mouseout: (event) => {
            event.target.closePopup();
          },
        }}
      >
        <Popup>
          <div className="custom-popup">
            <div className="popup-image-container">
              <img
                src={station.image_urls[0]}
                alt="Image of the city"
                onError={(e) => (e.target.src = placeholderImage)} // Fallback to placeholder image on error
              />
            </div>
            <div className="popup-content">
              <h2>{station.name}</h2>
              <div className="popup-info">
                <span>{formatMinTime(station.code)}</span>
                <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsPanelOpen(true)
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
    </>
  );
};

export default StationCircleComponent;
