import React, { useState, useEffect, useContext } from 'react';
import stations from "./data/stations.json";
import { OriginStationContext } from "./Context/OriginStationContext";
import "./TrainPathFinder.css";

const TrainPathFinder = ({ origin, destination, dist , distSeconds}) => {
  const [paths, setPaths] = useState([]);
  const { selectedStationDestinations } = useContext(OriginStationContext);
  const originStation = origin.code;
  const destinationStation = destination.code;

  const distSeconds2 = destinationStation && selectedStationDestinations
      ? selectedStationDestinations[destinationStation]
      : 0;


  useEffect(() => {
    
    const fetchTrainData = async () => {
      try {
      //  const response = await fetch('/train_data.json');
      const response = await fetch('https://traingang.s3.amazonaws.com/trains_data_most_recent.json');
    //  const response = await fetch('/trains_data_p2.json');
     //   const response = await fetch('/trains_data_p7.json');
       // const response = await fetch('https://traingang.s3.amazonaws.com/trains_data_p7.json');
        const df = await response.json();
        const calculatedPaths = dijkstra(originStation, destinationStation, df);
        setPaths(JSON.parse(calculatedPaths));
      } catch (error) {
        console.error('Error fetching train data:', error);
      }
    };

    fetchTrainData();
  }, [originStation, destinationStation]);

  function calculateElapsedTime(startTime, endTime) {
    const elapsedTime = endTime - startTime;
    return elapsedTime;
  }

  function dijkstra(originStation, destinationStation, df) {
    // If the origin and destination stations are the same, return a single stop path
    // with no route names, transfer information, and zero elapsed time
    // if (originStation === destinationStation) {
    //   const originStationName = df.find(row => row.from_station === originStation).from_station_name;
    //   return JSON.stringify([{
    //     route_names: [],
    //     start_time: '',
    //     end_time: '',
    //     elapsed_time: 0,
    //     transfers: [],
    //     stops: [{
    //       station: originStation,
    //       station_name: originStationName,
    //       route_name: '',
    //       train_number: '',
    //       arrival_time: '',
    //       departure_time: '',
    //       next_stop: null
    //     }]
    //   }]);
    // }
  
    // Build the graph from the DataFrame
    // Create an adjacency list representation of the graph
    // Each station is a key in the graph object, and the value is an array of its neighboring stations
    // Along with the neighboring station, store the route name, train number, departure time, and arrival time
    const graph = {};
    for (const row of df) {
      const fromStation = row.from_station;
      const toStation = row.to_station;
      const fromStationName = row.from_station_name;
      const toStationName = row.to_station_name;
      const routeName = row.from_route;
      const trainNumber = row.train_number;
      const departureTime = new Date(row.departure);
      const arrivalTime = new Date(row.arrival);
  
      if (!graph[fromStation]) {
        graph[fromStation] = [];
      }
      graph[fromStation].push([toStation, fromStationName, toStationName, routeName, trainNumber, departureTime, arrivalTime]);
    }
  
    // Initialize variables for Dijkstra's algorithm
    // paths: an array to store all the valid paths from origin to destination
    // visited: a set to keep track of visited stations and their arrival times to avoid revisiting the same station at the same time
    // pq: a priority queue to store the stations to visit, initialized with the origin station
    const paths = [];
    const visited = new Set();
    let pq = [[0, originStation, [], null, null, null, null]];
  
    // Run Dijkstra's algorithm
    while (pq.length > 0) {
      // Extract the station with the lowest cost from the priority queue
      let [cost, currentStation, path, routeNames, trainNumbers, departureTimes, arrivalTimes] = pq.shift();
  
      // Skip if the current station and arrival time combination has already been visited
      // This is to avoid revisiting the same station at the same time and prevent infinite loops
      if (visited.has(JSON.stringify([currentStation, arrivalTimes ? arrivalTimes[arrivalTimes.length - 1] : null]))) {
        continue;
      }
  
      // Mark the current station and arrival time combination as visited
      visited.add(JSON.stringify([currentStation, arrivalTimes ? arrivalTimes[arrivalTimes.length - 1] : null]));
      path = [...path, currentStation];
  
      // If the current station is the destination, construct the path information and add it to the paths array
      if (currentStation === destinationStation) {
        const pathInfo = {
          route_names: [...new Set(routeNames)], // Remove duplicate route names
          start_time: departureTimes[0].toISOString(),
          end_time: arrivalTimes[arrivalTimes.length - 1].toISOString(),
          elapsed_time: calculateElapsedTime(departureTimes[0], arrivalTimes[arrivalTimes.length - 1]),
          transfers: [],
          stops: []
        };
  
        // Construct the stop information for each station in the path
        for (let i = 0; i < path.length - 1; i++) {
          const stopInfo = {
            station: path[i],
            station_name: graph[path[i]][0][1],
            route_name: routeNames[i],
            train_number: trainNumbers[i],
            arrival_time: arrivalTimes[i].toISOString(),
            departure_time: departureTimes[i].toISOString(),
            next_stop: path[i + 1]
          };
          pathInfo.stops.push(stopInfo);
  
          // Add transfer information if there is a route change between the current and next station
          if (i < routeNames.length - 1 && routeNames[i] !== routeNames[i + 1]) {
            pathInfo.transfers.push({
              station: path[i + 1],
              station_name: graph[path[i + 1]][0][2],
              arrival_time: arrivalTimes[i].toISOString(),
              departure_time: departureTimes[i + 1].toISOString(),
              layover_time: calculateElapsedTime(arrivalTimes[i], departureTimes[i + 1])
            });
          }
        }
  
        // Add the destination station information to the stops array
        pathInfo.stops.push({
          station: path[path.length - 1],
          station_name: graph[path[path.length - 1]][0][2],
          route_name: routeNames[routeNames.length - 1],
          train_number: trainNumbers[trainNumbers.length - 1],
          arrival_time: arrivalTimes[arrivalTimes.length - 1].toISOString(),
          departure_time: departureTimes[departureTimes.length - 1].toISOString(),
          next_stop: null
        });
  
        // Check if the elapsed time of the path is at most 30% greater than distSeconds
  const elapsedTimeSeconds = pathInfo.elapsed_time / 1000; // Convert milliseconds to seconds
  const maxAllowedTime = distSeconds2 * 1.40; // Calculate the maximum allowed time (40% greater than distSeconds)
//console.log('elapsedTimeSeconds', elapsedTimeSeconds, 'maxallowed:',maxAllowedTime)
  if (elapsedTimeSeconds <= maxAllowedTime) {
  //  console.log('PATH FOUND:', pathInfo);
    paths.push(pathInfo);
  }

  continue;
      }
  
    //  Explore the neighbors of the current station
      if (graph[currentStation]) {
        for (const [neighbor, fromStationName, toStationName, routeName, trainNumber, departureTime, arrivalTime] of graph[currentStation]) {
          // Only consider the neighbor if its departure time is later than or equal to the current station's arrival time
          if (!arrivalTimes || departureTime >= arrivalTimes[arrivalTimes.length - 1]) {
            const newRouteNames = routeNames ? [...routeNames, routeName] : [routeName];
            const newTrainNumbers = trainNumbers ? [...trainNumbers, trainNumber] : [trainNumber];
            const newDepartureTimes = departureTimes ? [...departureTimes, departureTime] : [departureTime];
            const newArrivalTimes = arrivalTimes ? [...arrivalTimes, arrivalTime] : [arrivalTime];
            pq.push([cost + 1, neighbor, path, newRouteNames, newTrainNumbers, newDepartureTimes, newArrivalTimes]);
          }
        }
      }

      // only direct 

      // Explore the neighbors of the current station
// if (graph[currentStation]) {
//   for (const [neighbor, fromStationName, toStationName, routeName, trainNumber, departureTime, arrivalTime] of graph[currentStation]) {
//     // Only consider the neighbor if its departure time is later than or equal to the current station's arrival time
//     // and the route name is the same as the current station's route name
//     if ((!arrivalTimes || departureTime >= arrivalTimes[arrivalTimes.length - 1]) && routeName === (routeNames ? routeNames[routeNames.length - 1] : null)) {
//       const newRouteNames = routeNames ? [...routeNames, routeName] : [routeName];
//       const newTrainNumbers = trainNumbers ? [...trainNumbers, trainNumber] : [trainNumber];
//       const newDepartureTimes = departureTimes ? [...departureTimes, departureTime] : [departureTime];
//       const newArrivalTimes = arrivalTimes ? [...arrivalTimes, arrivalTime] : [arrivalTime];
//       pq.push([cost + 1, neighbor, path, newRouteNames, newTrainNumbers, newDepartureTimes, newArrivalTimes]);
//       console.log([cost + 1, neighbor, path, newRouteNames, newTrainNumbers, newDepartureTimes, newArrivalTimes])
//     }
//   }
//}

    }
  
    // Filter paths to keep only the ones with the earliest start time and shortest elapsed time for each unique start time
    const filteredPaths = [];
    const startTimeDict = {};
    for (const path of paths) {
      const startTime = path.start_time;
      const endTime = path.end_time;
      const elapsedTime = path.elapsed_time;
      const transfers = path.transfers;
    //  console.log('path:',path)
  
      // Only consider paths where the end time is later than the start time
     // if (new Date(endTime) > new Date(startTime)) {
        if (new Date(endTime) > new Date(startTime) && transfers.length === 0) {
        // If the start time is not in the dictionary or the current path has a shorter elapsed time,
        // update the dictionary with the current path
        if (!startTimeDict[startTime] || elapsedTime < startTimeDict[startTime].elapsed_time) {
          startTimeDict[startTime] = {
            elapsed_time: elapsedTime,
            path: path
          };
        }
      }
    }
  
    // Add the filtered paths to the result array
    for (const pathInfo of Object.values(startTimeDict)) {
      filteredPaths.push(pathInfo.path);
    }
  
    // Return the filtered paths as a JSON string with proper indentation
    return JSON.stringify(filteredPaths, null, 2);
  }
  //end of dijkstra's 

   // Function to format the time in the cards
   const formatTime = (timeString) => {
    if (typeof timeString !== "string") {
      console.error("Invalid timeString:", timeString);
      return "";
    }

    const date = new Date(timeString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const formatDate = (timeString) => {
    if (typeof timeString !== "string") {
      console.error("Invalid timeString:", timeString);
      return "";
    }
  
    const date = new Date(timeString);
    const month = date.getMonth() + 1; // Month is zero-indexed, so we add 1
    const day = date.getDate();
    return `${month}/${day}`;
  };

  const formatDayOfWeek = (timeString) => {
    if (typeof timeString !== "string") {
      console.error("Invalid timeString:", timeString);
      return "";
    }
  
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const date = new Date(timeString);
    const dayIndex = date.getDay();
    return daysOfWeek[dayIndex];
  };

 // Function to format the elapsed time (in milliseconds)
const formatElapsedTime = (totalMilliseconds) => {
    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };



// Function to get the station name from the station code
const getStationName = (stationCode) => {
  
    const station = stations.find((station) => station.code === stationCode);
    return station ? station.name : "";
  };

  return (
    <div>
      {originStation !== destinationStation && (
        <div className="trains-container">
          <div className="trains-title"> Trains </div>
          <div>
  {origin.code} → {destination.code} is typically {dist}.
  {paths.length > 0 ? (
    " Today's trains are shown below. For complete schedules, visit Amtrak below."
  ) : (
    " For complete schedules, visit Amtrak below."
  )}
</div>

          {/* <div className="trains-title">{origin.name} →{" "} {destination.name}</div> */}
          {/* <div>Recent trains. For a full set of trains, view those on Amtrak.com </div> */}

          {paths ? (
            paths.length > 0 ? (
              paths
                .sort((a, b) => a.elapsed_time - b.elapsed_time)
                .map((path, index) => (
                  <div key={index} className="card">
                    <div className="card-header">
                      <span className="route-names">
                        {path.route_names.join(", ")}
                      </span>
                    </div>
                    <div className="card-body">
                      
                      <div className="time-range">
                        <div className="date"> 
                        {formatDate(path.start_time)}{" "}
                        {formatDayOfWeek(path.start_time)}
                        </div>

                        {formatTime(path.start_time)} -{" "}
                        {formatTime(path.end_time)}
                      </div>
                      <div className="transfers">
                        {path.transfers.length === 0 ? (
                          "nonstop"
                        ) : (
                          <span className="tooltip">
                            {path.transfers.length} stop
                            <span className="tooltiptext">
                              {path.transfers.map((transfer) => (
                                <div key={transfer.station}>
                                  {formatElapsedTime(transfer.layover_time)} at{" "}
                                  {getStationName(transfer.station)}
                                </div>
                              ))}
                            </span>
                          </span>
                        )}
                      </div>
                      <div className="elapsed-time">
                        {formatElapsedTime(path.elapsed_time)}
                      </div>
                    </div>
                  </div>
                ))
            ) : (
               <p></p>
            )
          ) : (
            <p>Loading paths...</p>
          )}

          
        </div>
      )}
    </div>
  );
};

export default TrainPathFinder;