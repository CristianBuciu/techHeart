import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
//!=================================================================
const AddressEdit = ({ match, history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  const [country, setCountry] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [city, setCity] = useState("");
  const [stateProvinceRegion, setStateProvinceRegion] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(async () => {
    if (!userInfo) {
      history.push("/login");
    }
    try {
      const { data } = await axios.get(
        `/api/users/profile/addresses/${match.params.id}`,
        config
      );
      setCountry(data.country);
      setLine1(data.line1);
      setLine2(data.line2);
      setCity(data.city);
      setStateProvinceRegion(data.stateProvinceRegion);
      setPostalCode(data.postalCode);
      setPhoneNumber(data.phoneNumber);
    } catch (error) {
      console.error(error);
    }
  }, [match, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const address = {
        country: country,
        line1: line1,
        line2: line2,
        city: city,
        stateProvinceRegion: stateProvinceRegion,
        postalCode: postalCode,
        phoneNumber: phoneNumber,
      };
      await axios.put(
        `/api/users/profile/addresses/${match.params.id}`,
        address,
        config
      );
      history.push("/profile/addresses");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <h1 className="heading-1">Edit Address</h1>
      <form
        onSubmit={handleSubmit}
        className="profile-addresses__form-container"
      >
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
          value="Edit Address"
        />
      </form>
    </>
  );
};

export default AddressEdit;
