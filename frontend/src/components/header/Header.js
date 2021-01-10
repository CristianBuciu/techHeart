import React from "react";
import "./Header.scss";
import { GiTechnoHeart } from "react-icons/gi";
import { TiShoppingCart, TiUserOutline, TiHeart } from "react-icons/ti";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CartDropdown from "../cart-dropdown/CartDropdown.js";
import { toggleCartShow } from "../../redux/cart/cart.actions.js";
//!==============================================================

const Header = () => {
  const techTitle = "Cyber Heart";
  const dispatch = useDispatch();
  const cartToggle = useSelector((state) => state.cart.showCart);
  const cartItemsNumber = useSelector((state) =>
    state.cart.cartItems.reduce((accum, cartItem) => accum + cartItem.qty, 0)
  );

  return (
    <header className="header">
      <nav className="nav">
        <div className="nav__logo-container">
          <GiTechnoHeart className="nav__logo" />{" "}
          <Link to="/">
            <h2 className="nav__title">{techTitle}</h2>
          </Link>
        </div>
        <div className="nav__links-container">
          <NavLink
            activeClassName="nav__link--active"
            className="nav__link"
            to="/shop"
          >
            SHOP
          </NavLink>
        </div>
        <div className="nav__icons-container">
          <Link className="nav__icon" to="/favorites">
            {" "}
            <TiHeart />
          </Link>
          <div
            onClick={() => dispatch(toggleCartShow())}
            className="nav__icon nav__icon--cart"
          >
            {" "}
            <TiShoppingCart />
            <span className="nav__cart-items-number">{cartItemsNumber}</span>
          </div>

          {cartToggle ? <CartDropdown /> : null}
          <Link className="nav__icon" to="/login">
            {" "}
            <TiUserOutline />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
