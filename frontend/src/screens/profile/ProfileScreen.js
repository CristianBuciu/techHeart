import React, { useState, useEffect } from "react";
import "./ProfileScreen.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserDetails,
  updateUserProfile,
} from "../../redux/user/user.actions.js";
import { Link } from "react-router-dom";
import ErrorMessage from "../../components/error-message/ErrorMessage.js";
//todo ADD GSAP SCROLL TO MAKE LEFT MENU STICKY
import gsap from "gsap";

//!=================================================================
const ProfileScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [city, setCity] = useState("");
  const [stateProvinceRegion, setStateProvinceRegion] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [message, setMessage] = useState(null);

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [edit, setEdit] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const cartItemsNumber = cartItems.reduce(
    (accum, cartItem) => accum + cartItem.qty,
    0
  );
  const [successColor, setSuccessColor] = useState("alert");
  const [error, setError] = useState(false);
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
        setCountry(user.country);
        setLine1(user.line1);
        setLine2(user.line2);
        setCity(user.city);
        setStateProvinceRegion(user.stateProvinceRegion);
        setPostalCode(user.postalCode);
        setPhoneNumber(user.phoneNumber);
      }
    }
  }, [history, userInfo, user]);
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
        email,
        country,
        line1,
        line2,
        city,
        stateProvinceRegion,
        postalCode,
        phoneNumber,
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
      dispatch(updateUserProfile({ id: user._id, password }));
      setPassword("");
      setConfirmPassword("");
      setMessage("Your password has been successfully changed");
      setSuccessColor("success");
    } else {
      setTimeout(() => {
        setError(true);
      }, 100);
      setError(false);
      setMessage("You must comply with all the password requisites.");
      setSuccessColor("alert");
    }
  };
  return (
    <div className="profile-screen">
      <div className="profile-screen__left">
        <h1 className="profile-screen__title">Your Account</h1>
        <Link to="/profile">
          {" "}
          <p className="profile-screen__left__options">Your Info</p>{" "}
        </Link>
        <Link to="#">
          {" "}
          <p className="profile-screen__left__options">Reviews</p>{" "}
        </Link>
        <Link to="#">
          {" "}
          <p className="profile-screen__left__options">Messages</p>{" "}
        </Link>
        <h1 className="profile-screen__title">Orders</h1>
        <Link to="#">
          {" "}
          <p className="profile-screen__left__options">Orders & Bills</p>{" "}
        </Link>
        <Link to="/checkout">
          {" "}
          <p className="profile-screen__left__options">
            Checkout <i>({cartItemsNumber} items)</i>
          </p>{" "}
        </Link>
        <Link to="#">
          {" "}
          <p className="profile-screen__left__options">Item returns</p>{" "}
        </Link>
        <Link to="#">
          {" "}
          <p className="profile-screen__left__options">Warranty</p>{" "}
        </Link>
        <h1 className="profile-screen__title">Payment</h1>
        <Link to="#">
          {" "}
          <p className="profile-screen__left__options">Your cards</p>{" "}
        </Link>
        <Link to="#">
          {" "}
          <p className="profile-screen__left__options">
            Other payment methods
          </p>{" "}
        </Link>
        <Link to="#">
          {" "}
          <p className="profile-screen__left__options">Discount coupons</p>{" "}
        </Link>
      </div>
      <div className="profile-screen__right">
        <div className="profile-screen__header">
          <div className="profile-screen__header-img">
            <h1 className="profile-screen__title--name">{name}</h1>
            <h2 className="profile-screen__title--email">{email}</h2>
            <img
              className="profile-screen__header--avatar"
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
          <h1 className="profile-screen__title">Your Info</h1>
          <div className="profile-screen__my-details">
            <div>
              <h3 className="heading-3">Personal details</h3>
              <p className="profile-screen__address-label">
                <strong>Full name</strong>
              </p>
              {edit ? (
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className="profile-screen__password-section__input"
                />
              ) : (
                <p className="profile-screen__address-text">{name}</p>
              )}
              <p className="profile-screen__address-label">
                <strong>Email</strong>
              </p>
              {edit ? (
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="profile-screen__password-section__input"
                />
              ) : (
                <p className="profile-screen__address-text">{email}</p>
              )}
              <p className="profile-screen__address-label">
                <strong>Phone number</strong>
              </p>
              {edit ? (
                <input
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  value={phoneNumber}
                  className="profile-screen__password-section__input"
                />
              ) : (
                <p className="profile-screen__address-text">{phoneNumber}</p>
              )}
            </div>
            <div className="profile-screen__address">
              <h3 className="heading-3">Shipping address</h3>
              <p className="profile-screen__address-label">
                <strong>Address</strong>
              </p>
              {edit ? (
                <input
                  onChange={(e) => setLine1(e.target.value)}
                  value={line1}
                  type="text"
                  className="profile-screen__password-section__input"
                />
              ) : (
                <p className="profile-screen__address-text">{line1}</p>
              )}

              {edit ? (
                <input
                  onChange={(e) => setLine2(e.target.value)}
                  value={line2}
                  type="text"
                  className="profile-screen__password-section__input"
                />
              ) : (
                <p className="profile-screen__address-text">{line2}</p>
              )}

              <p className="profile-screen__address-label">
                <strong>City</strong>
              </p>
              {edit ? (
                <input
                  onChange={(e) => setCity(e.target.value)}
                  value={city}
                  className="profile-screen__password-section__input"
                />
              ) : (
                <p className="profile-screen__address-text">{city}</p>
              )}

              <p className="profile-screen__address-label">
                <strong>State/Province/Region</strong>
              </p>
              {edit ? (
                <input
                  onChange={(e) => setStateProvinceRegion(e.target.value)}
                  value={stateProvinceRegion}
                  className="profile-screen__password-section__input"
                />
              ) : (
                <p className="profile-screen__address-text">
                  {stateProvinceRegion}
                </p>
              )}

              <p className="profile-screen__address-label">
                <strong>Postal Code</strong>
              </p>
              {edit ? (
                <input
                  onChange={(e) => setPostalCode(e.target.value)}
                  value={postalCode}
                  className="profile-screen__password-section__input"
                />
              ) : (
                <p className="profile-screen__address-text">{postalCode}</p>
              )}
              <p className="profile-screen__address-label">
                <strong>Country</strong>
              </p>
              {edit ? (
                <input
                  onChange={(e) => setCountry(e.target.value)}
                  value={country}
                  className="profile-screen__password-section__input"
                />
              ) : (
                <p className="profile-screen__address-text">{country}</p>
              )}
            </div>

            {edit ? (
              <button
                className="profile-screen__info-edit-btn"
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
                className="profile-screen__info-edit-btn"
                onClick={() => handleEdit()}
              >
                {" "}
                Edit info
              </button>
            )}
          </div>
          <hr className="line-break" />
          <h1 className="profile-screen__title">Password</h1>
          <div className="profile-screen__password-section">
            <form
              className="profile-screen__password-section__form"
              onSubmit={handlePasswordUpdate}
            >
              {/* <label
                className="profile-screen__password-section__label"
                htmlFor="oldPassword"
              >
                Old password
              </label> */}

              <label
                className="profile-screen__password-section__label"
                htmlFor="newPassword"
              >
                New password
              </label>

              {/* <input
                className="profile-screen__password-section__input"
                name="oldPassword"
                type="password"
              /> */}
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="profile-screen__password-section__input"
                name="newPassword"
                type="password"
              />
              <label
                className="profile-screen__password-section__label"
                htmlFor="repeatPassword"
              >
                Confirm new password
              </label>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="profile-screen__password-section__input"
                name="repeatPassword"
                type="password"
              />
            </form>
            <div className="signup__password-box profile-screen__password-section__password-box">
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
            <input
              onClick={handlePasswordUpdate}
              className="profile-screen__password-submit"
              type="submit"
              value="Update password"
            />
          </div>
          <hr className="line-break" />
        </main>
      </div>
    </div>
  );
};

export default ProfileScreen;
