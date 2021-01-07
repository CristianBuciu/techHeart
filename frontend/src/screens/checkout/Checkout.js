import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/error-message/ErrorMessage.js";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/cart/cart.actions.js";

import "./Checkout.scss";
//!=======================================================
const Checkout = ({ match, location, history }) => {
  return <div className="checkout-screen">checkout page</div>;
};

export default Checkout;
