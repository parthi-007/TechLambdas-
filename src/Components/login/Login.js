import React from "react";
import '../login/login.css'
const Login = () => {
  return (
    <div className="login-container">
      <div className="login-right">
        <form className="login-form">
          <h3>Welcome Back!</h3>
          <div className="header-txt" >
          <h2>Sign in to</h2>
          <p>lorem ipsum is simply</p>
          </div>
          <label htmlFor="userName">User name</label> <br />
          <input type="text" placeholder="Enter your username"/> 
          <label htmlFor="password">Password</label> <br />
          <input type="password" placeholder="Enter your password" />
          <button>Login</button>
        </form>
      </div>
      <div className="login-img">
        <div className="img-txt">
        <img src={require('../../Images/TLlogo.png')} alt="TechLambdas Logo" />

        <h1>Welcome to <span>TechLambdas</span> <br /> <span>PVT ltd</span></h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
