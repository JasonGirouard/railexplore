// Routes.js
import React from "react";
import { List, Card, Tag } from "antd";

const Routes = ({
  originStation,
  destinationStation,
  calculatedRoutes,
  calculatedRoutesWT,
}) => {
  // Merge both lists of routes and mark them for display
  const combinedRoutes = [
    ...calculatedRoutes.map((route) => ({ ...route, direct: true })),
    ...calculatedRoutesWT.map((route) => ({ ...route, direct: false })),
  ];

  //note that scheduled and/or estimate may be null; it'd be best to coalesce them.

  const formatTime = (timeString) => {
    const time = new Date(timeString);
    return time
      .toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .toLowerCase();
  };

  // Function to calculate the time elapsed between two ISO 8601 timestamps
  const calculateElapsedTime = (departure, arrival) => {
    if (!departure || !arrival) {
      return "0h 59m"; // Return null if either time is missing
    }
    // Parse the ISO 8601 formatted departure and arrival times
    const departureDate = new Date(departure);
    const arrivalDate = new Date(arrival);
    // Calculate the difference in milliseconds
    const difference = arrivalDate - departureDate;
    // Convert milliseconds to hours and minutes
    const hours = Math.floor(difference / 1000 / 60 / 60);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    // Format the result as "4h 1m"
    return `${hours}h ${minutes}m`;
  };
  return (
    <div className="routes-list">
    {combinedRoutes.map((item, index) => (
      <div key={index} className="route-card">
        <div className="route-upper-level">
          <h3 className="route-title">{item.routeName}</h3>
        </div>
        <div className="route-lower-level">
          <div className="route-details">
            <span className="route-time">
              {formatTime(item.departureScheduled)} - {formatTime(item.arrivalScheduled)}
            </span>
            {item.direct ? (
              <span className="route-nonstop">nonstop</span>
            ) : (
              <span className="route-stops">{`${item.transferPoints.length} stop${item.transferPoints.length > 1 ? 's' : ''}`}</span>
            )}
            <span className="route-duration">
              {calculateElapsedTime(item.departureScheduled, item.arrivalScheduled)}
            </span>
          </div>
        </div>
      </div>
    ))}
  </div>
  );
};

export default Routes;
