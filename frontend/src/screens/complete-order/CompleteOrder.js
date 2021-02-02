import React, { useState, useEffect } from "react";
import "./CompleteOrder.scss";
import CheckoutSteps from "../../components/checkout-steps/CheckoutSteps";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { GrPaypal, GrCreditCard, GrStripe } from "react-icons/gr";
import { useHistory } from "react-router-dom";
import {
  addToCart,
  getCartProducts,
  removeCartProduct,
} from "../../redux/cart/cart.actions.js";
import { roundToTwo } from "../../utils.js";

//todo implement gsapp to stop the buy now on screen
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

  const orderPaymentMethod = useSelector((state) => state.orderPaymentMethod);
  const paymentMethod = orderPaymentMethod.paymentMethod;
  const { shippingMethod } = orderPaymentMethod;
  useEffect(() => {
    if (!orderAddress.fullName) {
      history.push("/shipping");
    } else if (!orderPaymentMethod.paymentMethod) {
      history.push("/payment");
    }
  }, [orderAddress, history, orderPaymentMethod]);
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
    (accum, cartItem) => accum + cartItem.quantity * cartItem.product.price,
    0
  );

  return (
    <div className="complete-order shipping-section">
      <CheckoutSteps />
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
            onClick={() => history.push("/shipping")}
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
            onClick={() => history.push("/payment")}
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
            onClick={() => history.push("/payment")}
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
                <img
                  onClick={() => history.push(`/product/${item.product._id}`)}
                  src={item.product.image}
                  alt={item.product.name}
                  className="complete-order__image"
                />
                <div className="complete-order__item-details">
                  <h4
                    onClick={() => history.push(`/product/${item.product._id}`)}
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
                    € {item.product.price} &#10006;&nbsp;
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
          <button className="complete-order__buy-btn">PLACE ORDER</button>

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
            {roundToTwo(subtotal + shippingMethod.price)}€
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CompleteOrder;
