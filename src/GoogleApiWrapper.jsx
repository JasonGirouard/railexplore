// GoogleApiWrapper.js
import React from "react";
import { LoadScript } from "@react-google-maps/api";

const GoogleApiWrapper = ({ children }) => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyDT4rB6W_aqF1-BgzWt266PPeAEnKYIuu0">
      {children}
    </LoadScript>
  );
};

export default GoogleApiWrapper;