import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { useHistory, Link } from "react-router-dom";
//!======================================================

const OrderOfOrders = ({ order }) => {
  const history = useHistory();

  const [showItems, setShowItems] = useState(false);

  const showItemsHandler = () => {
    setShowItems(!showItems);
  };

  return (
    <div key={order._id} className="my-orders__order">
      <div className="my-orders__order--header">
        <p className="my-orders__order--header__text">
          Order N.º
          <span className="mt-xs">
            {" "}
            <strong>{order._id}</strong>
          </span>
        </p>

        <div className="my-orders__order--header__flex">
          <p className="my-orders__order--header__text">
            Order made on{" "}
            <span className="mt-xs">
              {" "}
              <strong>{new Date(order.createdAt).toLocaleString()}</strong>
            </span>
          </p>
          <p
            style={{ color: " #ff0bf3" }}
            className="my-orders__order--header__text"
          >
            Total:&nbsp;
            <span className="mt-xs">
              {" "}
              <strong>€{order.totalPrice}</strong>
            </span>
          </p>
          <p className="my-orders__order--header__text">
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
        <p
          className="my-orders__item-show-toggler--toggler"
          onClick={showItemsHandler}
        >
          Show Items bought
          <IoMdArrowDropdown
            style={{ fontSize: "2rem" }}
            className={
              showItems
                ? "my-orders__item-show-toggler--dropdown-arrow"
                : "my-orders__item-show-toggler--dropdown-arrow-revert"
            }
          />
        </p>
      </div>
      {showItems ? (
        <div className="my-orders__items-grid">
          {order.orderItems.map((item) => (
            <div key={item.product._id} className="my-orders__item mb-sm">
              <img
                onClick={() => history.push(`/product/${item.product._id}`)}
                src={item.product.image}
                alt={item.product.name}
                className="my-orders__image mr-sm"
              />
              <div className="my-orders__item-details">
                <h4
                  onClick={() => history.push(`/product/${item.product._id}`)}
                  className="my-orders__item-details--title text-center"
                >
                  {item.product.name}
                </h4>
                <hr className="mt-xs mb-xs" />
                <h4 className="my-orders__item-details">
                  Quantity: {item.quantity}
                </h4>
                <h4 className="my-orders__item-details--price price-number">
                  PRICE: € {item.product.price}
                </h4>
              </div>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default OrderOfOrders;
