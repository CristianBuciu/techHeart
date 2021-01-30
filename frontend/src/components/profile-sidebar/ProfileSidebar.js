import React, { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./ProfileSidebar.scss";
import { listFavoriteProducts } from "../../redux/user/user.actions.js";

//!=======================================================================

function ProfileSidebar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const favoriteProductsList = useSelector(
    (state) => state.userFavoriteProducts
  );
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const { userFavoriteProducts, loading } = favoriteProductsList;
  const favoriteProductsLength = userFavoriteProducts.length;

  const cartItems = useSelector((state) => state.cart);
  const { cartProducts } = cartItems;
  const cartItemsNumber = cartProducts.reduce(
    (accum, cartItem) => accum + cartItem.quantity,
    0
  );
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    dispatch(listFavoriteProducts());
  }, [history, userInfo, dispatch]);
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
        <p>
          Your Favorites <i>({favoriteProductsLength} items)</i>{" "}
        </p>
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
