import "../UI/Dashbord/General.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { User, User2Icon, MessageSquareText } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./Redux/store";
import { tabs } from "./Redux/Reducers/currentTabReducer";
import { clearCredentials } from "./Redux/Reducers/authReducer";

function DashboardLayout() {
  const [showMobileBar, setShowMobileBar] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleViewMobileBar = () => {
    setShowMobileBar((prevState) => !prevState);
  };

  const handleLogout = () => {
    dispatch(clearCredentials());
    navigate("/login");
  };

  const { currentTab } = useSelector((state: RootState) => state.tab);

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

            <div className="pl-5 w-full xsm:pl-0 flex smd:flex-col justify-between smd:justify-normal sm:gap-14">
              <div className="linkElementLayout">
                <Link to={"/profile"}>
                  <div
                    className={`flex gap-4 px-3 py-2 ${
                      currentTab === tabs.profile ? "activeOne" : ""
                    }`}
                  >
                    <div className="image">
                      <User2Icon />
                    </div>
                    <div className="myInfo">
                      <div className="word">
                        <div>Profile</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="linkElementLayout">
                <Link className="m-0 p-0" to={"/messages"}>
                  <div
                    className={`flex gap-4 px-3 py-2 ${
                      currentTab === tabs.message ? "activeOne" : ""
                    }`}
                  >
                    <div className="image">
                      <MessageSquareText />
                    </div>
                    <div className="myInfo">
                      <div className="word">
                        <div>Messages</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="linkElementLayout ">
                <div
                  onClick={handleLogout}
                  className="flex px-3 py-2 items-center gap-5"
                >
                  <div className="logoutIcon logout-btn hidden xmd:flex items-center ">
                    <i
                      style={{ fontSize: "20px" }}
                      className="fa-solid fa-arrow-right-from-bracket"
                    ></i>
                  </div>
                  <button className="logout-btn logWord">Logout</button>
                </div>
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
            <Link
              className={`px-3 py-2 ${
                currentTab === tabs.home ? "activeOne" : ""
              }`}
              to={"/"}
            >
              Home
            </Link>
            <Link
              className={`px-3 py-2 ${
                currentTab === tabs.projects ? "activeOne" : ""
              }`}
              to={"/projects"}
            >
              Projects
            </Link>
            <Link
              className={`px-3 py-2 ${
                currentTab === tabs.skills ? "activeOne" : ""
              }`}
              to={"/skills"}
            >
              Skills
            </Link>
            <Link
              className={`px-3 py-2 ${
                currentTab === tabs.blog ? "activeOne" : ""
              }`}
              to={"/blogs"}
            >
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
              <Link
                className={`px-3 py-2 ${
                  currentTab === tabs.home ? "activeOne" : ""
                }`}
                onClick={handleViewMobileBar}
                to={"/"}
              >
                Home
              </Link>
              <Link
                className={`px-3 py-2 ${
                  currentTab === tabs.projects ? "activeOne" : ""
                }`}
                onClick={handleViewMobileBar}
                to={"/projects"}
              >
                Projects
              </Link>
              <Link
                className={`px-3 py-2 ${
                  currentTab === tabs.skills ? "activeOne" : ""
                }`}
                onClick={handleViewMobileBar}
                to={"/skills"}
              >
                Skills
              </Link>
              <Link
                className={`px-3 py-2 ${
                  currentTab === tabs.blog ? "activeOne" : ""
                }`}
                onClick={handleViewMobileBar}
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
