import React, { useState, useEffect } from "react";
import "./OrderScreen.scss";
import { useDispatch, useSelector } from "react-redux";
import { GrPaypal, GrCreditCard, GrStripe } from "react-icons/gr";
import { useHistory } from "react-router-dom";
import LoaderGeneric from "../../components/loader-generic/LoaderGeneric.js";
import ErrorMessage from "../../components/error-message/ErrorMessage.js";
import { getOrderDetails } from "../../redux/order/order.actions";

//todo implement gsapp to stop the buy now on screen
//!=======================================================

const OrderScreen = ({ match }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();
  const history = useHistory();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!order || order._id !== orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [order, orderId]);

  let orderCreatedDate = new Date(order.createdAt);
  let orderPaidAtDate = new Date(order.paidAt);
  let orderDeliveredAtDate = new Date(order.deliveredAt);

  return loading ? (
    <LoaderGeneric />
  ) : error ? (
    <ErrorMessage>{error}</ErrorMessage>
  ) : (
    <div className="order-screen ">
      <div>
        <h1 className="heading-1   mb-sm">Order details</h1>
        <h2 className="mb-sm" style={{ fontWeight: "400" }}>
          <strong>Order number:</strong> {order._id}{" "}
          <span className="ml-sm" style={{ color: "grey" }}>
            |
          </span>{" "}
          <strong className="ml-sm">Created at:</strong>{" "}
          {orderCreatedDate.toLocaleString()}
        </h2>
      </div>
      <div className="line-break"></div>

      <div className="order-screen__grid">
        <div className="order-screen__address-info ">
          <h3 className="heading-3 order-screen__section-title mb-sm ">
            Shipping address
          </h3>
          <address className="order-screen__middle-text">
            <p>{order.shippingAddress.fullName}</p>
            <p>{order.shippingAddress.line1}</p>
            <p>{order.shippingAddress.line2}</p>
            <p>{order.shippingAddress.city}</p>
            <p>{order.shippingAddress.stateProvinceRegion}</p>
            <p>{order.shippingAddress.country}</p>
            <p>{order.shippingAddress.postalCode}</p>
            <p>{order.shippingAddress.phoneNumber}</p>
          </address>
        </div>
        <div className="order-screen__payment-info order-screen__steps-container">
          <h3 className="heading-3 order-screen__section-title mb-sm ">
            Payment Method
          </h3>
          <p
            style={{ alignSelf: "center", fontSize: "1.4rem" }}
            className="order-screen__middle-text"
          >
            {order.paymentMethod === "PayPal" ? (
              <GrPaypal className=" mr-sm" />
            ) : order.paymentMethod === "Credit Card" ? (
              <GrCreditCard className=" mr-sm" />
            ) : (
              <GrStripe className=" mr-sm" />
            )}
            {order.paymentMethod}
          </p>
          {order.isPaid ? (
            <p style={{ color: "#1ccf3a" }}>
              &check; {`Paid at ${orderPaidAtDate.toLocaleString()}`}
            </p>
          ) : (
            <p className="order-screen__status-fail-message ">
              &#10005; Not paid
            </p>
          )}
        </div>
        <div className="order-screen__shipment-info order-screen__steps-container">
          <h3 className="heading-3 order-screen__section-title mb-sm ">
            Shipment Method
          </h3>
          <p
            style={{ alignSelf: "center", fontSize: "1.4rem" }}
            className="order-screen__middle-text"
          >
            {order.shippingMethod} &nbsp;{" "}
          </p>
          {order.isDelivered ? (
            <span>
              &check; {`Delivered at ${orderDeliveredAtDate.toLocaleString()}`}
            </span>
          ) : (
            <p className="order-screen__status-fail-message">
              &#10005; Not delivered
            </p>
          )}
        </div>
        <div className="order-screen__summary">
          <h3 className="heading-3 order-screen__section-title mb-sm ">
            Order Price
          </h3>
          <span style={{ gridColumn: "1/3", fontSize: "1.2rem" }}>
            (All prices include VAT)
          </span>
          <h4 className="heading-4 order-screen__summary--text">Products:</h4>
          <span className="order-screen__middle-text">{order.itemsPrice}€</span>
          <h4 className="heading-4 order-screen__summary--text">Shipping:</h4>
          <span className="order-screen__middle-text">
            {order.shippingPrice}€
          </span>
          <h3 className="heading-3 order-screen__summary--total price-number">
            TOTAL: {order.totalPrice}€
          </h3>
        </div>
      </div>
      <div className="line-break"></div>
      <h3 className="heading-3 order-screen__section-title mb-sm mt-sm">
        Products
      </h3>
      <div className="order-screen__products-info ">
        <div>
          {order.orderItems.map((item) => (
            <div key={item.product._id} className="order-screen__item mb-sm">
              <img
                onClick={() => history.push(`/product/${item.product._id}`)}
                src={item.product.image}
                alt={item.product.name}
                className="order-screen__image mr-sm"
              />
              <div className="order-screen__item-details">
                <h4
                  onClick={() => history.push(`/product/${item.product._id}`)}
                  className="heading-4 order-screen__item-details--title"
                >
                  {item.product.name} x {item.quantity}
                </h4>

                <h4 className="heading-4 order-screen__item-details--price price-number">
                  PRICE: € {item.product.price}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
