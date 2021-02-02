import React from "react";
import "./CheckoutStepts.scss";
import { Link, useHistory } from "react-router-dom";

import { AiOutlineDoubleRight } from "react-icons/ai";
import { GiTechnoHeart } from "react-icons/gi";
import { useSelector, useDispatch } from "react-redux";
//!=====================================================================
const CheckoutSteps = ({ active3 }) => {
  const history = useHistory();
  const orderAddressState = useSelector((state) => state.orderAddress);
  const { orderAddress } = orderAddressState;

  const orderPaymentMethod = useSelector((state) => state.orderPaymentMethod);
  const selectedShipment = orderAddress.fullName ? "selected" : "";
  const selectedPayment =
    orderPaymentMethod.paymentMethod !== "" ? "selected" : "";
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="nav__logo-container mb-sm"
      >
        <GiTechnoHeart className="nav__logo" />{" "}
        <Link to="/">
          <h2 className="nav__title">Cyber Heart</h2>
        </Link>
      </div>
      <Link to="/">
        <h2 className="nav__title"></h2>
      </Link>
      <div className="checkout-steps">
        <div className="checkout-steps__progress">
          <span
            className={`checkout-steps__number checkout-steps__number--${selectedShipment}`}
          >
            1
          </span>{" "}
          <p
            onClick={() => history.push("/shipping")}
            className="checkout-steps__container"
          >
            <span
              className={`checkout-steps--text checkout-steps--text--${selectedShipment} `}
            >
              Address
            </span>
          </p>
          <AiOutlineDoubleRight
            className={`checkout-steps--arrows checkout-steps--arrows--${selectedShipment}  checkout-steps--arrows--animate`}
          />
        </div>
        <div className="checkout-steps__progress">
          <span
            className={`checkout-steps__number  checkout-steps__number--${selectedPayment} `}
          >
            2
          </span>{" "}
          <p
            onClick={() => history.push("/payment")}
            className="checkout-steps__container"
          >
            <span
              className={`checkout-steps--text checkout-steps--text--${selectedPayment} `}
            >
              Payment & Shipping
            </span>
          </p>
          <AiOutlineDoubleRight
            className={`checkout-steps--arrows checkout-steps--arrows--${selectedPayment} checkout-steps--arrows--animate`}
          />
        </div>
        <div className="checkout-steps__progress">
          <span
            className={`checkout-steps__number checkout-steps__number--${active3}`}
          >
            3
          </span>
          <p
            onClick={() => history.push("/complete-order")}
            className="checkout-steps__container"
          >
            <span
              className={`checkout-steps--text checkout-steps--text--${active3} `}
            >
              Complete Order
            </span>
          </p>
          {/* Empty div for flex space */}
          <div></div>
        </div>
      </div>
    </>
  );
};

export default CheckoutSteps;
