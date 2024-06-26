import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MenuOutlined,
  GlobalOutlined,
  InfoCircleOutlined,
  HeartOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import "./Navigation.css";
import logo from "./images/Trainy2.png";

const Navigation = ({ activePage, setActivePage, isMobile }) => {
  const [collapsedTop, setCollapsedTop] = useState(true);
  const [collapsedLeft, setCollapsedLeft] = useState(true);

  const navigate = useNavigate();

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
    window.location.href = '/';
  //  setActivePage("Explore");
  };

  return (
    <>
      {isMobile ? (
        //   if mobile then use the top-nav only
        <div
          className={`top-nav ${collapsedTop ? "collapsed-top" : "open-top"}`}
        >
          <div className="nav-container">
            <div className="top-nav-header">
              <MenuOutlined
                className="menu-icon-top"
                onClick={handleCollapseClickTop}
              />

              <div className="logo-container-top" onClick={handleLogoClick}>
                <span className="logo-text">TrainGang</span>
                {/* <img src={logo} alt="Logo" className="logo-image" /> */}
              </div>
            </div>

            <div className={"nav-items-container-top"}>
              <div
                className={`nav-item-top ${
                  activePage === "Explore" ? "active" : ""
                }`}
                onClick={() => {
                  handleNavItemClick("Explore");
                  handleCollapseClickTop();
                }}
              >
                <GlobalOutlined className="nav-icon" />
                <span
                  className={`nav-text ${
                    activePage === "Explore" ? "active" : ""
                  }`}
                >
                  Explore
                </span>
              </div>
              <div
                className={`nav-item-top ${
                  activePage === "About" ? "active" : ""
                }`}
                onClick={() => {
                  handleNavItemClick("About");
                  handleCollapseClickTop();
                }}
              >
                <InfoCircleOutlined className="nav-icon" />
                <span
                  className={`nav-text ${
                    activePage === "About" ? "active" : ""
                  }`}
                >
                  About
                </span>
              </div>
              <div
                className={`nav-item-top ${
                  activePage === "Donate" ? "active" : ""
                }`}
                onClick={() => {
                  handleNavItemClick("Donate");
                  handleCollapseClickTop();
                }}
              >
                <HeartOutlined className="nav-icon" />
                <span
                  className={`nav-text ${
                    activePage === "Donate" ? "active" : ""
                  }`}
                >
                  Donate
                </span>
              </div>
              <div
                className={`nav-item-top ${
                  activePage === "Feedback" ? "active" : ""
                }`}
                onClick={() => {
                  handleNavItemClick("Feedback");
                  handleCollapseClickTop();
                }}
              >
                <CommentOutlined className="nav-icon" />
                <span
                  className={`nav-text ${
                    activePage === "Feedback" ? "active" : ""
                  }`}
                >
                  Feedback
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // otherwise its desktop and use the left nav
        <div>
          <div
            className={`left-nav ${
              collapsedLeft ? "collapsed-left" : "open-left"
            }`}
          >
            <div className="left-nav-header">
              <MenuOutlined
                className="menu-icon-left"
                onClick={handleCollapseClickLeft}
              />
              {/* {!collapsedLeft && (
              <div className="logo-container-left" onClick={handleLogoClick}>
                <img src={logo} alt="Logo" className="logo-image" />
              </div>
            )} */}
            </div>
            <div className="nav-items-container-left">
              <div
                className={`nav-item-left ${
                  activePage === "Explore" ? "active" : ""
                }`}
                onClick={() => handleNavItemClick("Explore")}
              >
                &nbsp;
                <GlobalOutlined className="nav-icon" />
                {!collapsedLeft && (
                  <span
                    className={`nav-text ${
                      activePage === "Explore" ? "active" : ""
                    }`}
                  >
                    Explore
                  </span>
                )}
              </div>
              <div
                className={`nav-item-left ${
                  activePage === "About" ? "active" : ""
                }`}
                onClick={() => handleNavItemClick("About")}
              >
                &nbsp;
                <InfoCircleOutlined className="nav-icon" />
                {!collapsedLeft && (
                  <span
                    className={`nav-text ${
                      activePage === "About" ? "active" : ""
                    }`}
                  >
                    About
                  </span>
                )}
              </div>
              <div
                className={`nav-item-left ${
                  activePage === "Donate" ? "active" : ""
                }`}
                onClick={() => handleNavItemClick("Donate")}
              >
                &nbsp;
                <HeartOutlined className="nav-icon" />
                {!collapsedLeft && (
                  <span
                    className={`nav-text ${
                      activePage === "Donate" ? "active" : ""
                    }`}
                  >
                    Donate
                  </span>
                )}
              </div>

              <div
                className={`nav-item-left ${
                  activePage === "Feedback" ? "active" : ""
                }`}
                onClick={() => handleNavItemClick("Feedback")}
              >
                &nbsp;
                <CommentOutlined className="nav-icon" />
                {!collapsedLeft && (
                  <span
                    className={`nav-text ${
                      activePage === "Feedback" ? "active" : ""
                    }`}
                  >
                    Feedback
                  </span>
                )}
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;