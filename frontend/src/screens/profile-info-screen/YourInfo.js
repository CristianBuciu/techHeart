//! Core
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

//! Redux
import { useSelector, useDispatch } from "react-redux";
import {
  getUserDetails,
  updateUserProfile,
} from "../../redux/user/user.actions.js";

//! Components
import ErrorMessage from "../../components/error-message/ErrorMessage.js";
import LoaderGeneric from "../../components/loader-generic/LoaderGeneric";
//!==================================================

const YourInfo = () => {
  //! Hooks
  const dispatch = useDispatch();
  const history = useHistory();
  //! State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState(null);
  const [edit, setEdit] = useState(false);
  const [successColor, setSuccessColor] = useState("alert");
  const [error, setError] = useState(false);

  //! Selectors
  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  let timer;

  //! Use Effect
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
    return () => clearTimeout(timer);
  }, [history, userInfo, user, dispatch, timer]);

  const passwordLength = password.length < 6 ? false : true;
  const passwordLowercase = /[a-z]/.test(password) < 1 ? false : true;
  const passwordUppercase = /[A-Z]/.test(password) < 1 ? false : true;
  const passwordNumber = /[0-9]/.test(password) < 1 ? false : true;
  const passwordEqualConfirmPassword =
    password !== confirmPassword ? false : true;

  const handleEdit = () => setEdit(!edit);

  const handleUserInfoUpdate = () => {
    setMessage("Your profile has been successfully updated.");
    setSuccessColor("success");
    dispatch(
      updateUserProfile({
        id: user._id,
        name,
      })
    );
  };
  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    //!Password check =====================

    if (
      passwordLength &&
      passwordLowercase &&
      passwordUppercase &&
      passwordNumber &&
      passwordEqualConfirmPassword
    ) {
      //! Dispatch Login ====================
      dispatch(
        updateUserProfile({
          id: user._id,
          password,
        })
      );
      setPassword("");
      setConfirmPassword("");
      setMessage("Your password has been successfully changed");
      setSuccessColor("success");
    } else {
      timer = setTimeout(() => {
        setError(true);
      }, 100);
      setError(false);
      setMessage("You must comply with all the password requisites.");
      setSuccessColor("alert");
    }
  };
  return loading ? (
    <LoaderGeneric />
  ) : (
    <div className="your-info">
      <div className="your-info__header">
        <div className="your-info__header-img">
          <h1 className="your-info__title--name">{name}</h1>
          <h2 className="your-info__title--email">{email}</h2>
          <img
            className="your-info__header--avatar"
            src="https://st4.depositphotos.com/5575514/23597/v/600/depositphotos_235978748-stock-illustration-neutral-profile-picture.jpg"
            alt="avatar"
          />
        </div>
      </div>
      <main className="profile-main">
        {success ? (
          <ErrorMessage color={successColor}>{message}</ErrorMessage>
        ) : null}
        {error ? (
          <ErrorMessage color={successColor}>{message}</ErrorMessage>
        ) : null}
        <h1 className="heading-1">YOUR INFO</h1>
        <div className="your-info__my-details">
          <div>
            <h3 className="heading-3">Personal details</h3>
            <p className="your-info__address-label">
              <strong>Full name</strong>
            </p>
            {edit ? (
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="your-info__password-section__input"
              />
            ) : (
              <p className="your-info__address-text">{name}</p>
            )}
            <p className="your-info__address-label">
              <strong>Email</strong>
            </p>

            <p className="your-info__address-text">{email}</p>
            {edit ? (
              <p
                style={{
                  fontSize: "1.2rem",
                  color: "grey",
                  marginBottom: "1rem",
                }}
              >
                Email cannot be changed
              </p>
            ) : (
              <p style={{ fontSize: "1.2rem" }}>&nbsp;</p>
            )}
          </div>

          {edit ? (
            <button
              className="your-info__info-edit-btn"
              onClick={() => {
                handleEdit();
                handleUserInfoUpdate();
              }}
            >
              {" "}
              Save changes
            </button>
          ) : (
            <button
              className="your-info__info-edit-btn"
              onClick={() => handleEdit()}
            >
              {" "}
              Edit info
            </button>
          )}
        </div>
        <div className="line-break" />
        <h3 className=" heading-3 your-info__title">Password</h3>
        <div className="your-info__password-section">
          <form
            className="your-info__password-section__form"
            onSubmit={handlePasswordUpdate}
          >
            {/* <label
          className="your-info__password-section__label"
          htmlFor="oldPassword"
        >
          Old password
        </label> */}

            <label
              className="your-info__password-section__label"
              htmlFor="newPassword"
            >
              New password
            </label>

            {/* <input
          className="your-info__password-section__input"
          name="oldPassword"
          type="password"
        /> */}
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="your-info__password-section__input"
              name="newPassword"
              type="password"
            />
            <label
              className="your-info__password-section__label"
              htmlFor="repeatPassword"
            >
              Confirm new password
            </label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="your-info__password-section__input"
              name="repeatPassword"
              type="password"
            />
          </form>
          <div className="signup__password-box your-info__password-section__password-box">
            <h3>New password must:</h3>
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
          <button
            onClick={handlePasswordUpdate}
            className="your-info__password-submit"
          >
            Update password
          </button>
        </div>
        <div className="line-break" />
      </main>
    </div>
  );
};

export default YourInfo;
