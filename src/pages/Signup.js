import React, { useState } from "react";
import Navbar from "../components/Navbar";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = () => {
    const data = {
      name,
      email,
      password,
    };
    fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then((signup)=>signup.json())
    .then((signup)=>{
        console.log({signup})
    })
    .catch((signup__error)=>{
        console.log({signup__error})
    })
  };
  return (
    <div>
      <Navbar />

      <div className="signup m-5">
        <h2>Create Account </h2>
        <br />
        <br />
        <input
          className="form-control"
          type="text"
          placeholder="enter name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
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
          placeholder="enter password "
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <br />
        <button className="btn btn-success" onClick={signUp}>
          SignUp
        </button>
      </div>
    </div>
  );
};

export default Signup;
