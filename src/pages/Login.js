import React, { useState } from "react";
import Navbar from "../components/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Login = () => {
     const data = {
   
      email,
      password,
    };
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then((login)=>login.json())
    .then((login)=>{
        console.log({login})
        localStorage.setItem("auth-token",login.authtoken)
    })
    .catch((login__error)=>{
        console.log({login__error})
    })
  };
  return (
    <div>
        <Navbar/>
      <div className="login m-5">
        <h2>Login </h2>
      
        <br />
        <br />
        <input
        className="form-control"
          type="email"
          placeholder="enter email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <br />
        <input
        className="form-control"
          type="password"
          placeholder="enter password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <br />
        <button className="btn btn-success" onClick={Login}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
