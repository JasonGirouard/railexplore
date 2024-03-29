// OriginButton.js
import React, { useState, useContext, useEffect, useRef } from "react";
import { OriginContext } from "../Context/OriginContext";
import MapboxClient from "@mapbox/mapbox-sdk/services/geocoding";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import OriginButtonResults from "./OriginButtonResults";
import "./OriginButton.css";

const mapboxClient = MapboxClient({
  accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
});

const OriginButton2 = () => {
    // note that I might evolve this button to behave more like the other buttons and therefore move the setOrigin into the modal rather than the button
  const {origin, setOrigin, userLocation } = useContext(OriginContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const buttonRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (searchTerm) {
        try {
          const response = await mapboxClient
            .forwardGeocode({
              query: searchTerm,
              limit: 5,
              countries: ["us","ca"],
              types: [
                "address",
                "locality",
                "poi",
                "place",
                "postcode",
                "neighborhood",
              ],
              proximity: userLocation
                ? [userLocation.long, userLocation.lat]
                : undefined,
            })
            .send();

          const formattedResults = response.body.features.map((feature) => {

            let center = { lat: feature.center[1], long: feature.center[0] }
            let formattedName = "";
            let address = "";
            let city = "";
            let state = "";
           
            if (feature.place_type[0] === "address") {
              address = feature.place_name.split(",")[0].trim();
              city =
                feature.context.find((ctx) => ctx.id.includes("place"))?.text ||
                "";
              state =
                feature.context
                  .find((ctx) => ctx.id.includes("region"))
                  ?.short_code.slice(-2) || "";
            } else if (feature.place_type[0] === "locality") {
              address = feature.text;
              state =
                feature.context
                  .find((ctx) => ctx.id.includes("region"))
                  ?.short_code.slice(-2) || "";
            } else if (feature.place_type[0] === "poi") {
              address = feature.text;
              city =
                feature.context.find((ctx) => ctx.id.includes("place"))?.text ||
                "";
              state =
                feature.context
                  .find((ctx) => ctx.id.includes("region"))
                  ?.short_code.slice(-2) || "";
            } else if (feature.place_type[0] === "place") {
              address = feature.text;
              city =
                feature.context.find((ctx) => ctx.id.includes("place"))?.text ||
                "";
              state =
                feature.context
                  .find((ctx) => ctx.id.includes("region"))
                  ?.short_code.slice(-2) || "";
            } else if (feature.place_type[0] === "postcode") {
              address = feature.text;
              city =
                feature.context.find((ctx) => ctx.id.includes("place"))?.text ||
                "";
              state =
                feature.context
                  .find((ctx) => ctx.id.includes("region"))
                  ?.short_code.slice(-2) || "";
            } else if (feature.place_type[0] === "neighborhood") {
              address = feature.text;
              city =
                feature.context.find((ctx) => ctx.id.includes("place"))?.text ||
                "";
              state =
                feature.context
                  .find((ctx) => ctx.id.includes("region"))
                  ?.short_code.slice(-2) || "";
            }

            formattedName = `${address}${city ? `, ${city}` : ""}${
              state ? `, ${state}` : ""
            }`;


            // console.log('feature = ',feature, 'formattedname :', formattedName)
            return {
              ...feature,
              place_name: formattedName,
              center: center
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
        console.log('setting the search term')
      setSearchTerm(origin.place_name);
    }
  }, [origin]);

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
              //  onChange={handleSearchChange}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={handleInputFocus}
              //onBlur={handleInputBlur}
              placeholder="Enter city or address"
            />

            {showResults && (
             <OriginButtonResults buttonRef={buttonRef} searchResults={searchResults} setSearchTerm={setSearchTerm} setShowResults={setShowResults} onClose={handleClick}/>
            )}

          </div>
        </form>
      </div>
    </div>
  );
};

export default OriginButton2;