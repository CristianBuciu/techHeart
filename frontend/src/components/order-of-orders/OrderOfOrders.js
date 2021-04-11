//! Core
import React from "react";
import { Link } from "react-router-dom";

//! Components
import OrderItem from "../order-item/OrderItem";
//!======================================================

const OrderOfOrders = ({ order }) => {
  return (
    <div key={order._id} className="order">
      <div className="order--header">
        <p className="order--header__text">
          Order N.º
          <span className="mt-xs">
            {" "}
            <strong>{order._id}</strong>
          </span>
        </p>

        <div className="order--header__flex">
          <p className="order--header__text">
            Order made on{" "}
            <span className="mt-xs">
              {" "}
              <strong>{new Date(order.createdAt).toLocaleString()}</strong>
            </span>
          </p>
          <p className="order--header__text">
            Total:&nbsp;
            <span className="mt-xs">
              {" "}
              <strong>€{order.totalPrice}</strong>
            </span>
          </p>
          <p className="order--header__text">
            Delivered to:&nbsp;
            <span className="mt-xs">
              <strong>{order.shippingAddress.fullName}</strong>
            </span>
          </p>
        </div>
      </div>

      <div className="my-orders__item-show-toggler">
        <p>
          {" "}
          Status:{" "}
          {order.isDelivered ? (
            <span className="text-success">
              Order delivered at: {new Date(order.updatedAt).toLocaleString()}
            </span>
          ) : (
            <span className="text-alert">Order not delivered</span>
          )}
        </p>
        <Link
          to={`/profile/orders/${order._id}`}
          className="my-orders__item-show-toggler--link"
        >
          Show Order Details
        </Link>
      </div>

      {order.orderItems.map((item) => (
        <OrderItem key={item._id} item={item} />
      ))}
    </div>
  );
};

export default OrderOfOrders;
