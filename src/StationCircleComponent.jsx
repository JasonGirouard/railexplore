import React, { useContext, useEffect, useState } from 'react';
import { StationContext } from "./Context/StationContext";
import { OriginStationContext } from './Context/OriginStationContext';
import { CircleMarker, Popup , useMap} from "react-leaflet";
import placeholderImage from "./images/placeholder.png";
import stationSummary from "./data/all_stations_paths.json";
import "./StationCircleComponent.css";

const StationCircleComponent = ({
  station,
  radius
}) => {
  // note that, here, station is just the individual station from the stations.json 
  const { activeStation, setActiveStation, setIsPanelOpen } = useContext(StationContext);
  const { originStation, selectedStationDestinations } = useContext(OriginStationContext)
 

  const map = useMap();

   // this is necessary to re-render the map
  //  useEffect(() => {
  //   setSelectedStationDestinations(
  //     stationSummary.find(
  //       (entry) => entry.origin_station === originStation.code
  //     )
  //   );
  // }, [originStation]);

  // WRITE THE VALUES TO LOCAL STORAGE AS THEY CHANGE
  // useEffect(() => {

  //   if (originStation) {
  //       setSelectedStationDestinations(
  //     stationSummary.find(
  //       (entry) => entry.origin_station === originStation.code
  //     )
  //   );
  //   }
  // }, [originStation]);

  // useEffect(() => {
  //   console.log('attempting a re-render of station circle...orign station:',originStation,'selectedStationDestination:',selectedStationDestinations)
  //   // This effect will run whenever originStation or selectedStationDestinations change
  //   // You can perform any necessary updates or side effects here
  // }, [originStation, selectedStationDestinations]);


  // find the distance associated with this specific station. 
  const destination = selectedStationDestinations?.destinations.find(
    (d) => d.destination_station === station.code
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth < 770);

    useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 770);
    };
  
    window.addEventListener("resize", handleResize);
  
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

const handleMarkerClick = (station, event) => {
        event.target.openPopup();
        // desktop only
        if (!isMobile) {
         // open the info panel
         setActiveStation(station)
         setIsPanelOpen(true)
        }
  };

const handleMarkerMouseOver = (station, event) => {
    // only for desktop
    if (!isMobile) {
      event.target.openPopup();
   //   setActiveStation(station);
    }
  };

  const handleMarkerMouseOut = (station, event) => {
    if (!isMobile) {
      event.target.closePopup();
   //   setActiveStation(station);
    }
  };
  const handleSeeMoreClick = () => {
    if (isMobile) {
      setActiveStation(station)
      setIsPanelOpen(true);
      //onSeeMoreClicked();
    }
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
  // Function to format and display the minimum time to the destination
  const formatMinTime = (stationCode) => {
    if (!destination) return "N/A";
    const hours = Math.floor(destination.min_time / 3600);
    const minutes = Math.floor((destination.min_time % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  if (!originStation ) {
    return null; // Render nothing if originStation is undefined
  }

  if (!selectedStationDestinations ) {
    return null; // Render nothing if originStation is undefined
  }

  return (
    <>
      <CircleMarker
        key={`${station.code}-${getFillColor(station.code)}`}
        center={[station.lat, station.long]}
        fillColor={getFillColor(station.code)}
        color={station.code === originStation.code || destination ? null : "#AFDDFF"}
        weight={station.code === originStation.code || destination ? 0 : 2}
        fillOpacity={originStation.code === station.code ? 0.9 : 0.8}
        radius={radius}
        eventHandlers={{
          click: (event) => {
            handleMarkerClick(station, event);
          },
          mouseover: (event) => {
            handleMarkerMouseOver(station, event)
          },
          mouseout: (event) => {
            handleMarkerMouseOut(station, event)
          },
        }}
      >
        <Popup autoPan={false}>
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

                {isMobile && (
                <a href="#" onClick={handleSeeMoreClick} className="popup-link see-more">
                  see more
                </a>
              )}
              </div>
            </div>
          </div>
        </Popup>
      </CircleMarker>
    </>
  );
};

export default StationCircleComponent;
