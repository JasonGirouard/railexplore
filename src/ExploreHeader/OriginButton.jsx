// OriginButton.js
import React, { useState, useContext, useEffect, useRef } from "react";
import { FiltersContext } from "../FiltersContext";
import { LocationContext } from "../LocationContext";
import MapboxClient from "@mapbox/mapbox-sdk/services/geocoding";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import "./OriginButton.css";
import stations from "../data/stations.json"; // Ensure your CSS styles are defined here

const mapboxClient = MapboxClient({
  accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
});

const OriginButton = () => {
    const { setOrigin, nearestStations, setNearestStations, originStation, setOriginStation } = useContext(FiltersContext);
  const { userLocation } = useContext(LocationContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
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


  const handleSelect = (result) => {
    console.log("handleSelect called");
    console.log("result: ", result);
    setOrigin(result);
    setSearchTerm(result.place_name);
    setShowResults(false);

    // Store the selected origin in local storage
    localStorage.setItem('origin', JSON.stringify({
        placeName: result.place_name,
        center: result.center
      }));
  };

  const handleInputFocus = () => {
    setShowResults(true);
  };

  const handleInputBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setShowResults(false);
    }
  };

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in kilometers
    return d;
  };
  
  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  // set the nearest station

  useEffect(() => {
    if (searchTerm) {
      const origin = JSON.parse(localStorage.getItem('origin'));
      if (origin && origin.center) {
        const { lat: originLat, long: originLong } = origin.center;
        const sortedStations = stations.sort((a, b) => {
          const distA = getDistance(originLat, originLong, a.lat, a.long);
          const distB = getDistance(originLat, originLong, b.lat, b.long);
          return distA - distB;
        });
        const nearestTenStations = sortedStations.slice(0, 10).map((station) => {
          const distance = getDistance(originLat, originLong, station.lat, station.long);
          const distanceInMiles = distance * 0.621371; // Convert kilometers to miles
          return {
            ...station,
            distance_from_origin: distanceInMiles.toFixed(2), // Round to 2 decimal places
          };
        });
        setNearestStations(nearestTenStations);
        localStorage.setItem('nearestStations', JSON.stringify(nearestTenStations));
  
        // Set the closest station to the originStation state variable
        const closestStation = nearestTenStations[0];
        setOriginStation(closestStation);
        localStorage.setItem('originStation', JSON.stringify(closestStation));
      }
    }
  }, [searchTerm]);

  return (
    <div className="search-container">
      <div className="search">
        <FontAwesomeIcon icon={faMapMarkerAlt} className="search-icon" />
        <form className="search-form">
          <div className="div-search-form">
            <input
              type="text"
              className="search-input"
              value={searchTerm}
              //  onChange={handleSearchChange}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={handleInputFocus}
              //onBlur={handleInputBlur}
              placeholder="Enter city or address"
            />

            {showResults && (
              <div className="search-results">
                {searchResults.map((result) => (
                  <div
                    key={result.id}
                    className="autocomplete-option"
                    onClick={() => handleSelect(result)}
                    // style={{
                    //   cursor: "pointer",
                    //   backgroundColor: "transparent",
                    //   transition: "background-color 0.3s",
                    // }}
                    // onMouseEnter={(e) => {
                    //   e.target.style.backgroundColor = "#f0f0f0";
                    // }}
                    // onMouseLeave={(e) => {
                    //   e.target.style.backgroundColor = "transparent";
                    // }}
                  >
                    {result.place_name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default OriginButton;
