import React, { useState } from "react";
import "../login/login.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Slide, toast, ToastContainer } from "react-toastify";

const Login = () => {
  const [logInUser, setlogInUser] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const nav = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setlogInUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = logInUser;

    let valid = true;
    const newErrors = {};

    if (!username) {
      newErrors.username = "*Username is required";
      valid = false;
    }
    if (!password) {
      newErrors.password = "*Password is required";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "*Minimum 6 characters are required";
      valid = false;
    }

    if (valid) {
      console.log(logInUser, "user...");
      toast.success(`Welcome ${logInUser.username}`);
      setTimeout(() => {
        nav("/purchase-view");
      }, 2000);
    } else {
      setErrors(newErrors);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="login-container">
      <div className="login-right">
        <form className="login-form" onSubmit={handleSubmit}>
          <h3>Welcome Back!</h3>
          <div className="header-txt">
            <h2>Sign in to</h2>
            <p>lorem ipsum is simply</p>
          </div>
          <label htmlFor="username">User name</label> <br />
          <input
            type="text"
            placeholder="Enter your username"
            name="username"
            value={logInUser.username}
            onChange={handleChange}
          />
          {errors.username && (
            <span className="error-msg">{errors.username}</span>
          )}{" "}
          <br />
          <label htmlFor="password">Password</label> <br />
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              name="password"
              value={logInUser.password}
              onChange={handleChange}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEye : faEyeSlash}
              onClick={togglePasswordVisibility}
              className="eye-icon"
            />
          </div>
          {errors.password && (
            <span className="error-msg">{errors.password}</span>
          )}
          <button type="submit">Login</button>
        </form>
      </div>
      <div className="login-img">
        <div className="img-txt">
          <img
            src={require("../../Images/Tlogo2.png")}
            alt="TechLambdas Logo"
          />
          <h1>
            Welcome to <span>TechLambdas</span> <br /> <span>PVT ltd</span>
          </h1>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        transition={Slide}
        transitionDuration={750}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        style={{ width: "400px" }}
      />
    </div>
  );
};

export default Login;
