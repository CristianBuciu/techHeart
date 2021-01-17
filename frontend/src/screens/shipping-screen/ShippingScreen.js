import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./ShippingScreen.scss";
import {
  getUserDetails,
  updateUserProfile,
} from "../../redux/user/user.actions.js";
//!=======================================================
const ShippingScreen = ({ history }) => {
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

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setCountry(user.country);
    setLine1(user.line1);
    setLine2(user.line2);
    setCity(user.city);
    setStateProvinceRegion(user.stateProvinceRegion);
    setPostalCode(user.postalCode);
    setPhoneNumber(user.phoneNumber);
  }, [user]);

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

  const [successColor, setSuccessColor] = useState("alert");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);

  return (
    <div className="shipping-screen">
      <h1 className="heading-1">Shipping Options</h1>
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
    </div>
  );
};

export default ShippingScreen;
