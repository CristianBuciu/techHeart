import React from "react";
import "./CartDropdown.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//!================================================
const CartDropdown = () => {
  //!Function to calculate floatpoints accurate====
  function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
  }
  //?==============================================
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  return (
    <div className="cart">
      {cartItems.map((item) => (
        <div className="cart__item">
          <div className="cart__item--image-container">
            <img
              src={item.image}
              alt={item.name}
              className="cart__item--image"
            />
          </div>
          <div className="cart__details">
            <h3 className="cart__details--title">{item.name}</h3>
            <h3 className="cart__details--price">
              Price: &nbsp;
              <span className="cart__details--price-value">{item.price}</span>
            </h3>
            <h3 className="cart__details--quantity">
              Quantity:&nbsp;
              <span className="cart__details--quantity-value">{item.qty}</span>
            </h3>
            <h3 className="cart__details--total">TOTAL:</h3>
            <h3 className="cart__details--total-value">
              {roundToTwo(item.qty * item.price)}
            </h3>
          </div>
        </div>
      ))}

      <div className="cart__checkout">
        <Link to="/checkout">
          <button className="cart__checkout--btn">Go to checkout</button>
        </Link>
      </div>
    </div>
  );
};

export default CartDropdown;
