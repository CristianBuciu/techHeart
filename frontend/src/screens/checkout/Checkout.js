import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeItem } from "../../redux/cart/cart.actions.js";
import "./Checkout.scss";
import { roundToTwo } from "../../utils.js";

//!=======================================================
const Checkout = ({ history }) => {
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
  const removeFromCartHandler = (id) => {
    dispatch(removeItem(id));
  };
  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };
  return (
    <div className="checkout-screen">
      <h1 className="heading-1  home-screen__title ">CHECK OUT</h1>

      <h2 className="checkout-screen__item-count">
        You have {cartItemsNumber} items in your cart.
      </h2>
      {cartItems.map((item) => (
        <div key={item.product} className="checkout-screen__item">
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
              PRICE:
            </h3>
            <h3 className="heading-3 checkout-screen__item-details--price-value">
              € {item.price} &#10006;&nbsp;
              {item.countInStock > 0 && (
                <div className="product-screen__quantity-selector checkout-screen__quantity-selector">
                  <form action="">
                    <label
                      className="product-screen__quantity-selector--text"
                      htmlFor="quantity"
                    >
                      quantity
                    </label>
                    <select
                      className="product-screen__quantity-selector--selection"
                      value={item.qty}
                      name="quantity"
                      id="quantity"
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((el) => (
                        <option
                          className="product-screen__quantity-selector--option"
                          key={el + 1}
                          value={el + 1}
                        >
                          {el + 1}
                        </option>
                      ))}
                    </select>
                  </form>
                </div>
              )}
            </h3>
            <span
              onClick={() => removeFromCartHandler(item.product)}
              className="checkout-screen__remove"
            >
              Remove
            </span>
          </div>
        </div>
      ))}
      <div className="checkout-screen__subtotal">
        <div>
          <h3 className="checkout-screen__subtotal--title">
            Subtotal ({cartItemsNumber} productos):
          </h3>
          <h3 className="checkout-screen__subtotal--value">
            € {roundToTwo(subtotal)}
          </h3>
        </div>
        {cartItems.length === 0 ? (
          <button className=" btn-disabled">Cart is empty</button>
        ) : (
          <button
            onClick={checkoutHandler}
            className="checkout-screen__subtotal--button"
          >
            Proceed to checkout
          </button>
        )}
      </div>
    </div>
  );
};

export default Checkout;
