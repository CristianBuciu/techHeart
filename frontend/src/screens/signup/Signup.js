import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/error-message/ErrorMessage.js";
import { login } from "../../redux/user/user.actions.js";
import "./Signup.scss";
//!==========================================================
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [name, setName] = useState("");
  return (
    <div className="login-screen">
      <div className="home-screen__top">
        <h1 className="heading-1  home-screen__title">SIGNUP</h1>
      </div>
      <div className="login-screen__form-container">
        <form className="login-screen__form" action="">
          <label className="login-screen__form--input-label" htmlFor="name">
            Name
          </label>
          <input
            placeholder="Enter name"
            className="login-screen__form--input"
            value={name}
            onChange={setName}
            name="name"
            type="text"
          />
          <label className="login-screen__form--input-label" htmlFor="email">
            Email
          </label>
          <input
            placeholder="Enter email"
            className="login-screen__form--input"
            value={email}
            onChange={setEmail}
            name="email"
            type="email"
          />
          <label className="login-screen__form--input-label" htmlFor="password">
            Password
          </label>
          <input
            placeholder="Enter password"
            className="login-screen__form--input"
            value={password}
            onChange={setPassword}
            name="password"
            type="password"
          />
          <label
            className="login-screen__form--input-label"
            htmlFor="repeatPassword"
          >
            Repeat Password
          </label>
          <input
            placeholder="Repeat password"
            className="login-screen__form--input"
            value={repeatPassword}
            onChange={setRepeatPassword}
            name="repeatPassword"
            type="password"
          />
          <input
            className="login-screen__form--submit-btn"
            type="submit"
            value="Sign Up"
          />
        </form>
        <p className="signup__password-text">
          ** Password must contain at leat 6 characters, an uppercare letter, a
          lowercase letter and at least a number.
        </p>
      </div>
    </div>
  );
};

export default Signup;
