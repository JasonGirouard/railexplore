import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { OriginProvider } from "./Context/OriginContext";
import { OriginStationProvider } from "./Context/OriginStationContext";
import { FiltersProvider } from "./Context/FiltersContext";
import { StationProvider } from "./Context/StationContext";
// import { LocationProvider } from './LocationContext';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <OriginProvider>
      <OriginStationProvider>
        <StationProvider>
          <FiltersProvider>
            <App />
          </FiltersProvider>
        </StationProvider>
      </OriginStationProvider>
    </OriginProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
