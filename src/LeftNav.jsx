import React, { useState } from "react";
import {
  MenuOutlined,
  GlobalOutlined,
  InfoCircleOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import "./LeftNav.css";

const LeftNav = ({
  onDistanceChange,
  activePage,
  setActivePage,
  collapsed,
  setCollapsed,
}) => {
  const handleCollapseClick = () => {
    setCollapsed(!collapsed); // Update collapsed state in parent component
  };

  // Function to handle nav item click and set active page
  const handleNavItemClick = (page) => {
    setActivePage(page);
  };

  return (
    <div className={`left-nav ${collapsed ? "collapsed" : ""}`}>
      <MenuOutlined className="collapse-button" onClick={handleCollapseClick} />
      <div className="nav-items-container">
        <div
          className={`nav-item ${activePage === "Explore" ? "active" : ""}`}
          onClick={() => handleNavItemClick("Explore")}
        >
          <GlobalOutlined className="nav-icon" />
          {!collapsed && <span className="nav-text">Explore</span>}
        </div>
        <div
          className={`nav-item ${activePage === "About" ? "active" : ""}`}
          onClick={() => handleNavItemClick("About")}
        >
          <InfoCircleOutlined className="nav-icon" />
          {!collapsed && <span className="nav-text">About</span>}
        </div>
        <div
          className={`nav-item ${activePage === "Donate" ? "active" : ""}`}
          onClick={() => handleNavItemClick("Donate")}
        >
          <HeartOutlined className="nav-icon" />
          {!collapsed && <span className="nav-text">Donate</span>}
        </div>
      </div>
    </div>
  );
};

export default LeftNav;
