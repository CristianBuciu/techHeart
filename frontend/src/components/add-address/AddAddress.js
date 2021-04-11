import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAddresses, addAddress } from "../../redux/user/user.actions.js";
//!=============================================================================
const AddAddress = () => {
  const dispatch = useDispatch();

  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [city, setCity] = useState("");
  const [stateProvinceRegion, setStateProvinceRegion] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [successColor, setSuccessColor] = useState("alert");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.reload();
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
  return (
    <>
      <form onSubmit={handleSubmit} className="add-address__form-container">
        <label htmlFor="fullName" className="add-address__label">
          <strong>Full name</strong>
        </label>
        <input
          required
          name="line1"
          onChange={(e) => setFullName(e.target.value)}
          value={fullName}
          type="text"
          className="add-address__input"
        />
        <label htmlFor="line1" className="add-address__label">
          <strong>Address line 1</strong>
        </label>
        <input
          required
          name="line1"
          onChange={(e) => setLine1(e.target.value)}
          value={line1}
          type="text"
          className="add-address__input"
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
          className="add-address__input"
        />
        <label htmlFor="city" className="add-address__label">
          <strong>City</strong>
        </label>
        <input
          required
          name="city"
          onChange={(e) => setCity(e.target.value)}
          value={city}
          className="add-address__input"
        />
        <label htmlFor="stateProvinceRegion" className="add-address__label">
          <strong>State/Province/Region</strong>
        </label>
        <input
          required
          name="stateProvinceRegion"
          onChange={(e) => setStateProvinceRegion(e.target.value)}
          value={stateProvinceRegion}
          className="add-address__input"
        />
        <label htmlFor="postalCode" className="add-address__label">
          <strong>Postal Code</strong>
        </label>
        <input
          required
          name="postalCode"
          onChange={(e) => setPostalCode(e.target.value)}
          value={postalCode}
          className="add-address__input"
        />
        <label htmlFor="country" className="add-address__label">
          <strong>Country</strong>
        </label>
        <input
          required
          name="country"
          onChange={(e) => setCountry(e.target.value)}
          value={country}
          className="add-address__input"
        />
        <label htmlFor="phoneNumber" className="add-address__label">
          <strong>Phone Number</strong>
        </label>
        <input
          required
          name="phoneNumber"
          onChange={(e) => setPhoneNumber(e.target.value)}
          value={phoneNumber}
          className="add-address__input"
        />
        <input
          required
          className="add-address__input-btn"
          type="submit"
          value="Add new Address"
        />
      </form>
    </>
  );
};

export default AddAddress;
