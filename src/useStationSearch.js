import { useState, useEffect } from 'react';
import stations from "./stations.json";

export const useStationSearch = (originStation, setOriginStation) => {
  const [options, setOptions] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (originStation) {
      setSearchValue(originStation.name); // Update the displayed value when originStation changes
    }
  }, [originStation]);

  const handleSearch = (value) => {
    setSearchValue(value); // Update searchValue as user types
    const filteredOptions = stations
      .filter(station => station.name.toLowerCase().includes(value.toLowerCase()))
      .slice(0, 5)
      .map(station => ({
        value: station.name,
        label: (
          <div className="autocomplete-option">
            <span>{station.name}</span>
          </div>
        ),
      }));

    setOptions(value ? filteredOptions : []);
  };

  const onSelect = (value) => {
    const station = stations.find(station => station.name === value);
    setOriginStation(station); // Update originStation upon selection
  };

  return { options, searchValue, handleSearch, onSelect };
};
