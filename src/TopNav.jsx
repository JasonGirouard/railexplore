import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MenuOutlined, GlobalOutlined, InfoCircleOutlined, HeartOutlined } from "@ant-design/icons";
import "./TopNav.css";
import logo from "./images/Trainy2.png";

const TopNav = ({ activePage, setActivePage }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavItemClick = (path) => {
    navigate(`/${path.toLowerCase()}`);
    setActivePage(path);
    setMenuOpen(false);
  };

  const handleLogoClick = () => {
    navigate("/explore");
    setActivePage("Explore");
  };

  return (
    <div className="top-nav">
      <div className="nav-container">
        <MenuOutlined className="menu-icon" onClick={handleMenuClick} />
        <div className="logo-container" onClick={handleLogoClick}>
          <span className="logo-text">TrainGang</span>
          <img src={logo} alt="Logo" className="logo-image" />
        </div>
        <div className={`nav-items ${menuOpen ? "open" : ""}`}>
          <div
            className={`nav-item ${activePage === "Explore" ? "active" : ""}`}
            onClick={() => handleNavItemClick("Explore")}
          >
            <GlobalOutlined className="nav-icon" />
            <span className={`nav-text ${activePage === "Explore" ? "active" : ""}`}>Explore</span>
          </div>
          <div
            className={`nav-item ${activePage === "About" ? "active" : ""}`}
            onClick={() => handleNavItemClick("About")}
          >
            <InfoCircleOutlined className="nav-icon" />
            <span className={`nav-text ${activePage === "About" ? "active" : ""}`}>About</span>
          </div>
          <div
            className={`nav-item ${activePage === "Donate" ? "active" : ""}`}
            onClick={() => handleNavItemClick("Donate")}
          >
            <HeartOutlined className="nav-icon" />
            <span className={`nav-text ${activePage === "Donate" ? "active" : ""}`}>Donate</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;