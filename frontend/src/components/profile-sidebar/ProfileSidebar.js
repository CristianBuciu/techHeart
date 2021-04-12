//! Core
import React, { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";

//! Redux
import { useSelector, useDispatch } from "react-redux";
import { listFavoriteProducts } from "../../redux/user/user.actions.js";

//! Icons
import { FaHeart } from "react-icons/fa";
import { BiShoppingBag } from "react-icons/bi";
//!=======================================================================

function ProfileSidebar({ handler }) {
  //! Hooks
  const dispatch = useDispatch();
  const history = useHistory();

  //! Selectors
  const favoriteProductsList = useSelector(
    (state) => state.userFavoriteProducts
  );
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const { userFavoriteProducts } = favoriteProductsList;
  const favoriteProductsLength = userFavoriteProducts.length;

  const cartItems = useSelector((state) => state.cart);
  const { cartProducts } = cartItems;

  //! Selector utils
  const cartItemsNumber = cartProducts.reduce(
    (accum, cartItem) => accum + cartItem.quantity,
    0
  );

  //! Use Effect
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    dispatch(listFavoriteProducts());
  }, [history, userInfo, dispatch]);

  //! Return ===============================================>
  return (
    <div className="profile-sidebar">
      <h1 className="profile-screen__title">Your Account</h1>
      <NavLink
        onClick={() => (handler ? handler() : null)}
        className="profile-sidebar__options"
        activeClassName="profile-sidebar__active-link"
        to="/profile/info"
      >
        {" "}
        <p>Info</p>{" "}
      </NavLink>

      <NavLink
        onClick={() => (handler ? handler() : null)}
        className="profile-sidebar__options"
        activeClassName="profile-sidebar__active-link"
        to="/profile/addresses"
      >
        {" "}
        <p>Addresses</p>{" "}
      </NavLink>

      <NavLink
        onClick={() => (handler ? handler() : null)}
        className="profile-sidebar__options"
        activeClassName="profile-sidebar__active-link"
        to="/profile/favorites"
      >
        {" "}
        <p
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          Favorites &nbsp;
          <i
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            ({favoriteProductsLength}&nbsp;{" "}
            <FaHeart style={{ color: " #fd3e3e" }} />)
          </i>{" "}
        </p>
      </NavLink>

      <NavLink
        onClick={() => (handler ? handler() : null)}
        activeClassName="profile-sidebar__active-link"
        className="profile-sidebar__options"
        to="/profile/reviews"
      >
        {" "}
        <p>Reviews</p>{" "}
      </NavLink>

      <NavLink
        onClick={() => (handler ? handler() : null)}
        className="profile-sidebar__options"
        activeClassName="profile-sidebar__active-link"
        to="/profile/messages"
      >
        {" "}
        <p>Messages</p>{" "}
      </NavLink>

      <h1 className="profile-screen__title">Orders</h1>
      <NavLink
        onClick={() => (handler ? handler() : null)}
        className="profile-sidebar__options"
        activeClassName="profile-sidebar__active-link"
        to="/profile/orders"
      >
        {" "}
        <p>Orders & Bills</p>{" "}
      </NavLink>

      <NavLink
        onClick={() => (handler ? handler() : null)}
        className="profile-sidebar__options"
        activeClassName="profile-sidebar__active-link"
        to="/profile/checkout"
      >
        {" "}
        <p
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          Checkout &nbsp;
          <i
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            ({cartItemsNumber}&nbsp;
            <BiShoppingBag />)
          </i>
        </p>{" "}
      </NavLink>

      <NavLink
        onClick={() => (handler ? handler() : null)}
        className="profile-sidebar__options"
        activeClassName="profile-sidebar__active-link"
        to="/profile/returns"
      >
        {" "}
        <p>Item returns</p>{" "}
      </NavLink>

      <NavLink
        onClick={() => (handler ? handler() : null)}
        activeClassName="profile-sidebar__active-link"
        className="profile-sidebar__options"
        to="/profile/warranty"
      >
        {" "}
        <p>Warranty</p>{" "}
      </NavLink>

      <h1 className="profile-screen__title">Payment</h1>
      <NavLink
        onClick={() => (handler ? handler() : null)}
        activeClassName="profile-sidebar__active-link"
        className="profile-sidebar__options"
        to="/profile/cards"
      >
        {" "}
        <p>Your cards</p>{" "}
      </NavLink>

      <NavLink
        onClick={() => (handler ? handler() : null)}
        className="profile-sidebar__options"
        activeClassName="profile-sidebar__active-link"
        to="/profile/payment-methods"
      >
        {" "}
        <p>Other payment methods</p>{" "}
      </NavLink>

      <NavLink
        onClick={() => (handler ? handler() : null)}
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
