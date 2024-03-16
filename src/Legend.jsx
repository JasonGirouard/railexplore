import React from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "./Legend.css"; // Import the CSS file

const Legend = () => {
  const map = useMap();

  React.useEffect(() => {
    const legend = L.control({ position: "bottomleft" });

    legend.onAdd = function () {
      var div = L.DomUtil.create("div", "info legend custom-legend");
      div.innerHTML = `
        <div><strong>Travel Time</strong></div>
        <div class="legend-item">
          <i class="legend-icon" style="background: #008DF3;"></i>
          <span class="legend-text">0 - 3 hrs</span>
        </div>
        <div class="legend-item">
          <i class="legend-icon" style="background: #AFDDFF;"></i>
          <span class="legend-text">3 - 7 hrs</span>
        </div>
        <div class="legend-item">
          <i class="legend-icon" style="background: #BFBFBF;"></i>
          <span class="legend-text">7 + hrs</span>
        </div>
        <div class="legend-item">
          <i class="legend-icon unknown"></i>
          <span class="legend-text">Unknown</span>
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

  return null;
};

export default Legend;