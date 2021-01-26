import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/error-message/ErrorMessage.js";
import { login } from "../../redux/user/user.actions.js";
import "./Login.scss";
//!==========================================================
const Login = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("+")[1] : "/shop";

  //! Check if we are logged in so you get a redirect if you try to access the login route while logged in

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    //! Dispatch Login ====================
    dispatch(login(email, password));
  };
  return (
    <div className="login-screen">
      <div className="home-screen__top">
        <h1 className="heading-1  home-screen__title">SIGNIN</h1>
      </div>
      {error && <ErrorMessage color="alert">{error}</ErrorMessage>}

      <div className="login-screen__form-container">
        <form className="login-screen__form" onSubmit={submitHandler}>
          <label className="login-screen__form--input-label" htmlFor="email">
            Email Address
          </label>
          <input
            placeholder="Enter email"
            className="login-screen__form--input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type="password"
          />
          <input
            className="login-screen__form--submit-btn"
            type="submit"
            value="Sign In"
          />
        </form>
        <Link
          className="login-screen__create-account-link"
          to={redirect ? "/register?redirect=${redirect}" : "/register"}
        >
          Don't have an account? Create one here.
        </Link>
      </div>
    </div>
  );
};

export default Login;
