//! Core
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./ShippingScreen.scss";
import { useHistory } from "react-router-dom";
import axios from "axios";

//! Components
import AddAddress from "../../components/add-address/AddAddress";
import AddressEdit from "../../modals/address-edit-modal/AddressEdit";
import CheckoutSteps from "../../components/checkout-steps/CheckoutSteps";

//! Redux Actions
import { getUserAddresses } from "../../redux/user/user.actions.js";
import { addOrderAddress } from "../../redux/order/order.actions.js";

//! Icons
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { AiOutlineDoubleRight } from "react-icons/ai";

//!=======================================================
const ShippingScreen = () => {
  //! Hooks
  const history = useHistory();
  const dispatch = useDispatch();

  //! State
  const [addAddressShow, setAddAddressShow] = useState(false);

  //! Selectors

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderAddressSelector = useSelector((state) => state.orderAddress);
  const { orderAddress } = orderAddressSelector;

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const userAddresses = useSelector((state) => state.userAddresses);
  const { addresses } = userAddresses;

  //! Use Effect
  useEffect(() => {
    if (orderAddress.fullName) {
      history.push("/payment");
    }
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(getUserAddresses());
    }
  }, [history, userInfo, user, dispatch, orderAddress]);

  //! Handlers
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

  const handleSubmit = (address) => {
    dispatch(addOrderAddress(address));
    history.push("/payment");
  };

  //! Return
  return (
    <div className="shipping-screen shipping-section">
      <CheckoutSteps />
      <div>
        <h1 className="heading-1  mt-sm mb-sm">Chose a delivery address</h1>
        <div className="shipping-screen__address-container">
          {addresses
            ? addresses.map((address) => (
                <div key={address._id} className="shipping-screen__address">
                  <address
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      marginBottom: "2rem",
                    }}
                  >
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
                  </address>
                  <button
                    onClick={() => handleSubmit(address)}
                    className="shipping-screen__ship-btn"
                  >
                    Deliver to this address{" "}
                    <AiOutlineDoubleRight className="payment-screen__arrows" />{" "}
                  </button>
                  <div className="shipping-screen__delete-edit-container mt-xs mb-xs">
                    <AddressEdit address={address} />
                    <span
                      onClick={() => {
                        deleteAddressHandler(address._id);
                      }}
                      className="shipping-screen--action shipping-screen--action--delete"
                    >
                      Delete
                    </span>
                  </div>
                </div>
              ))
            : ""}
        </div>

        <div className="line-break" />
        <h2
          onClick={() => setAddAddressShow(!addAddressShow)}
          className="heading-2 shipping-screen__add-address mb-sm"
        >
          Add new address&nbsp;
          {addAddressShow ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
        </h2>
        {addAddressShow ? <AddAddress /> : ""}
      </div>
    </div>
  );
};

export default ShippingScreen;
