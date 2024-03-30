import React from "react";
import Trainy2 from "./images/Trainy2.png";
import { Link } from "react-router-dom";
import TopNav from "./TopNav";
import "./About.css";

const Donate = ({ activePage, setActivePage }) => {
  return (
    <div>
      <TopNav setActivePage={setActivePage} />

      <div className="donate-page">
        <div className="donate-container">
          <div className="donate-column info">
            <p>This site is free to use but not free to operate. Please consider donating if you can.</p>
          </div>
          <div className="donate-column coffee">
            <iframe
              src="https://www.buymeacoffee.com/widget/page/jasontgirom"
              width="100%"
              height="500px"
              frameBorder="0"
              allowTransparency="true"
              style={{ border: "none", width: "100%", height: "500px" }}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;
