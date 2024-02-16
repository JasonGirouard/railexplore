import React from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

const Legend = () => {
  const map = useMap();

  React.useEffect(() => {
    const legend = L.control({ position: "bottomleft" });

    legend.onAdd = function () {
      var div = L.DomUtil.create("div", "info legend custom-legend");
      div.style.backgroundColor = 'white'; // Set the background color to white
      div.style.padding = '6px'; // Add some padding
      div.style.borderRadius = '4px'; // Optionally round the corners
      div.style.boxShadow = '0 1px 5px rgba(0,0,0,0.4)'; // Optional shadow for better visibility
      div.innerHTML = `
        <div><strong>Travel Time</strong></div>
        <div style="display: flex; align-items: center; margin-bottom: 5px;">
          <i style="background: #008DF3; width: 15px; height: 15px; border-radius: 50%;"></i>
          <span style="margin-left: 8px;">0 - 2.9 hrs</span>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 5px;">
          <i style="background: #AFDDFF; width: 15px; height: 15px; border-radius: 50%;"></i>
          <span style="margin-left: 8px;">3 - 6.9 hrs</span>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 5px;">
          <i style="background: #BFBFBF; width: 15px; height: 15px; border-radius: 50%;"></i>
          <span style="margin-left: 8px;">7 + hrs</span>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 5px;">
          <i style="background: #FFFFFF; border: 2px solid #AFDDFF; width: 12px; height: 12px; border-radius: 50%;"></i>
          <span style="margin-left: 8px;">Unknown</span>
        </div>
      `;
      return div;
    };

    legend.addTo(map);

    // Cleanup function to remove legend when component unmounts
    return () => {
      legend.remove();
    };
  }, [map]);

  return (
    <>
      <style>
        {`.custom-legend.leaflet-control {
            margin-bottom: 40px !important; /* Move up by 10px */
          }`}
      </style>
      null
    </>
  );
};

export default Legend;
