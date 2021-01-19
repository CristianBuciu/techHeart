import React from "react";
import "./Header.scss";
import { GiTechnoHeart } from "react-icons/gi";
import { TiShoppingCart, TiUserOutline, TiHeart } from "react-icons/ti";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CartDropdown from "../cart-dropdown/CartDropdown.js";
import { toggleCartShow } from "../../redux/cart/cart.actions.js";
import UserDropdown from "../user-menu-dropdown/UserDropdown.js";
import { toggleUserMenuShow } from "../../redux/user/user.actions.js";
//!==============================================================

const Header = () => {
  const techTitle = "Cyber Heart";
  const dispatch = useDispatch();
  const cartToggle = useSelector((state) => state.cart.showCart);
  const cartItemsNumber = useSelector((state) =>
    state.cart.cartItems.reduce((accum, cartItem) => accum + cartItem.qty, 0)
  );
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dropdownShow = useSelector((state) => state.showUserMenu);
  const { showUserMenu } = dropdownShow;

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
          {userInfo ? (
            <>
              {" "}
              <span
                className="nav__welcome-message"
                onClick={() => dispatch(toggleUserMenuShow())}
              >
                Your menu &nbsp;
                <IoMdArrowDropdown
                  style={{ fontSize: "2rem" }}
                  className={
                    showUserMenu ? "dropdown-arrow-class" : "dropdown-revert"
                  }
                />
              </span>
              {showUserMenu ? <UserDropdown /> : null}
            </>
          ) : (
            <Link className="nav__icon" to="/login">
              {" "}
              <TiUserOutline />
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
