//! Core
import React, { useRef, useEffect } from "react";
import "./CartDropdown.scss";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { roundToTwo } from "../../utils.js";
import axios from "axios";
import { TweenMax, Power3 } from "gsap";

//! Components

//! Icons
import { AiOutlineDelete } from "react-icons/ai";

//! Redux Actions
import { toggleCartShow } from "../../redux/cart/cart.actions.js";
import { getCartProducts } from "../../redux/cart/cart.actions.js";
import { productConstants } from "../../redux/product/product.constants";

//!========================================================================
//!========================================================================
//!========================================================================
const CartDropdown = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cartItems = useSelector((state) => state.cart);
  const { loading, cartProducts } = cartItems;

  //! CALCULATE TOTAL NUMBER OF PRODUCTS IN CART ===========================
  const cartItemsNumber = cartProducts.reduce(
    (accum, cartItem) => accum + cartItem.quantity,
    0
  );
  const subtotal = cartProducts.reduce(
    (accum, cartItem) =>
      accum +
      cartItem.quantity *
        roundToTwo(
          cartItem.product.price -
            cartItem.product.price * (cartItem.product.offerPriceDiscount / 100)
        ),
    0
  );

  //! GO TO CHECKOUT PAGE LINK =============================================
  const checkoutClickHandler = () => {
    dispatch(toggleCartShow());
  };
  //! GO TO THE PRODUCT PAGE LINK ==========================================

  //! FADE IN ANIMATION  ====================================================
  //TODO ADD GSAP OR SPRING FOR THE UNMOUNT ANIMATION =======================
  const cartRef = useRef(null);
  useEffect(() => {
    TweenMax.to(cartRef.current, 0.8, {
      opacity: 1,
      x: 0,
      ease: Power3.easeOut,
    });
    dispatch(getCartProducts());
  }, [dispatch, history]);

  //! REMOVE PRODUCT FROM CART ==============================================

  const removeCartProduct = (id) => {
    const deleteProduct = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        await axios.delete(`/api/cart/${id}`, config);

        dispatch(getCartProducts());
      } catch (error) {
        console.log(error);
      }
    };
    deleteProduct();
  };

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
              onClick={() => {
                if (
                  history.location.pathname.split("/")[2] === item.product._id
                ) {
                  dispatch(toggleCartShow());
                } else {
                  dispatch({ type: productConstants.PRODUCT_DETAILS_RESET });
                  history.push(`/product/${item.product._id}`);
                  dispatch(toggleCartShow());
                }
              }}
              src={item.product.image}
              alt={item.product.name}
              className="cart__item--image"
            />
          </div>
          <div className="cart__details">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gridColumn: "1/3",
              }}
            >
              <h3
                onClick={() => {
                  if (
                    history.location.pathname.split("/")[2] === item.product._id
                  ) {
                    dispatch(toggleCartShow());
                  } else {
                    dispatch({ type: productConstants.PRODUCT_DETAILS_RESET });
                    history.push(`/product/${item.product._id}`);
                    dispatch(toggleCartShow());
                  }
                }}
                className="cart__details--title"
              >
                {item.product.name}{" "}
              </h3>
              <span>
                <AiOutlineDelete
                  title="Delete Cart Item"
                  onClick={() => removeCartProduct(item._id)}
                  className="cart__details--delete"
                />
              </span>
            </div>
            <h3 className="cart__details--price">
              Price: &nbsp;
              <span className="cart__details--price-value">
                {roundToTwo(
                  item.product.price -
                    item.product.price * (item.product.offerPriceDiscount / 100)
                )}
              </span>
            </h3>
            <h3 className="cart__details--quantity">
              Quantity:&nbsp;
              <span className="cart__details--quantity-value price-number">
                {item.quantity}
              </span>
            </h3>
            <h3 className="cart__details--total">TOTAL:</h3>
            <h3 className="cart__details--total-value price-number">
              €{" "}
              {roundToTwo(
                item.quantity *
                  roundToTwo(
                    item.product.price -
                      item.product.price *
                        (item.product.offerPriceDiscount / 100)
                  )
              )}
            </h3>
          </div>
        </div>
      ))}
      <div className="cart__subtotal">
        <h2 className="cart__subtotal--text">SUBTOTAL:</h2>
        <h2 className="cart__subtotal--value price-number">
          € {roundToTwo(subtotal)}
        </h2>
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
