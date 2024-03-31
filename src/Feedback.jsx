import React from "react";
import TopNav from "./TopNav";
import "./About.css";

const Feedback = ({ activePage, setActivePage }) => {
  return (
    <div>
      <TopNav setActivePage={setActivePage} />

      <div className="feedback-page">
        <div className="feedback-container">
          
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSf3ayQVA0Yhf7mIAnY4rncdJdC7ACf2P60QJn9x1ZpZLDCmEw/viewform?embedded=true"
            //   width="640"
            //   height="500"
              frameborder="0"
              marginheight="0"
              marginwidth="0"
              className = "googleform"
            >
              Loading…
            </iframe>

        </div>
      </div>
    </div>
  );
};

export default Feedback;
