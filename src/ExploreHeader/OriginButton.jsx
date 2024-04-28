// OriginButton.js
import React, { useState, useContext, useEffect, useRef } from "react";
import { OriginContext } from "../Context/OriginContext";
//import { OriginStationContext } from "../Context/OriginStationContext";
import MapboxClient from "@mapbox/mapbox-sdk/services/geocoding";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import OriginButtonResults from "./OriginButtonResults";
import "./OriginButton.css";
import { useParams } from "react-router-dom";
//import stations from "../data/stations.json";

const mapboxClient = MapboxClient({
  accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
});

const OriginButton2 = ({setOriginDataLoaded}) => {
  const { origin, setOrigin } = useContext(OriginContext);
 // const {  setOriginStation, setNearestStations } = useContext(OriginStationContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const buttonRef = useRef(null);
  const inputRef = useRef(null);
  const { originId } = useParams();

  // set the origin based on the url params 
  useEffect(() => {
    if (originId) {
    const fetchOrigin = async () => {
      
        try {
          const response = await mapboxClient
            .forwardGeocode({
              query: originId,
              limit: 1,
              countries: ["us", "ca"],
              types: ["address", "locality", "poi", "place", "postcode", "neighborhood"]
            })
            .send();
  
          if (response.body.features.length > 0) {
            const feature = response.body.features[0];
            const formattedName = feature.place_name;
            const center = { lat: feature.center[1], long: feature.center[0] };
  
            const newOrigin = {
              ...feature,
              place_name: formattedName,
              center: center,
            };
          
            setOrigin(newOrigin);
            setSearchTerm(formattedName);
            setOriginDataLoaded(true);
          }
        } catch (error) {
          console.error("Error fetching origin:", error);
        }
    }
    fetchOrigin();
  }

  //if there is no originId in the url but an origin exists, then send the user to the homepage
  if (!originId && origin) {
 //   console.log('no origin id in params, so setting origin data loaded to true')
    setOriginDataLoaded(true);
  }
    
  }, [originId, setOrigin, setOriginDataLoaded]);

  useEffect(() => {
    const fetchResults = async () => {
      if (searchTerm) {
        try {
          const response = await mapboxClient
            .forwardGeocode({
              query: searchTerm,
              limit: 5,
              countries: ["us", "ca"],
              types: ["address", "locality", "poi", "place", "postcode", "neighborhood"]
            })
            .send();

          const formattedResults = response.body.features.map((feature) => {
            const formattedName = formatName(feature);
            const center = { lat: feature.center[1], long: feature.center[0] };

            return {
              ...feature,
              place_name: formattedName,
              center: center,
            };
          });

          setSearchResults(formattedResults);
        } catch (error) {
          console.error("Error searching for location:", error);
        }
      } else {
        setSearchResults([]);
      }
    };

    fetchResults();
  }, [searchTerm]);

  useEffect(() => {
    if (origin !== null) {
      setSearchTerm(origin.place_name);
    }
  }, [origin]);

  const formatName = (feature) => {
    let center = { lat: feature.center[1], long: feature.center[0] }
    let formattedName = "";
    let address = "";
    let city = "";
    let state = "";

    if (feature.place_type[0] === "address") {
      address = feature.place_name.split(",")[0].trim();
      city = feature.context.find((ctx) => ctx.id.includes("place"))?.text || "";
      state = feature.context.find((ctx) => ctx.id.includes("region"))?.short_code.slice(-2) || "";
    } else if (feature.place_type[0] === "locality") {
      address = feature.text;
      state = feature.context.find((ctx) => ctx.id.includes("region"))?.short_code.slice(-2) || "";
    } else if (feature.place_type[0] === "poi") {
      address = feature.text;
      city = feature.context.find((ctx) => ctx.id.includes("place"))?.text || "";
      state = feature.context.find((ctx) => ctx.id.includes("region"))?.short_code.slice(-2) || "";
    } else if (feature.place_type[0] === "place") {
      address = feature.text;
      city = feature.context.find((ctx) => ctx.id.includes("place"))?.text || "";
      state = feature.context.find((ctx) => ctx.id.includes("region"))?.short_code.slice(-2) || "";
    } else if (feature.place_type[0] === "postcode") {
      address = feature.text;
      city = feature.context.find((ctx) => ctx.id.includes("place"))?.text || "";
      state = feature.context.find((ctx) => ctx.id.includes("region"))?.short_code.slice(-2) || "";
    } else if (feature.place_type[0] === "neighborhood") {
      address = feature.text;
      city = feature.context.find((ctx) => ctx.id.includes("place"))?.text || "";
      state = feature.context.find((ctx) => ctx.id.includes("region"))?.short_code.slice(-2) || "";
    }

    formattedName = `${address}${city ? `, ${city}` : ""}${state ? `, ${state}` : ""}`;

    return formattedName;
  };

  const handleClick = () => {
    setShowResults(!showResults);
  };

  const handleInputFocus = () => {
    setShowResults(true);
  };

  const handleInputBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setShowResults(false);
    }
  };

  return (
    <div className="search-container origin">
      <div className="search origin">
        <FontAwesomeIcon icon={faMapMarkerAlt} className="search-icon" />
        <form className="search-form">
          <div className="div-search-form">
            <input
              ref={buttonRef}
              type="text"
              className="search-input origin"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={handleInputFocus}
              placeholder="Enter city or address"
            />

            {showResults && (
              <OriginButtonResults
                buttonRef={buttonRef}
                searchResults={searchResults}
                setSearchTerm={setSearchTerm}
                setShowResults={setShowResults}
                onClose={handleClick}
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default OriginButton2;