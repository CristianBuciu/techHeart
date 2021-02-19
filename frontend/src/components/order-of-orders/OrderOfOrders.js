import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { useHistory, Link } from "react-router-dom";
import "./OrderOfOrders.scss";
//!======================================================

const OrderOfOrders = ({ order }) => {
  const history = useHistory();

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
        <div key={item.product._id} className="my-orders__items-grid">
          <div
            onClick={() => history.push(`/product/${item.product._id}`)}
            className="my-orders__item "
          >
            <div className="my-orders__image--container">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="my-orders__image mr-sm"
              />
            </div>

            <div className="my-orders__item-details">
              <h4 className="my-orders__item-details--title text-center mb-xs">
                {item.product.name}
              </h4>

              <div style={{ textAlign: "end" }}>
                <h4 className="my-orders__item-details">
                  Quantity: {item.quantity}
                </h4>
                <h4 className="my-orders__item-details--price price-number">
                  € {item.product.price}
                </h4>
              </div>
            </div>
          </div>
          <div className="my-orders__btn-container">
            <button className="my-orders__btn-container--btn">
              Technical Support
            </button>
            <button className="my-orders__btn-container--btn">
              Return Item
            </button>
            <button className="my-orders__btn-container--btn">
              Leave Review
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderOfOrders;
