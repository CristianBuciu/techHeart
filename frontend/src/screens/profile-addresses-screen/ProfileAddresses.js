import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserAddresses } from "../../redux/user/user.actions.js";
import "./ProfileAddresses.scss";
import AddressEdit from "../../modals/address-edit-modal/AddressEdit";
import AddAddress from "../../components/add-address/AddAddress.js";
import axios from "axios";
//!=============================================

const ProfileAddresses = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [addAddressToggle, setAddAddressToggle] = useState(false);

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

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
      <h1 className="heading-1 ">YOUR ADDRESSES</h1>
      <div className="profile-addresses__grid">
        {addresses
          ? addresses.map((address, idx) => (
              <div key={address._id} className="gradient-wrapper">
                <div className="profile-addresses__address">
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
                    <p className="profile-addresses__text">
                      {address.phoneNumber}
                    </p>
                  </address>
                  <div className="profile-addresses__address__bottom-links">
                    <AddressEdit address={address} />
                    <span
                      onClick={() => {
                        deleteAddressHandler(address._id);
                      }}
                      className="profile-addresses__address__bottom-links--action "
                    >
                      Delete
                    </span>
                  </div>
                </div>
              </div>
            ))
          : ""}
        <address
          onClick={handleAddAddress}
          className="profile-addresses__address profile-addresses__add-address"
        >
          <span style={{ fontSize: "8rem" }}>&#9783;</span>
          Add new address
        </address>
      </div>
      <div className="line-break" />

      {addAddressToggle ? <AddAddress /> : null}
    </div>
  );
};

export default ProfileAddresses;
