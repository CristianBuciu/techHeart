import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetails,
  addAddress,
  getUserAddresses,
} from "../../redux/user/user.actions.js";
import "./ProfileAddresses.scss";
import { BsPlusSquare } from "react-icons/bs";
import axios from "axios";
//!=============================================

const ProfileAddresses = ({ history }) => {
  const dispatch = useDispatch();

  const [addAddressToggle, setAddAddressToggle] = useState(false);
  const [fullName, setFullName] = useState("");
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

  const [successColor, setSuccessColor] = useState("alert");
  const [error, setError] = useState(false);
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;
  const [message, setMessage] = useState(null);
  const userAddresses = useSelector((state) => state.userAddresses);

  const { addresses } = userAddresses;

  const handleAddAddress = () => {
    setAddAddressToggle(!addAddressToggle);
  };
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    dispatch(getUserAddresses());
  }, [history, userInfo, user, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("Address added successfully.");
    setSuccessColor("success");
    dispatch(
      addAddress({
        id: user._id,
        fullName,
        country,
        line1,
        line2,
        city,
        stateProvinceRegion,
        postalCode,
        phoneNumber,
      })
    );
    dispatch(getUserAddresses());
    setFullName("");
    setCountry("");
    setLine1("");
    setLine2("");
    setCity("");
    setStateProvinceRegion("");
    setPostalCode("");
    setPhoneNumber("");
  };

  const deleteAddressHandler = (id) => {
    const deleteAddress = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        await axios.delete(`/api/users/profile/addresses/${id}`, config);

        dispatch(getUserAddresses());
      } catch (error) {
        console.log(error);
      }
    };
    deleteAddress();
  };

  return (
    <div className="profile-addresses">
      <h1 className="heading-1  home-screen__title">YOUR ADDRESSES</h1>
      <div className="profile-addresses__grid">
        {addresses.map((address, idx) => (
          <div className="profile-addresses__address" key={address._id}>
            <h3 className="profile-addresses__address__title">
              Address {idx + 1}
            </h3>

            <address>
              <p className="profile-addresses__text">
                <strong>{address.fullName}</strong>
              </p>
              <p className="profile-addresses__text">{address.line1}</p>
              <p className="profile-addresses__text">{address.line2}</p>
              <p className="profile-addresses__text">{address.city}</p>
              <p className="profile-addresses__text">
                {address.stateProvinceRegion}
              </p>
              <p className="profile-addresses__text">{address.postalCode}</p>
              <p className="profile-addresses__text">{address.country}</p>
              <p className="profile-addresses__text">{address.phoneNumber}</p>
            </address>
            <div className="profile-addresses__address__bottom-links">
              <Link
                to={`/profile/addresses/${address._id}`}
                className="profile-addresses__address__bottom-links--action"
              >
                Edit
              </Link>
              <span
                onClick={() => {
                  deleteAddressHandler(address._id);
                }}
                className="profile-addresses__address__bottom-links--action profile-addresses__address__bottom-links--action--delete"
              >
                Delete
              </span>
            </div>
          </div>
        ))}
        <address
          onClick={handleAddAddress}
          className="profile-addresses__address profile-addresses__add-address"
        >
          <BsPlusSquare style={{ fontSize: "8rem" }} />
          Add new address
        </address>
      </div>
      <hr className="line-break" />

      {addAddressToggle ? (
        <form
          onSubmit={handleSubmit}
          className="profile-addresses__form-container"
        >
          <label htmlFor="fullName" className="profile-addresses__label">
            <strong>Full name</strong>
          </label>
          <input
            name="line1"
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            type="text"
            className="profile-addresses__input"
          />
          <label htmlFor="line1" className="profile-addresses__label">
            <strong>Address line 1</strong>
          </label>
          <input
            name="line1"
            onChange={(e) => setLine1(e.target.value)}
            value={line1}
            type="text"
            className="profile-addresses__input"
          />

          <label htmlFor="line2" className="profile-addresses__label">
            <strong>Address line 2</strong>
          </label>
          <input
            name="line2"
            onChange={(e) => setLine2(e.target.value)}
            value={line2}
            type="text"
            className="profile-addresses__input"
          />
          <label htmlFor="city" className="profile-addresses__label">
            <strong>City</strong>
          </label>
          <input
            name="city"
            onChange={(e) => setCity(e.target.value)}
            value={city}
            className="profile-addresses__input"
          />
          <label
            htmlFor="stateProvinceRegion"
            className="profile-addresses__label"
          >
            <strong>State/Province/Region</strong>
          </label>
          <input
            name="stateProvinceRegion"
            onChange={(e) => setStateProvinceRegion(e.target.value)}
            value={stateProvinceRegion}
            className="profile-addresses__input"
          />
          <label htmlFor="postalCode" className="profile-addresses__label">
            <strong>Postal Code</strong>
          </label>
          <input
            name="postalCode"
            onChange={(e) => setPostalCode(e.target.value)}
            value={postalCode}
            className="profile-addresses__input"
          />
          <label htmlFor="country" className="profile-addresses__label">
            <strong>Country</strong>
          </label>
          <input
            name="country"
            onChange={(e) => setCountry(e.target.value)}
            value={country}
            className="profile-addresses__input"
          />
          <label htmlFor="phoneNumber" className="profile-addresses__label">
            <strong>Phone Number</strong>
          </label>
          <input
            name="phoneNumber"
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
            className="profile-addresses__input"
          />
          <input
            className="profile-addresses__input-btn"
            type="submit"
            value="Add new Address"
          />
        </form>
      ) : null}
    </div>
  );
};

export default ProfileAddresses;
