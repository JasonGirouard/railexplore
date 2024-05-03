import React, { useState, useEffect , useContext } from "react";
import { OriginContext } from "./Context/OriginContext";
import { DestinationContext } from "./Context/DestinationContext";
import { MapContainer, GeoJSON, useMap, ZoomControl, TileLayer , Rectangle} from "react-leaflet";
import TileComponent from "./TileComponent";
import StationCircleComponent from "./StationCircleComponent";
import stations from "./data/stations.json";
import Legend from "./Legend";
import amtrakSimplifiedData from "./data/amtrak_simplified.json"; // Import the GeoJSON data
import "./MapComponent.css";
import LandingPage from "./LandingPage";


// separate  handler so that useMap can be used
const CenterMap = () => {
  const map = useMap();
  const { origin } = useContext(OriginContext);

  useEffect(() => {
    if (origin && origin.center.lat && origin.center.long) {
      map.setView([origin.center.lat, origin.center.long], map.getZoom());
    }
  }, [origin]);
  return null;
};


// separate handler so that useMap can be used
const ZoomHandler = ({ onZoomLevelChange }) => {
  const map = useMap();

  useEffect(() => {
    const handleZoomEnd = () => {
      onZoomLevelChange(map.getZoom());
   //   console.log('zoom = ',map.getZoom());
    };
     map.on("zoomend", handleZoomEnd);
    return () => {
      map.off("zoomend", handleZoomEnd);
    };
  }, [onZoomLevelChange]);

  return null;
};

// this zoom pans to center the destination
// const ZoomToBounds = () => {
//   const map = useMap();
//   const { selectedDestination } = useContext(DestinationContext);

//   useEffect(() => {
//     if (selectedDestination && selectedDestination.bbox) {
//       const bounds = [
//         [selectedDestination.bbox[1], selectedDestination.bbox[0]],
//         [selectedDestination.bbox[3], selectedDestination.bbox[2]],
//       ];
//       // map.fitBounds(bounds);
//       map.panInsideBounds(bounds);
//     }
//   }, [selectedDestination]);

//   return null;
// };


const ZoomToBounds = () => {
  const map = useMap();
  const { selectedDestination } = useContext(DestinationContext);
  const { origin } = useContext(OriginContext);

  useEffect(() => {
    if (
      selectedDestination &&
      selectedDestination.center &&
      origin &&
      origin.center
    ) {
      const destinationCenter = [
        selectedDestination.center.lat,
        selectedDestination.center.long,
      ];
      const originCenter = [origin.center.lat, origin.center.long];

      const centerLat = (destinationCenter[0] + originCenter[0]) / 2;
      const centerLong = (destinationCenter[1] + originCenter[1]) / 2;
      map.panTo([centerLat, centerLong]);
    }
  }, [selectedDestination, origin]);

  return null;
};

const Map = () => {
 // console.log("📍 in the map");
  const { origin } = useContext(OriginContext);
  const { selectedDestination } = useContext(DestinationContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 770);
  const [geoJsonData, setGeoJsonData] = useState(amtrakSimplifiedData);
  // note that one optimization could be logging the users zoom level in localStorage to reduce their need to zoom in to their desired level each time
  const [zoomLevel, setZoomLevel] = useState(7);
   // Function to calculate the radius based on the zoom level



   const getRadius = () => {
    if (zoomLevel < 6) {
      return 4;
    } else if (zoomLevel === 6) {
      return 5;
    } else if (zoomLevel === 7) {
      return 6;
    } else if (zoomLevel === 8) {
      return 8;
    } else if (zoomLevel === 9) {
      return 10;
    } else {
      return 11;
    }
  };
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 770);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const northAmericaBounds = [
    [5, -167], // Southwest coordinates
    [83, -52], // Northeast coordinates
  ];

  return origin ? (
  
    <MapContainer
      center={[origin.center.lat, origin.center.long]}
      zoom={7}
      minZoom={isMobile ? 5 : 7} // Set the minimum zoom level based on isMobile
      maxBounds={northAmericaBounds}
      maxBoundsViscosity={1.0}
     // scrollWheelZoom={false} // Disable scroll-to-zoom
      zoomControl={false} // Disable default zoom control
      className="map-container"
    >
      <ZoomHandler onZoomLevelChange={setZoomLevel} />
      {stations
       // .filter((station) => station.mode === "TRAIN")
        .map((station) => {
          return (
            <StationCircleComponent
              key={station.code}
              station={station}
              radius={getRadius()} 
            />
          );
        })}

{/* {selectedDestination && selectedDestination.bbox && (
        <Rectangle
          bounds={[
            [selectedDestination.bbox[1], selectedDestination.bbox[0]],
            [selectedDestination.bbox[3], selectedDestination.bbox[2]],
          ]}
          color="gray"
          weight={2}
          fillOpacity={0.1}
        />
      )} */}


      <ZoomToBounds />

      {geoJsonData && (
        <GeoJSON
          data={geoJsonData}
          style={() => ({
            color: "#4a83ec",
            weight: 1,
            fillColor: "#1a1d62",
            fillOpacity: 0.5,
          })}
        />
      )}
      <TileComponent />

     
      <CenterMap />
      {/* <Legend /> */}
      {!isMobile && <ZoomControl position="bottomleft" />}
    </MapContainer>

  ) : (<LandingPage/>);
};

export default Map;
