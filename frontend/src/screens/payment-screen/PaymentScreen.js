import React, { useState, useEffect } from "react";
import "./PaymentScreen.scss";
import CheckoutSteps from "../../components/checkout-steps/CheckoutSteps";

import { useDispatch, useSelector } from "react-redux";
import { saveOrderPaymentMethod } from "../../redux/order/order.actions.js";
import { GrPaypal, GrStripe } from "react-icons/gr";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";

import { BsCreditCard } from "react-icons/bs";
import { ReactComponent as DHL } from "../../assets/dhl-express.svg";
import { ReactComponent as Correos } from "../../assets/correos.svg";
//!=======================================================

const PaymentScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const orderAddressState = useSelector((state) => state.orderAddress);
  const { orderAddress } = orderAddressState;

  const orderPaymentMethod = useSelector((state) => state.orderPaymentMethod);

  useEffect(() => {
    if (
      orderPaymentMethod.paymentMethod &&
      orderPaymentMethod.shippingMethod.name
    ) {
      history.push("/complete-order");
    }
    if (!orderAddress.fullName) {
      history.push("/shipping");
    }
  }, [orderAddress, history]);

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [shippingMethod, setShippingMethod] = useState({
    name: "DHL Standard Delivery",
    price: 5.99,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveOrderPaymentMethod(paymentMethod, shippingMethod));
    history.push("/complete-order");
  };

  const paymentMethodHandler = (e) => setPaymentMethod(e.target.value);
  const shippmentMethodHandler = (e) =>
    setShippingMethod({ price: Number(e.target.value), name: e.target.id });
  return (
    <div className="payment-screen shipping-section">
      <CheckoutSteps />
      <div>
        <h1 className="heading-1  mt-sm mb-sm">Chose a payment method</h1>
        <form onSubmit={handleSubmit}>
          <label className="payment-screen__label mb-md" htmlFor="PayPal">
            <input
              id="PayPal"
              className="payment-screen__input mr-md"
              name="paymentmethod"
              type="radio"
              value="PayPal"
              onChange={paymentMethodHandler}
              defaultChecked
            />
            <GrPaypal className="payment-screen__payment-icon mr-sm" />
            PayPal
          </label>
          <label
            className="payment-screen__label payment-screen__label--disabled mb-md"
            htmlFor="CreditCard"
          >
            <input
              id="CreditCard"
              className="payment-screen__input  mr-md"
              name="paymentmethod"
              type="radio"
              value="Credit Card"
              onChange={paymentMethodHandler}
              disabled
            />
            <BsCreditCard className="payment-screen__payment-icon payment-screen__payment-icon--disabled mr-sm" />{" "}
            Credit Card
          </label>
          <label
            className="payment-screen__label  payment-screen__label--disabled mb-md"
            htmlFor="Stripe"
          >
            <input
              id="Stripe"
              className="payment-screen__input payment-screen__input--disabled mr-md"
              name="paymentmethod"
              type="radio"
              value="Stripe"
              onChange={paymentMethodHandler}
              disabled
            />
            <GrStripe className="payment-screen__payment-icon mr-sm" /> Stripe
          </label>

          <div className="line-break" />
          <h1 className="heading-1  mt-sm mb-sm">Chose a shipping method</h1>

          <label className="payment-screen__label " htmlFor="DHLStandard">
            <input
              id="DHL Standard Shipping"
              className="payment-screen__input mr-md"
              name="shippingOption"
              type="radio"
              value={5.99}
              onChange={shippmentMethodHandler}
              defaultChecked
            />
            <DHL
              style={{ width: "7rem", height: "7rem" }}
              className="payment-screen__payment-icon mr-sm"
            />
            DHL Standard Shipping <strong>&nbsp;&nbsp;( + 5.99 €)</strong>
          </label>
          <label className="payment-screen__label " htmlFor="DHL1Day">
            <input
              id="DHL 1 Day Delivery"
              className="payment-screen__input mr-md"
              name="shippingOption"
              type="radio"
              value={8.99}
              onChange={shippmentMethodHandler}
            />
            <DHL
              style={{ width: "7rem", height: "7rem" }}
              className="payment-screen__payment-icon mr-sm"
            />
            DHL 1 Day Delivery <strong>&nbsp;&nbsp;( + 8.99 €)</strong>
          </label>
          <label className="payment-screen__label mb-md" htmlFor="Correos">
            <input
              id="Correos 3-5 Day Delivery"
              className="payment-screen__input mr-md"
              name="shippingOption"
              type="radio"
              value={3.99}
              onChange={shippmentMethodHandler}
            />
            <Correos
              style={{ width: "7rem", height: "7rem" }}
              className="payment-screen__payment-icon mr-sm"
            />
            Correos 3-5 Day Delivery <strong>&nbsp;&nbsp;( + 3.99 €)</strong>
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
