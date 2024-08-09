import '../UI/Dashbord/General.css'
import { Outlet } from "react-router-dom";
import React from "react";

function DashboardLayout() {
  return (
    <div className="dashbordLayout">
      <div className="leftSide">
        <div className="linksDiv">
          <div className="componentsWrapper">
            <div className="elementLayout hamburger-btn">
              <button className="hamburger-btn" id="hamburgerBtn">
                &#9776;
              </button>
            </div>

            <div className="profileImage">
              <div className="image">
                <img
                  className="profileIcon"
                  src="../UI/Dashbord/dImage/Ellipse 5.svg"
                  alt=""
                />
              </div>
              <div className="myInfo">
                <div>Gisa M. Caleb</div>
                <div className="wordD">Admin</div>
              </div>
            </div>

            <div className="linkElementLayout">
              <div className="image">
                <a href="../UI/Dashbord/dashbordProfile.html">
                  <img
                    className="icon"
                    src="../UI/Dashbord/dImage/healthicons_ui-user-profile.svg"
                    alt=""
                  />
                </a>
              </div>
              <div className="myInfo">
                <div className="word">
                  <a className="word" href="../UI/Dashbord/dashbordProfile.html">
                    Profile
                  </a>
                </div>
              </div>
            </div>

            <div className="linkElementLayout">
              <div className="image">
                <a href="../UI/Dashbord/dashbordMassage.html">
                  <img className="icon" src="../UI/Dashbord/dImage/Vector.svg" alt="" />
                </a>
              </div>
              <div className="myInfo">
                <div className="word">
                  <a href="../UI/Dashbord/dashbordMassage.html">Messages</a>
                </div>
              </div>
            </div>

            <div className="linkElementLayout">
              <div className="logoutIcon logout-btn">
                <i
                  style={{ fontSize: "25px" }}
                  className="fa-solid fa-arrow-right-from-bracket"
                ></i>
              </div>
              <button className="logout-btn logWord">Logout</button>
            </div>
          </div>
        </div>
      </div>

      <div className="routeDiv">
        <div className="rightSide">
          <div className="loaderContainer">
            <span className="loader"></span>
          </div>

          <div className="top">
            <a href="#/dashboard/home">Home</a>
            <a href="#/dashboard/portfolio">Portfolio</a>
            <a href="#/dashboard/skills">Skills</a>
            <a className="activeOne" href="/blog">
              Blog
            </a>
          </div>
        </div>

        <div className="appContainer">
          <div className="app" id="app">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
