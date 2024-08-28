import React, { ChangeEvent, FormEvent, useState } from "react";
import "../../auth/login.css";
import logo from "../../Images/Ellipse 1.svg";
import logoName from "../../Images/Caleb’s Brand (2).svg";
import axios from "axios";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { setToken } from "../Redux/Reducers/authReducer";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Redux/store";

const Login = () => {
  const initial = {
    username: "",
    password: "",
  };
  const [credentials, setCredentials] = useState(initial);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/auth/signin`,
        credentials
      );

      if (response.status === 200) {
        dispatch(setToken(response.data.token));
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log("Failed to login", error);
    } finally {
      setLoading(false);
      setCredentials(initial);
    }
  };
  return (
    <div className="loginAll">
      <div className="logo">
        <img className="logo-img" src={logo} alt="" />
        <img className="logo-name" src={logoName} alt="" />
      </div>

      <div className="loginDetails">
        <form className="log" id="loginForm" onSubmit={handleLogin}>
          <div className="loginTab">
            <div>
              <a href="/">Back to Home</a>
            </div>
            <div className="question">Already signed up?</div>

            <div className="invalid">Invalid Username or Password.</div>

            <div className="credential">
              <div className="credentialTitle">Username:</div>
              <input
                required
                className="credentialInput"
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                placeholder="Enter Your Username"
              />
            </div>
            <div className="credential">
              <div className="credentialTitle">Password:</div>
              <input
                name="password"
                required
                value={credentials.password}
                className="credentialInput"
                onChange={handleChange}
                type="password"
                placeholder="Enter Your Password"
              />
            </div>
            <button
              type="submit"
              className="loginBut flex items-center justify-center"
            >
              {!loading ? (
                "Login"
              ) : (
                <Loader2 className="animate-spin w-4 text-black" />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
