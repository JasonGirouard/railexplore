const calculateRoutesBetweenStations = (routes, originStationCode, destinationStationCode) => {
    const validRoutes = [];
  
    // Iterate over each route in the provided list of routes.
    routes.forEach((route) => {
      // For each route, iterate over each train within that route.
      route.trains.forEach((train) => {
        // Find the index of the origin station in the list of stations for the current train.
        // The findIndex method returns the index of the first element in the array that satisfies the provided testing function.
        // If no elements satisfy the testing function, findIndex returns -1.
        const originIndex = train.stations.findIndex(
          (station) => station.code === originStationCode
        );
  
        // Similarly, find the index of the destination station in the list of stations for the current train.
        const destinationIndex = train.stations.findIndex(
          (station) => station.code === destinationStationCode
        );
  
        // Check if both the origin and destination stations are found within the current train's route
        // and that the origin station comes before the destination station in the route's sequence.
        if (
          originIndex !== -1 &&
          destinationIndex !== -1 &&
          originIndex < destinationIndex
        ) {
          // Extract the scheduled departure time at the origin station.
          const departureScheduled = train.stations[originIndex].departureScheduled;
          // Extract the scheduled arrival time at the destination station.
          const arrivalScheduled = train.stations[destinationIndex].arrivalScheduled;
  
          // If the conditions are met, add an object describing the valid route to the validRoutes array.
          // This object includes the route's name and the train's number, providing a way to identify the specific train on the route.
          validRoutes.push({
            routeName: route.route,
            trainNumber: train.number,
            departureScheduled: departureScheduled, // Scheduled departure time at the origin station.
            arrivalScheduled: arrivalScheduled, // Scheduled arrival time at the destination station.
            // You can include additional details here as needed, such as departure times, arrival times, etc.
          });
        }
      });
      
    });
   // console.log(validRoutes);
    return validRoutes;
  };
  
  const calculateRoutesWithTransfers = (
    routes,
    originStationCode,
    destinationStationCode
  ) => {
    const allRoutes = [];
    // First, calculate direct routes as before
    const directRoutes = calculateRoutesBetweenStations(
      routes,
      originStationCode,
      destinationStationCode
    );
  
    let transferRoutes = [];
    
    // Identify potential transfer stations - this is a simplified version
    const potentialTransfers = routes.flatMap(route => route.trains.flatMap(train => train.stations)).filter((station, index, self) =>
      self.findIndex(t => t.code === station.code) === index // Unique stations only
    );
  
    // For each potential transfer, calculate routes from origin to transfer and transfer to destination
    potentialTransfers.forEach(transferStation => {
      const toTransferRoutes = calculateRoutesBetweenStations(
        routes,
        originStationCode,
        transferStation.code
      );
      const fromTransferRoutes = calculateRoutesBetweenStations(
        routes,
        transferStation.code,
        destinationStationCode
      );
  
      // Combine routes with valid transfer times
      toTransferRoutes.forEach(toTransfer => {
        fromTransferRoutes.forEach(fromTransfer => {
          // Ensure there's enough transfer time, etc. - this logic needs to be defined
          // For simplicity, assuming all transfers are valid
          transferRoutes.push({
            toTransferRoute: toTransfer,
            transferStation: transferStation,
            fromTransferRoute: fromTransfer
          });
        });
      });
    });
  
    // Combine direct and transfer routes -- for now I'll keep them separate for debugging
  //  const allRoutes = directRoutes.concat(transferRoutes);
  
    return allRoutes;
  };
  
  export { calculateRoutesBetweenStations, calculateRoutesWithTransfers };