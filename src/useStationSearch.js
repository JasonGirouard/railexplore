import { useState, useEffect } from 'react';
import stations from "./data/stations.json";



export const useStationSearch = (originStation, setOriginStation) => {
  const defaultStation = {
    "name": "New York, NY",
    "is_recommended": true,
    "code": "NYP",
    "city": "New York",
    "state": "NY",
    "address1": "351 West 31st Street",
    "zipcode": "10001",
    "lat": "40.7503352640001",
    "long": "-73.9944604469999",
    "Shelter": true,
    "station_type": "Station Building",
    "mode": "TRAIN",
    "description": ""
  };
  const [options, setOptions] = useState([]);
  //const [searchValue, setSearchValue] = useState(defaultStation.name);

  const handleSearch = (value) => {
    const filteredOptions = stations
      // First, filter stations to include only those with mode "TRAIN"
      .filter(station => station.mode === "TRAIN")
      // Then, further filter based on the search value
      .filter(station => station.name.toLowerCase().includes(value.toLowerCase()))
      .slice(0, 5) // Limit the results to the first 5 matches
      .map(station => ({
        value: station.name, // Assuming you use `name` as the unique identifier
        label: (
          <div className="autocomplete-option">
            <span>{station.name}</span> {/* Display the station name */}
          </div>
        ),
      }));
  
    setOptions(value ? filteredOptions : []); // Update options based on the search value
  };
  


  return { options,  handleSearch};
};
