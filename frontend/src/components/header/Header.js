import React from "react";
import "./Header.scss";
import { GiTechnoHeart } from "react-icons/gi";
import { TiShoppingCart, TiUserOutline } from "react-icons/ti";
import { FaHeart } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CartDropdown from "../cart-dropdown/CartDropdown.js";
import { toggleCartShow } from "../../redux/cart/cart.actions.js";
import UserDropdown from "../user-menu-dropdown/UserDropdown.js";
import { toggleUserMenuShow } from "../../redux/user/user.actions.js";
import { useLocation } from "react-router-dom";

import Tooltip from "@material-ui/core/Tooltip";
import Fade from "@material-ui/core/Fade";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { theme } from "../../utils";
import SearchBox from "../searchbox/SearchBox.js";
//!==============================================================

const Header = () => {
  const location = useLocation();
  const { pathname } = location;

  const dispatch = useDispatch();
  const cartToggle = useSelector((state) => state.cartToggle.showCart);
  const cartItems = useSelector((state) => state.cart);
  const { loading, cartProducts } = cartItems;
  const cartItemsNumber = cartProducts.reduce(
    (accum, cartItem) => accum + cartItem.quantity,
    0
  );
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dropdownShow = useSelector((state) => state.showUserMenu);
  const { showUserMenu } = dropdownShow;

  return (
    <>
      {" "}
      {pathname === "/shipping" ||
      pathname === "/payment" ||
      pathname === "/complete-order" ? (
        ""
      ) : (
        <header className="header">
          <nav className="nav">
            <div className="nav__logo-container">
              <GiTechnoHeart className="nav__logo" />{" "}
              <Link to="/">
                <h2 className="nav__title">Cyber Heart</h2>
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
              <SearchBox nav__icon />{" "}
              <MuiThemeProvider theme={theme}>
                <Tooltip TransitionComponent={Fade} title="Favorites" arrow>
                  <NavLink
                    className="nav__icon  nav__icon--heart"
                    activeClassName="nav__icon--heart--active"
                    to="/profile/favorites"
                  >
                    {" "}
                    <FaHeart />
                  </NavLink>
                </Tooltip>
              </MuiThemeProvider>
              <div
                onClick={() => dispatch(toggleCartShow())}
                className="nav__icon nav__icon--cart"
              >
                {" "}
                <TiShoppingCart />
                <span className="nav__cart-items-number">
                  {cartItemsNumber}
                </span>
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
                        showUserMenu
                          ? "dropdown-arrow-class"
                          : "dropdown-revert"
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
          <div
            style={{ margin: "0 auto", width: "80%", height: "1px" }}
            className="line-break"
          ></div>
        </header>
      )}
    </>
  );
};

export default Header;
