import React, { useState, useEffect } from "react";
import "./PaymentScreen.scss";
import CheckoutSteps from "../../components/checkout-steps/CheckoutSteps";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { saveOrderPaymentMethod } from "../../redux/order/order.actions.js";
import { GrPaypal, GrCreditCard, GrStripe } from "react-icons/gr";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";

//!=======================================================

const PaymentScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const shippingAddress = useSelector((state) => state.orderAddress);
  const { orderAddress } = shippingAddress;
  if (!orderAddress) {
    history.push("/shipping");
  }
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveOrderPaymentMethod(paymentMethod));
    history.push("/place-order");
  };
  return (
    <div className="payment-screen">
      <CheckoutSteps
        active2="selected"
        active1="selected"
        animate1=""
        animate2="animate"
      />
      <div>
        <h1 className="heading-1  mt-sm mb-sm">Chose a payment method</h1>
        <form onSubmit={submitHandler}>
          <label className="payment-screen__label mb-md" htmlFor="PayPal">
            <input
              id="PayPal"
              className="payment-screen__input mr-md"
              name="paymentmethod"
              type="radio"
              value="PayPal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <GrPaypal className="payment-screen__payment-icon mr-sm" />
            PayPal
          </label>
          <label className="payment-screen__label mb-md" htmlFor="CreditCard">
            <input
              id="CreditCard"
              className="payment-screen__input mr-md"
              name="paymentmethod"
              type="radio"
              value="CreditCard"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <GrCreditCard className="payment-screen__payment-icon mr-sm" />{" "}
            Credit Card
          </label>
          <label className="payment-screen__label mb-md" htmlFor="Stripe">
            <input
              id="Stripe"
              className="payment-screen__input mr-md"
              name="paymentmethod"
              type="radio"
              value="Stripe"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <GrStripe className="payment-screen__payment-icon mr-sm" /> Stripe
          </label>
          <button className="payment-screen__ship-btn">
            Continue <AiOutlineDoubleRight className="payment-screen__arrows" />{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentScreen;
