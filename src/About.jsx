import React from "react";
import "./About.css";
import womanReadingImage from "./images/womanReadingImage.png";
import Trainy2 from "./images/Trainy2.png";
import { Link } from "react-router-dom";
import TopNav from "./TopNav";
const About = ({ setActivePage }) => {
  return (
    <div>
      <TopNav setActivePage={setActivePage} />

      <div className="about-page">
        <div className="about-container">
          <div className="about-text">
            <h4>About</h4>
            <h1>Travel by Train.</h1>
            <p className="travel-by-train-desc">
              Train Gang exists to help you travel by train. At best, it hopes
              to inspire you to visit local destinations you otherwise wouldn't.
            </p>
            <p>
              Passenger rail provides a peace of mind, free from traffic and
              dangerous drivers, that traveling by car simply can't deliver. Why
              not travel by train?
            </p>
          </div>
          <div className="about-image">
            <img src={womanReadingImage} alt="Woman Reading" />
          </div>
        </div>

        <div className="value-section">
          <div className="value-row">
            <div className="value-column">
              <h2>Built to find you a destination.</h2>
            </div>
            <div className="value-column">
              <p>
                Amtrak and other passenger rail websites are effective when you
                already know your origin & destination — but they aren't
                effective when you don't.
              </p>
              <p>
                Rather than staring at transit maps and manually checking
                different travel times & prices, why not explore all your
                possibilities at once?
              </p>
            </div>
          </div>

          <div className="value-divider"></div>

          <div className="value-row">
            <div className="value-column">
              <div className="trainy">
                {/* <img src={Trainy2} alt="Train Logo" /> */}
              </div>

              <p>
                This site is free to use, but not free to operate. Please{" "}
                <Link
                to="https://www.buymeacoffee.com/jasontgirom"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "underline", color: "inherit" }}
              >
                  donate
                </Link>{" "}
                if you can.
              </p>

              <p style={{ fontStyle: 'italic' }}>
                I wrote about what it was like to make this site {" "}
                <Link
                to="https://jasontgirouard.medium.com/how-i-built-traingang-com-9e91d89c0574"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "underline", color: "inherit" }}
              >
                  here on Medium
                </Link>
                .
              </p>
            </div>
            <div className="value-column">
              <h2>Please donate if you can.</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
