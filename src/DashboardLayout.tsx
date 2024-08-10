import "../UI/Dashbord/General.css";
import { Link, Outlet } from "react-router-dom";
import React, { useState } from "react";
import { User, User2Icon, MessageSquareText } from "lucide-react";

function DashboardLayout() {
  const [showMobileBar, setShowMobileBar] = useState(false);

  const handleViewMobileBar = () => {
    setShowMobileBar((prevState) => !prevState);
  };

  return (
    <div className="dashbordLayout">
      <div className="leftSide">
        <div className="linksDiv">
          <div className="componentsWrapper">
            <div className="elementLayout hamburger-btn">
              <button
                className="hamburger-btn"
                id="hamburgerBtn"
                onClick={handleViewMobileBar}
              >
                &#9776;
              </button>
            </div>

            <div className="profileImage">
              <div className="image">
                <User />
              </div>
              <div className="myInfo">
                <div>Gisa M. Caleb</div>
                <div className="wordD">Admin</div>
              </div>
            </div>

            <div className="flex smd:flex-col justify-between w-[80%] smd:justify-normal gap-14">
              <div className="linkElementLayout">
                <div className="image">
                  <Link to={"/profile"}>
                  <User2Icon />
                  </Link>
                </div>
                <div className="myInfo">
                  <div className="word">
                    <Link to={"/profile"}>Profile</Link>
                  </div>
                </div>
              </div>

              <div className="linkElementLayout">
                <div className="image">
                  <Link to={"/messages"}>
                    <MessageSquareText/>
                  </Link>
                </div>
                <div className="myInfo">
                  <div className="word">
                    <Link to={"/messages"}>Messages</Link>
                  </div>
                </div>
              </div>

              <div className="linkElementLayout">
                <Link to={"/login"} className="flex items-center gap-5">
                  <div className="logoutIcon logout-btn hidden xmd:flex items-center ">
                    <i
                      style={{ fontSize: "20px" }}
                      className="fa-solid fa-arrow-right-from-bracket"
                    ></i>
                  </div>
                  <button className="logout-btn logWord">Logout</button>
                </Link>
              </div>
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
            <Link to={"/"}>Home</Link>
            <Link to={"/projects"}>Projects</Link>
            <Link to={"/skills"}>Skills</Link>
            <Link className="activeOne" to={"/blogs"}>
              Blog
            </Link>
          </div>
        </div>

        <div className="appContainer">
          <div className="app" id="app">
            <Outlet />
          </div>
        </div>
      </div>

      {showMobileBar && (
        <div id="mobile-layer" className="mobile-layer open">
          <div className="mobile-navbar">
            <button
              className="close-btn"
              id="closeBtn"
              onClick={handleViewMobileBar}
            >
              &times;
            </button>
            <div className="mobile-navbar-links">
              <Link onClick={handleViewMobileBar} to={"/"}>
                Home
              </Link>
              <Link onClick={handleViewMobileBar} to={"/projects"}>
                Projects
              </Link>
              <Link onClick={handleViewMobileBar} to={"/skills"}>
                Skills
              </Link>
              <Link
                onClick={handleViewMobileBar}
                className="activeOne"
                to={"/blogs"}
              >
                Blog
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardLayout;
