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
import AddAddress from "../add-address/AddAddress.js";
import axios from "axios";
//!=============================================

const ProfileAddresses = ({ history }) => {
  const dispatch = useDispatch();

  const [addAddressToggle, setAddAddressToggle] = useState(false);

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

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
              <p className="profile-addresses__text">
                {address.city} , {address.stateProvinceRegion} ,{" "}
                {address.postalCode}
              </p>

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

      {addAddressToggle ? <AddAddress /> : null}
    </div>
  );
};

export default ProfileAddresses;
