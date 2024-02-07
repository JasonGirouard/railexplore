import React, { useState, useEffect } from "react";
import "./App.css";
import { AutoComplete, Input, Form, Button } from "antd";
import MapComponent from "./MapComponent";
import stations from "./stations.json";
import routes from "./routes.json";
import InfoPanel from "./InfoPanel";
import { useStationSearch } from "./useStationSearch";
import { openInfoPanel, closeInfoPanel } from "./InfoPanelCalcs";



function App() {

  const [originStation, setOriginStation] = useState(null);
  const [coords, setCoords] = useState([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [activeStation, setActiveStation] = useState(null);
  const [calculatedRoutes, setCalculatedRoutes] = useState([]);
  const [calculatedRoutesWT, setCalculatedRoutesWT] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true); // New state to track the initial load
  const [inputValue, setInputValue] = useState(""); // Local state for managing input value
  const { options, searchValue, handleSearch, onSelect } = useStationSearch(
    originStation,
    setOriginStation
  );

  useEffect(() => {
    if (originStation) {
      setCoords([originStation.lat, originStation.long]);
      setOriginStation(originStation);
      // Additional logic for handling initial load...
    }
  }, [originStation]);

  useEffect(() => {
    // Update the input value when originStation changes
    setInputValue(originStation ? originStation.name : "");
  }, [originStation]);

   // Adjust onSelect to update inputValue as well
   const handleSelect = (value, option) => {
    onSelect(value, option); // Assuming onSelect updates originStation
    setInputValue(option.label.props.children); // Directly set the input value to the selected label
  };


  const toggleMapVisibility = () => {
    if (initialLoad) {
      setShowMap(true);
      setInitialLoad(false);
    } else {
    }
  };

  return (
    <div className="App">
      <div className="origin-button">
        <Form  autoComplete="off">
          <Form.Item label="Station" name="station">
            <AutoComplete
           
              options={options}
              value={inputValue}
              onSelect={handleSelect}
              onSearch={handleSearch}
              placeholder="Type your local station name"
              style={{ width: 200 }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              onClick={toggleMapVisibility}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      {showMap && (
        <MapComponent
          coords={coords}
          onSeeMoreClicked={(station) =>
            openInfoPanel(
              station,
              originStation,
              routes,
              setCalculatedRoutes,
              setCalculatedRoutesWT,
              setIsPanelOpen,
              setActiveStation,
              isPanelOpen,
            )
          }
          originStation={originStation}
          setOriginStation={setOriginStation}
          isPanelOpen={isPanelOpen}
          setIsPanelOpen={setIsPanelOpen}
        />
      )}
      {isPanelOpen && (
        <InfoPanel
          station={activeStation}
          onClose={() => closeInfoPanel(setIsPanelOpen)}
          originStation={originStation}
          setOriginStation={setOriginStation}
          routes={routes}
          calculatedRoutes={calculatedRoutes}
          calculatedRoutesWT={calculatedRoutesWT}
        />
      )}
    </div>
  );
}
export default App;


// {isPanelOpen && (
//   <InfoPanel
//     station={activeStation}
//     onClose={() => closeInfoPanel(setIsPanelOpen)}
//     originStation={originStation}
//     setOriginStation={setOriginStation}
//     routes={routes}
//     calculatedRoutes={calculatedRoutes}
//     calculatedRoutesWT={calculatedRoutesWT}
//   />
// )}