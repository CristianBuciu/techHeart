import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./ProfileSidebar.scss";

//!=======================================================================

function ProfileSidebar() {
  const cartItems = useSelector((state) => state.cart);
  const { cartProducts } = cartItems;
  const cartItemsNumber = cartProducts.reduce(
    (accum, cartItem) => accum + cartItem.quantity,
    0
  );
  return (
    <div className="profile-sidebar">
      <h1 className="profile-screen__title">Your Account</h1>
      <NavLink
        className="profile-sidebar__options"
        activeClassName="profile-sidebar__active-link"
        to="/profile/info"
      >
        {" "}
        <p>Your Info</p>{" "}
      </NavLink>

      <NavLink
        className="profile-sidebar__options"
        activeClassName="profile-sidebar__active-link"
        to="/profile/addresses"
      >
        {" "}
        <p>Your Addresses</p>{" "}
      </NavLink>

      <NavLink
        className="profile-sidebar__options"
        activeClassName="profile-sidebar__active-link"
        to="/profile/favorites"
      >
        {" "}
        <p>Your Favorites</p>{" "}
      </NavLink>

      <NavLink
        activeClassName="profile-sidebar__active-link"
        className="profile-sidebar__options"
        to="/profile/reviews"
      >
        {" "}
        <p>Reviews</p>{" "}
      </NavLink>

      <NavLink
        className="profile-sidebar__options"
        activeClassName="profile-sidebar__active-link"
        to="/profile/messages"
      >
        {" "}
        <p>Messages</p>{" "}
      </NavLink>

      <h1 className="profile-screen__title">Orders</h1>
      <NavLink
        activeClassName="profile-sidebar__active-link"
        to="/profile/orders"
      >
        {" "}
        <p className="profile-sidebar__options">Orders & Bills</p>{" "}
      </NavLink>

      <NavLink
        className="profile-sidebar__options"
        activeClassName="profile-sidebar__active-link"
        to="/profile/checkout"
      >
        {" "}
        <p>
          Checkout <i>({cartItemsNumber} items)</i>
        </p>{" "}
      </NavLink>

      <NavLink
        className="profile-sidebar__options"
        activeClassName="profile-sidebar__active-link"
        to="/profile/returns"
      >
        {" "}
        <p>Item returns</p>{" "}
      </NavLink>

      <NavLink
        activeClassName="profile-sidebar__active-link"
        className="profile-sidebar__options"
        to="/profile/warranty"
      >
        {" "}
        <p>Warranty</p>{" "}
      </NavLink>

      <h1 className="profile-screen__title">Payment</h1>
      <NavLink
        activeClassName="profile-sidebar__active-link"
        className="profile-sidebar__options"
        to="/profile/cards"
      >
        {" "}
        <p>Your cards</p>{" "}
      </NavLink>

      <NavLink
        className="profile-sidebar__options"
        activeClassName="profile-sidebar__active-link"
        to="/profile/payment-methods"
      >
        {" "}
        <p>Other payment methods</p>{" "}
      </NavLink>

      <NavLink
        className="profile-sidebar__options"
        activeClassName="profile-sidebar__active-link"
        to="/profile/discounts"
      >
        {" "}
        <p>Discount coupons</p>{" "}
      </NavLink>
    </div>
  );
}

export default ProfileSidebar;
