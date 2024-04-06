// DestinationButton.js
import React, { useState, useContext, useEffect, useRef } from "react";
import { DestinationContext } from "../Context/DestinationContext";
import { OriginContext } from "../Context/OriginContext";
import MapboxClient from "@mapbox/mapbox-sdk/services/geocoding";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import DestinationButtonResults from "./DestinationButtonResults";
import "./OriginButton.css";
import { useParams } from "react-router-dom";

 //FIX ME: UPDATE THE STYLING SO IT DOESN'T LOOK DISABLED

 const mapboxClient = MapboxClient({
    accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
  });

const DestinationButton = () => {
    const { origin } = useContext(OriginContext);
    const { selectedDestination, setSelectedDestination } = useContext(DestinationContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const buttonRef = useRef(null);
    const inputRef = useRef(null);
   //add params in later const { destinationId } = useParams();
   // if there are params for the destinationId, set the destination and set the searchTerm

   // return results
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
    if (selectedDestination) {
      setSearchTerm(selectedDestination.place_name);
    }
  }, [selectedDestination]);

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
    <div className="search-container destination">
      <div className="search destination">
        <FontAwesomeIcon icon={faMapMarkerAlt} className="search-icon search-icon-destination"  />
        <form className="search-form">
           <div className="div-search-form">
            <input
              ref={buttonRef}
              type="text"
              className="search-input destination"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={handleInputFocus}
              placeholder="Anywhere"
              disabled={origin === undefined}
            />

            {showResults && (
              <DestinationButtonResults
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

export default DestinationButton;
