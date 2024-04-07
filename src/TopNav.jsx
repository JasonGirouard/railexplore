import React, { useState, useEffect } from "react";
import "./Navigation.css";
import { useNavigate } from "react-router-dom";
import logo from "./images/Trainy2.png";

const TopNav = ({ setActivePage }) => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 770);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 770);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogoClick = () => {
    window.location.href = '/';
    //navigate("/");
   // setActivePage("Explore");

  };

  if (isMobile) {
    return null; // Return nothing if isMobile is true
  }

  return (

    <div className="top-nav-desktop">
          <div className="nav-container">
            <div className = "top-nav-header-desktop">
            <div className="" onClick={handleLogoClick}>
              <span className="logo-text">TrainGang</span>
              <img src={logo} alt="Logo" className="logo-image" />
            </div>
            </div>
      </div>
    </div>

  );
};

export default TopNav;