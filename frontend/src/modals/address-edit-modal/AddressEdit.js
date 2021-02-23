//! Core
import React, { useState, useEffect } from "react";
import "./AddressEdit.scss";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

//! Icons
import { RiCloseFill } from "react-icons/ri";
import { getUserAddresses } from "../../redux/user/user.actions.js";
//!=================================================================
const AddressEdit = ({ address }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [fullName, setFullName] = useState(address.fullName);
  const [country, setCountry] = useState(address.country);
  const [line1, setLine1] = useState(address.line1);
  const [line2, setLine2] = useState(address.line2);
  const [city, setCity] = useState(address.city);
  const [stateProvinceRegion, setStateProvinceRegion] = useState(
    address.stateProvinceRegion
  );
  const [postalCode, setPostalCode] = useState(address.postalCode);
  const [phoneNumber, setPhoneNumber] = useState(address.phoneNumber);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [history, userInfo]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const userAddress = {
        fullName: fullName,
        country: country,
        line1: line1,
        line2: line2,
        city: city,
        stateProvinceRegion: stateProvinceRegion,
        postalCode: postalCode,
        phoneNumber: phoneNumber,
      };
      await axios.put(
        `/api/users/profile/addresses/${address._id}`,
        userAddress,
        config
      );
      setShowModal(false);
      dispatch(getUserAddresses());
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <span
        onClick={() => setShowModal(true)}
        className="profile-addresses__address__bottom-links--action"
      >
        Edit
      </span>
      {showModal ? (
        <div className="edit-address">
          <form
            onSubmit={handleSubmit}
            className="edit-address__form-container"
          >
            <RiCloseFill
              onClick={() => setShowModal(false)}
              className="edit-address__close"
            />
            <h1 className="heading-1 mb-sm">Edit Address</h1>
            <label htmlFor="fullName" className="add-address__label ">
              <strong>Full name</strong>
            </label>
            <input
              required
              name="fullName"
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
              type="text"
              className="add-address__input edit-address__input"
            />
            <label htmlFor="line1" className="add-address__label ">
              <strong>Address line 1</strong>
            </label>
            <input
              required
              name="line1"
              onChange={(e) => setLine1(e.target.value)}
              value={line1}
              type="text"
              className="add-address__input edit-address__input"
            />

            <label htmlFor="line2" className="add-address__label">
              <strong>Address line 2</strong>
            </label>
            <input
              required
              name="line2"
              onChange={(e) => setLine2(e.target.value)}
              value={line2}
              type="text"
              className="add-address__input edit-address__input"
            />
            <label htmlFor="city" className="add-address__label">
              <strong>City</strong>
            </label>
            <input
              required
              name="city"
              onChange={(e) => setCity(e.target.value)}
              value={city}
              className="add-address__input edit-address__input"
            />
            <label htmlFor="stateProvinceRegion" className="add-address__label">
              <strong>State/Province/Region</strong>
            </label>
            <input
              required
              name="stateProvinceRegion"
              onChange={(e) => setStateProvinceRegion(e.target.value)}
              value={stateProvinceRegion}
              className="add-address__input edit-address__input"
            />
            <label htmlFor="postalCode" className="add-address__label">
              <strong>Postal Code</strong>
            </label>
            <input
              required
              name="postalCode"
              onChange={(e) => setPostalCode(e.target.value)}
              value={postalCode}
              className="add-address__input edit-address__input"
            />
            <label htmlFor="country" className="add-address__label">
              <strong>Country</strong>
            </label>
            <input
              required
              name="country"
              onChange={(e) => setCountry(e.target.value)}
              value={country}
              className="add-address__input edit-address__input"
            />
            <label htmlFor="phoneNumber" className="add-address__label">
              <strong>Phone Number</strong>
            </label>
            <input
              required
              name="phoneNumber"
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
              className="add-address__input edit-address__input"
            />
            <input
              required
              className="edit-address__input-btn mt-sm"
              type="submit"
              value="Edit Address"
            />
          </form>
        </div>
      ) : null}
    </>
  );
};

export default AddressEdit;
