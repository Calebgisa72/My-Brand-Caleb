import React from "react";
import "../../auth/login.css";

const Login = () => {
  return (
    <div className="loginAll">
      <div className="logo">
        <img className="logo-img" src="../Images/Ellipse 1.svg" alt="" />
        <img
          className="logo-name"
          src="../Images/Caleb’s Brand (2).svg"
          alt=""
        />
      </div>

      <div className="loaderContainer">
        <span className="loader"></span>
      </div>

      <div className="loginDetails">
        <form className="log" id="loginForm" action="">
          <div className="loginTab">
            <div>
              <a href="/">Back to Home</a>
            </div>
            <div className="question">Already signed up?</div>

            <div className="invalid">Invalid Username or Password.</div>

            <div className="credential">
              <div className="credentialTitle">Username:</div>
              <input
                id="username"
                name="username"
                required
                className="credentialInput"
                type="text"
                placeholder="Enter Your Username"
              />
            </div>
            <div className="credential">
              <div className="credentialTitle">Password:</div>
              <input
                id="password"
                name="password"
                required
                className="credentialInput"
                type="password"
                placeholder="Enter Your Password"
              />
            </div>
            <button type="submit" className="loginBut">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
