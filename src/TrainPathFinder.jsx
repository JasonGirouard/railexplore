import React, { useState, useEffect } from 'react';
import stations from "./data/stations.json";
import "./TrainPathFinder.css";

const TrainPathFinder = ({ originStation, destinationStation }) => {
  const [paths, setPaths] = useState([]);

  useEffect(() => {
    
    const fetchTrainData = async () => {
      try {
        const response = await fetch('/train_data.json');
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
    if (originStation === destinationStation) {
      const originStationName = df.find(row => row.from_station === originStation).from_station_name;
      return JSON.stringify([{
        route_names: [],
        start_time: '',
        end_time: '',
        elapsed_time: 0,
        transfers: [],
        stops: [{
          station: originStation,
          station_name: originStationName,
          route_name: '',
          train_number: '',
          arrival_time: '',
          departure_time: '',
          next_stop: null
        }]
      }]);
    }

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

    const paths = [];
    const visited = new Set();
    let pq = [[0, originStation, [], null, null, null, null]];

    while (pq.length > 0) {
      let [cost, currentStation, path, routeNames, trainNumbers, departureTimes, arrivalTimes] = pq.shift();

      if (visited.has(JSON.stringify([currentStation, arrivalTimes ? arrivalTimes[arrivalTimes.length - 1] : null]))) {
        continue;
      }

      visited.add(JSON.stringify([currentStation, arrivalTimes ? arrivalTimes[arrivalTimes.length - 1] : null]));
      path = [...path, currentStation];

      if (currentStation === destinationStation) {
        const pathInfo = {
          route_names: [...new Set(routeNames)],
          start_time: departureTimes[0].toISOString(),
          end_time: arrivalTimes[arrivalTimes.length - 1].toISOString(),
          elapsed_time: calculateElapsedTime(departureTimes[0], arrivalTimes[arrivalTimes.length - 1]),
          transfers: [],
          stops: []
        };

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

        pathInfo.stops.push({
          station: path[path.length - 1],
          station_name: graph[path[path.length - 1]][0][2],
          route_name: routeNames[routeNames.length - 1],
          train_number: trainNumbers[trainNumbers.length - 1],
          arrival_time: arrivalTimes[arrivalTimes.length - 1].toISOString(),
          departure_time: departureTimes[departureTimes.length - 1].toISOString(),
          next_stop: null
        });

        paths.push(pathInfo);
        continue;
      }

      if (graph[currentStation]) {
        for (const [neighbor, fromStationName, toStationName, routeName, trainNumber, departureTime, arrivalTime] of graph[currentStation]) {
          if (!arrivalTimes || departureTime >= arrivalTimes[arrivalTimes.length - 1]) {
            const newRouteNames = routeNames ? [...routeNames, routeName] : [routeName];
            const newTrainNumbers = trainNumbers ? [...trainNumbers, trainNumber] : [trainNumber];
            const newDepartureTimes = departureTimes ? [...departureTimes, departureTime] : [departureTime];
            const newArrivalTimes = arrivalTimes ? [...arrivalTimes, arrivalTime] : [arrivalTime];
            pq.push([cost + 1, neighbor, path, newRouteNames, newTrainNumbers, newDepartureTimes, newArrivalTimes]);
          }
        }
      }
    }

    const filteredPaths = [];
  const startTimeDict = {};
  for (const path of paths) {
    const startTime = path.start_time;
    const endTime = path.end_time;
    const elapsedTime = path.elapsed_time;

    if (new Date(endTime) > new Date(startTime)) {
      if (!startTimeDict[startTime] || elapsedTime < startTimeDict[startTime].elapsed_time) {
        startTimeDict[startTime] = {
          elapsed_time: elapsedTime,
          path: path
        };
      }
    }
  }

    for (const pathInfo of Object.values(startTimeDict)) {
      filteredPaths.push(pathInfo.path);
    }

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
          <div className="trains-title">Today's trains</div>

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
              <p>No trains scheduled today</p>
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