import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/cart/cart.actions.js";
import "./Checkout.scss";
import { roundToTwo } from "../../utils.js";

//!=======================================================
const Checkout = ({ history }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const { loading, cartProducts } = cartItems;
  const cartItemsNumber = cartProducts.reduce(
    (accum, cartItem) => accum + cartItem.quantity,
    0
  );
  const subtotal = cartProducts.reduce(
    (accum, cartItem) => accum + cartItem.quantity * cartItem.product.price,
    0
  );
  // const removeFromCartHandler = (id) => {
  //   dispatch(removeItem(id));
  // };
  const checkoutHandler = () => {
    history.push("/shipping");
  };
  return (
    <div className="checkout-screen">
      <h1 className="heading-1  ">CHECK OUT</h1>
      <div className="checkout-screen__subtotal">
        <div>
          <h3 className="checkout-screen__subtotal--title">
            Subtotal ({cartItemsNumber} products):
          </h3>
          <h3 className="checkout-screen__subtotal--value">
            € {roundToTwo(subtotal)}
          </h3>
        </div>
        {cartItems.length === 0 ? (
          <button className=" btn-disabled">Cart is empty</button>
        ) : (
          <button
            onClick={() => {
              checkoutHandler();
            }}
            className="checkout-screen__subtotal--button"
          >
            Proceed to checkout
          </button>
        )}
      </div>
      <h2 className="checkout-screen__item-count">
        You have {cartItemsNumber} items in your cart.
      </h2>
      {cartProducts.map((item) => (
        <div key={item.product._id} className="checkout-screen__item">
          <img
            src={item.product.image}
            alt={item.product.name}
            className="checkout-screen__image"
          />
          <div className="checkout-screen__item-details">
            <h3 className="heading-3 checkout-screen__item-details--title">
              {item.product.name} x {item.quantity}
            </h3>
            {item.product.countInStock ? (
              <h3 className="in-stock">In stock</h3>
            ) : (
              <h3 className="out-of-stock-favorites">Not in stock</h3>
            )}
            <h3 className="heading-3 checkout-screen__item-details--price">
              PRICE:
            </h3>
            <h3 className="heading-3 checkout-screen__item-details--price-value">
              € {item.product.price} &#10006;&nbsp;
              {item.product.countInStock > 0 && (
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
                      value={item.quantity}
                      name="quantity"
                      id="quantity"
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.product.countInStock).keys()].map(
                        (el) => (
                          <option
                            className="product-screen__quantity-selector--option"
                            key={el + 1}
                            value={el + 1}
                          >
                            {el + 1}
                          </option>
                        )
                      )}
                    </select>
                  </form>
                </div>
              )}
            </h3>
            {/* <span
              onClick={() => removeFromCartHandler(item.product)}
              className="checkout-screen__remove"
            >
              Remove
            </span> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Checkout;
