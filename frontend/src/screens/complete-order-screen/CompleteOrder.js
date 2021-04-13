//! Core
import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { roundToTwo } from "../../utils.js";

//! Components
import CheckoutSteps from "../../components/checkout-steps/CheckoutSteps";

//! Icons
import { GrPaypal, GrCreditCard, GrStripe } from "react-icons/gr";

//! Redux Actions
import {
  addOrderAddress,
  createOrder,
  saveOrderPaymentMethod,
} from "../../redux/order/order.actions";
import { addToCart, getCartProducts } from "../../redux/cart/cart.actions.js";
import { productConstants } from "../../redux/product/product.constants";

//! Extra npm packages
import { Link, animateScroll as scroll } from "react-scroll";

//todo implement gsap to stop the buy now on screen
//!=======================================================

const CompleteOrder = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartProducts } = cart;
  const orderAddressState = useSelector((state) => state.orderAddress);
  const { orderAddress } = orderAddressState;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success } = orderCreate;

  const orderPaymentMethod = useSelector((state) => state.orderPaymentMethod);
  const paymentMethod = orderPaymentMethod.paymentMethod;
  const { shippingMethod } = orderPaymentMethod;
  //! REMOVE ALL CART ITEMS WHEN YOU PLACE THE ORDER==

  const clearCartHandler = async () => {
    try {
      if (!userInfo) {
        history.push("/login");
      } else {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        await axios.delete(`/api/cart`, config);
      }
    } catch (error) {
      console.error(error);
    }
  };
  //!==================================================
  useEffect(() => {
    if (success) {
      history.push(`/profile/orders/${order._id}`);
    }
    if (!orderAddress.fullName) {
      history.push("/shipping");
    } else if (!orderPaymentMethod.paymentMethod) {
      history.push("/payment");
    }
  }, [orderAddress, history, orderPaymentMethod, order, success]);
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
  const totalPrice = roundToTwo(subtotal + shippingMethod.price);

  //* Place order action ======================================
  const placeOrderHandler = async () => {
    dispatch(
      createOrder({
        orderItems: cartProducts,
        shippingAddress: orderAddress,
        paymentMethod: paymentMethod,
        itemsPrice: roundToTwo(subtotal),
        shippingPrice: roundToTwo(shippingMethod.price),
        shippingMethod: shippingMethod.name,
        totalPrice: roundToTwo(totalPrice),
      })
    );

    clearCartHandler();
    dispatch(getCartProducts());
  };
  //*============================================================
  return (
    <div className="complete-order shipping-section">
      <div id="section1"></div>
      <CheckoutSteps active3="selected-3" />

      <div>
        <h1 className="heading-1  mt-sm mb-sm">Order summary</h1>
      </div>
      <div className="complete-order__grid">
        <div className="complete-order__address-info complete-order__steps-container">
          <h3 className="heading-3 complete-order__steps-title mb-sm mt-sm">
            1. Shipping address
          </h3>
          <address className="complete-order__middle-text">
            <p>{orderAddress.fullName}</p>
            <p>{orderAddress.line1}</p>
            <p>{orderAddress.line2}</p>
            <p>{orderAddress.city}</p>
            <p>{orderAddress.stateProvinceRegion}</p>
            <p>{orderAddress.country}</p>
            <p>{orderAddress.postalCode}</p>
            <p>{orderAddress.phoneNumber}</p>
          </address>
          <span
            onClick={() => {
              dispatch(addOrderAddress({}));
            }}
            className="complete-order__change-link"
          >
            Change address
          </span>
        </div>
        <div className="complete-order__payment-info complete-order__steps-container">
          <h3 className="heading-3 complete-order__steps-title mb-sm mt-sm">
            2. Payment Method
          </h3>
          <p
            style={{ alignSelf: "center", fontSize: "1.4rem" }}
            className="complete-order__middle-text"
          >
            {paymentMethod === "PayPal" ? (
              <GrPaypal className=" mr-sm" />
            ) : paymentMethod === "Credit Card" ? (
              <GrCreditCard className=" mr-sm" />
            ) : (
              <GrStripe className=" mr-sm" />
            )}
            {paymentMethod}
          </p>
          <span
            onClick={() => {
              dispatch(saveOrderPaymentMethod("", {}));
            }}
            className="complete-order__change-link"
          >
            Change payment
          </span>
        </div>
        <div className="complete-order__shipment-info complete-order__steps-container">
          <h3 className="heading-3 complete-order__steps-title mb-sm mt-sm">
            3. Shipment Method
          </h3>
          <p
            style={{ alignSelf: "center" }}
            className="complete-order__middle-text"
          >
            {shippingMethod.name} &nbsp;{" "}
            <span style={{ color: " #fd3e3e" }}>
              + {shippingMethod.price} €
            </span>
          </p>

          <span
            onClick={() => dispatch(saveOrderPaymentMethod("", {}))}
            className="complete-order__change-link"
          >
            Change shipment
          </span>
        </div>
        <div className="complete-order__products-info ">
          <h3
            style={{ padding: "1rem" }}
            className="heading-3 complete-order__steps-title mb-sm mt-sm"
          >
            4. Review Products
          </h3>

          {cartProducts.length === 0 ? (
            <h3 className="heading-3 complete-order__steps-title">
              Cart is empty
            </h3>
          ) : (
            cartProducts.map((item) => (
              <div key={item.product._id} className="complete-order__item">
                <div className="complete-order__image-container">
                  <img
                    onClick={() => {
                      dispatch({
                        type: productConstants.PRODUCT_DETAILS_RESET,
                      });
                      history.push(`/product/${item.product._id}`);
                    }}
                    src={item.product.image}
                    alt={item.product.name}
                    className="complete-order__image"
                  />
                </div>
                <div className="complete-order__item-details">
                  <h4
                    onClick={() => {
                      dispatch({
                        type: productConstants.PRODUCT_DETAILS_RESET,
                      });
                      history.push(`/product/${item.product._id}`);
                    }}
                    className="heading-4 complete-order__item-details--title"
                  >
                    {item.product.name} x {item.quantity}
                  </h4>
                  {item.product.countInStock ? (
                    <h3 className="in-stock">In stock</h3>
                  ) : (
                    <h3 className="out-of-stock-favorites">Not in stock</h3>
                  )}
                  <h4 className="heading-4 complete-order__item-details--price">
                    PRICE:
                  </h4>
                  <h4 className="heading-4 complete-order__item-details--price-value">
                    €{" "}
                    {roundToTwo(
                      item.product.price -
                        item.product.price *
                          (item.product.offerPriceDiscount / 100)
                    )}{" "}
                    &#10006;&nbsp;
                    {item.product.countInStock > 0 && (
                      <div className="complete-order__quantity-selector complete-order__quantity-selector">
                        <form action="">
                          <label
                            className="complete-order__quantity-selector--text"
                            htmlFor="quantity"
                          >
                            quantity
                          </label>
                          <select
                            className="complete-order__quantity-selector--selection"
                            value={item.quantity}
                            name="quantity"
                            id="quantity"
                            onChange={(e) => {
                              dispatch(
                                addToCart(
                                  item.product._id,
                                  Number(e.target.value)
                                )
                              );
                              dispatch(getCartProducts());
                            }}
                          >
                            {[...Array(item.product.countInStock).keys()].map(
                              (el) => (
                                <option
                                  className="complete-order__quantity-selector--option"
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
                  </h4>
                  <span
                    onClick={() => removeCartProduct(item._id)}
                    className="complete-order__remove"
                  >
                    Remove
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="complete-order__summary">
          {cartProducts.length === 0 ? (
            <button className=" complete-order__btn  btn-disabled">
              Cart is empty
            </button>
          ) : (
            <button
              onClick={placeOrderHandler}
              className="complete-order__buy-btn complete-order__btn"
            >
              PLACE ORDER
            </button>
          )}
          <h3 className="heading-3 complete-order__summary--title">
            Order Price
          </h3>
          <span style={{ gridColumn: "1/3", fontSize: "1.2rem" }}>
            (All prices include VAT)
          </span>
          <h4 className="heading-4 complete-order__summary--text">Products:</h4>
          <span className="complete-order__summary--value">
            {roundToTwo(subtotal)}€
          </span>
          <h4 className="heading-4 complete-order__summary--text">Shipping:</h4>
          <span className="complete-order__summary--value">
            {shippingMethod.price}€
          </span>
          <h2 className="heading-2 complete-order__summary--total">TOTAL:</h2>
          <h2 className="heading-2 complete-order__summary--total-value">
            {totalPrice}€
          </h2>
        </div>
      </div>
      <Link to="section1" smooth={true} duration={500}>
        <span className="back-to-top">&#8632; &nbsp;Back to top </span>
      </Link>
    </div>
  );
};

export default CompleteOrder;
