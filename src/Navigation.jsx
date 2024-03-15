import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MenuOutlined, GlobalOutlined, InfoCircleOutlined, HeartOutlined } from "@ant-design/icons";
import "./Navigation.css";
import logo from "./images/Trainy2.png";

const Navigation = ({ activePage, setActivePage }) => {
  const [collapsedTop, setCollapsedTop] = useState(false);
  const [collapsedLeft, setCollapsedLeft] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 769);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 769);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleCollapseClickTop = () => {
    setCollapsedTop(!collapsedTop);
  };

  const handleCollapseClickLeft = () => {
    setCollapsedLeft(!collapsedLeft);
  };

  const handleNavItemClick = (path) => {
    navigate(`/${path.toLowerCase()}`);
    setActivePage(path);
  };

  const handleLogoClick = () => {
    navigate("/explore");
    setActivePage("Explore");
  };

  return (
    <>
      {isMobile ? (
        <div className="top-nav">
          <div className="nav-container">
            <MenuOutlined className="menu-icon" onClick={handleCollapseClickTop} />
            <div className="logo-container" onClick={handleLogoClick}>
              <span className="logo-text">TrainGang</span>
              <img src={logo} alt="Logo" className="logo-image" />
            </div>
            <div className={`nav-items ${collapsedTop ? "open" : ""}`}>
              <div
                className={`nav-item top-nav-item ${activePage === "Explore" ? "active" : ""}`}
                onClick={() => handleNavItemClick("Explore")}
              >
                <GlobalOutlined className="nav-icon" />
                <span className={`nav-text ${activePage === "Explore" ? "active" : ""}`}>Explore</span>
              </div>
              <div
                className={`nav-item top-nav-item ${activePage === "About" ? "active" : ""}`}
                onClick={() => handleNavItemClick("About")}
              >
                <InfoCircleOutlined className="nav-icon" />
                <span className={`nav-text ${activePage === "About" ? "active" : ""}`}>About</span>
              </div>
              <div
                className={`nav-item top-nav-item ${activePage === "Donate" ? "active" : ""}`}
                onClick={() => handleNavItemClick("Donate")}
              >
                <HeartOutlined className="nav-icon" />
                <span className={`nav-text ${activePage === "Donate" ? "active" : ""}`}>Donate</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={`left-nav ${collapsedLeft ? "collapsed" : ""}`}>
          <div className="nav-header">
            <MenuOutlined className="collapse-button" onClick={handleCollapseClickLeft} />
            {!collapsedLeft && (
              <div className="logo-container" onClick={handleLogoClick}>
                <img src={logo} alt="Logo" className="logo-image" />
              </div>
            )}
          </div>
          <div className="nav-items-container">
            <div
              className={`nav-item ${activePage === "Explore" ? "active" : ""}`}
              onClick={() => handleNavItemClick("Explore")}
            >
              &nbsp;
              <GlobalOutlined className="nav-icon" />
              {!collapsedLeft && <span className={`nav-text ${activePage === "Explore" ? "active" : ""}`}>Explore</span>}
            </div>
            <div
              className={`nav-item ${activePage === "About" ? "active" : ""}`}
              onClick={() => handleNavItemClick("About")}
            >
              &nbsp;
              <InfoCircleOutlined className="nav-icon" />
              {!collapsedLeft && <span className={`nav-text ${activePage === "About" ? "active" : ""}`}>About</span>}
            </div>
            <div
              className={`nav-item ${activePage === "Donate" ? "active" : ""}`}
              onClick={() => handleNavItemClick("Donate")}
            >
              &nbsp;
              <HeartOutlined className="nav-icon" />
              {!collapsedLeft && <span className={`nav-text ${activePage === "Donate" ? "active" : ""}`}>Donate</span>}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;