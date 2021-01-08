import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/error-message/ErrorMessage.js";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/cart/cart.actions.js";
import "./Checkout.scss";
import { roundToTwo } from "../../utils.js";
//!=======================================================
const Checkout = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartItemsNumber = cartItems.reduce(
    (accum, cartItem) => accum + cartItem.qty,
    0
  );
  const subtotal = cartItems.reduce(
    (accum, cartItem) => accum + cartItem.qty * cartItem.price,
    0
  );
  return (
    <div className="checkout-screen">
      <h1 className="heading-1 checkout-screen__title">CART ITEMS</h1>
      <h2 className="checkout-screen__item-count">
        You have {cartItemsNumber} items in your cart.
      </h2>
      {cartItems.map((item) => (
        <div className="checkout-screen__item">
          <img
            src={item.image}
            alt={item.name}
            className="checkout-screen__image"
          />
          <div className="checkout-screen__item-details">
            <h3 className="heading-3 checkout-screen__item-details--title">
              {item.name} x {item.qty}
            </h3>
            {item.countInStock ? (
              <h3 className="in-stock">In stock</h3>
            ) : (
              <h3 className="out-of-stock">Not in stock</h3>
            )}
            <h3 className="heading-3 checkout-screen__item-details--price">
              PRICE
            </h3>
            <h3 className="heading-3 checkout-screen__item-details--price-value">
              € {item.price} x {item.qty}
            </h3>
          </div>
        </div>
      ))}
      <div className="checkout-screen__subtotal">
        <h3 className="checkout-screen__subtotal--title">
          Subtotal ({cartItemsNumber} productos):
        </h3>
        <h3 className="checkout-screen__subtotal--value">
          € {roundToTwo(subtotal)}
        </h3>
      </div>
    </div>
  );
};

export default Checkout;
