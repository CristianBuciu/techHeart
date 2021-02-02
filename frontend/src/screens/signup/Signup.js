import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/error-message/ErrorMessage.js";
import { register } from "../../redux/user/user.actions.js";
import "./Signup.scss";
import { Link, useHistory } from "react-router-dom";

//!==========================================================
const Signup = ({ location }) => {
  const redirect = location.search ? location.search.split("+")[1] : "/";
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState(null);
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  const history = useHistory();
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, redirect]);
  const passwordLength = password.length < 6 ? false : true;
  const passwordLowercase = /[a-z]/.test(password) < 1 ? false : true;
  const passwordUppercase = /[A-Z]/.test(password) < 1 ? false : true;
  const passwordNumber = /[0-9]/.test(password) < 1 ? false : true;
  const passwordEqualConfirmPassword =
    password !== confirmPassword ? false : true;

  const submitHandler = (e) => {
    e.preventDefault();
    history.push("/shop");
    //!Password check =====================

    if (
      passwordLength &&
      passwordLowercase &&
      passwordUppercase &&
      passwordNumber &&
      passwordEqualConfirmPassword
    ) {
      //! Dispatch Login ====================
      dispatch(register(name, email, password));
    } else {
      setMessage("You must comply with all the password requisites.");
    }
  };
  return (
    <div className="login-screen">
      <div className="home-screen__top">
        <h1 className="heading-1  home-screen__title">SIGNUP</h1>
      </div>
      {error && <ErrorMessage color="alert">{error}</ErrorMessage>}

      <div className="login-screen__form-container">
        <form className="login-screen__form" onSubmit={submitHandler}>
          <label className="login-screen__form--input-label" htmlFor="name">
            Name
          </label>
          <input
            placeholder="Enter name"
            className="login-screen__form--input"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          <label
            className="login-screen__form--input-label"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            placeholder="Confirm password"
            className="login-screen__form--input"
            value={confirmPassword}
            onChange={(e) => setconfirmPassword(e.target.value)}
            name="confirmPassword"
            type="password"
          />
          {message && <p className="signup__password-error">{message}</p>}
          <div className="signup__password-box">
            <h3>Password must:</h3>
            <p
              className={
                passwordEqualConfirmPassword
                  ? "signup__password-box--fail"
                  : "signup__password-box--checked"
              }
            >
              match Confirm Password
            </p>
            <p
              className={
                passwordUppercase
                  ? "signup__password-box--fail"
                  : "signup__password-box--checked"
              }
            >
              contain an uppercase letter
            </p>
            <p
              className={
                passwordLowercase
                  ? "signup__password-box--fail"
                  : "signup__password-box--checked"
              }
            >
              contain an lowercase letter
            </p>
            <p
              className={
                passwordNumber
                  ? "signup__password-box--fail"
                  : "signup__password-box--checked"
              }
            >
              contain a number
            </p>
            <p
              className={
                passwordLength
                  ? "signup__password-box--fail"
                  : "signup__password-box--checked"
              }
            >
              be at least 6 characters long
            </p>
          </div>
          <input
            className="login-screen__form--submit-btn"
            type="submit"
            value="Register"
          />
        </form>

        <Link
          className="login-screen__create-account-link"
          to={redirect ? "/login?redirect=${redirect}" : "/login"}
        >
          Have an account? Log in here.
        </Link>
      </div>
    </div>
  );
};

export default Signup;
