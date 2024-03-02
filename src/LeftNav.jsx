import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MenuOutlined,
  GlobalOutlined,
  InfoCircleOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import "./LeftNav.css";

const LeftNav = ({ onDistanceChange, collapsed, setCollapsed }) => {
  const navigate = useNavigate();

  const handleCollapseClick = () => {
    setCollapsed(!collapsed); // Update collapsed state in parent component
  };

  // Function to navigate to the specified page
  const handleNavItemClick = (path) => {
    navigate(`/${path.toLowerCase()}`); // Use the navigate function to change the route
  };

  return (
    <div className={`left-nav ${collapsed ? "collapsed" : ""}`}>
      <MenuOutlined className="collapse-button" onClick={handleCollapseClick} />
      <div className="nav-items-container">
        <div
          className="nav-item"
          onClick={() => handleNavItemClick("Explore")}
        >
          <GlobalOutlined className="nav-icon" />
          {!collapsed && <span className="nav-text">Explore</span>}
        </div>
        <div
          className="nav-item"
          onClick={() => handleNavItemClick("About")}
        >
          <InfoCircleOutlined className="nav-icon" />
          {!collapsed && <span className="nav-text">About</span>}
        </div>
        <div
          className="nav-item"
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