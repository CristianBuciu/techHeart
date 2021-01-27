import React, { useRef, useEffect } from "react";
import "./CartDropdown.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { TweenMax, Power3 } from "gsap";
import { toggleCartShow } from "../../redux/cart/cart.actions.js";
import { roundToTwo } from "../../utils.js";
import { getCartProducts } from "../../redux/cart/cart.actions.js";
//!================================================
const CartDropdown = () => {
  //!Function to calculate floatpoints accurate====

  //?==============================================
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
  const checkoutClickHandler = () => {
    dispatch(toggleCartShow());
  };
  const cartRef = useRef(null);
  useEffect(() => {
    TweenMax.to(cartRef.current, 0.8, {
      opacity: 1,
      x: 0,
      ease: Power3.easeOut,
    });
    dispatch(getCartProducts());
  }, [dispatch]);
  return (
    <div ref={cartRef} className="cart">
      <div className="cart__top">
        <h3 className="cart__top--text">
          You have {cartItemsNumber} items in your cart
        </h3>
      </div>
      {cartProducts.map((item) => (
        <div key={item.product._id} className="cart__item">
          <div className="cart__item--image-container">
            <img
              src={item.product.image}
              alt={item.product.name}
              className="cart__item--image"
            />
          </div>
          <div className="cart__details">
            <h3 className="cart__details--title">{item.product.name}</h3>
            <h3 className="cart__details--price">
              Price: &nbsp;
              <span className="cart__details--price-value">
                {item.product.price}
              </span>
            </h3>
            <h3 className="cart__details--quantity">
              Quantity:&nbsp;
              <span className="cart__details--quantity-value">
                {item.quantity}
              </span>
            </h3>
            <h3 className="cart__details--total">TOTAL:</h3>
            <h3 className="cart__details--total-value">
              {roundToTwo(item.quantity * item.product.price)}
            </h3>
          </div>
        </div>
      ))}
      <div className="cart__subtotal">
        <h2 className="cart__subtotal--text">SUBTOTAL:</h2>
        <h2 className="cart__subtotal--value">{roundToTwo(subtotal)}</h2>
      </div>
      <div className="cart__checkout">
        <Link to="/profile/checkout">
          <button
            onClick={checkoutClickHandler}
            className="cart__checkout--btn"
          >
            Go to checkout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartDropdown;
