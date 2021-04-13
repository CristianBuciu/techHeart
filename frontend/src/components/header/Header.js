//! Core
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

//! Components
import CartDropdown from "../cart-dropdown/CartDropdown.js";
import UserDropdown from "../user-menu-dropdown/UserDropdown.js";
import SearchBox from "../searchbox/SearchBox.js";
import Sidebar from "../sidebar/Sidebar.js";
import { Sling as Hamburger } from "hamburger-react";

//! Icons
import { GiTechnoHeart } from "react-icons/gi";
import { TiShoppingCart } from "react-icons/ti";
import { FaHeart, FaRobot } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

//! Redux Actions
import { productConstants } from "../../redux/product/product.constants";
import { toggleCartShow } from "../../redux/cart/cart.actions.js";
import { toggleUserMenuShow } from "../../redux/user/user.actions.js";

//!==============================================================

const Header = () => {
  //! Hooks declaration
  const location = useLocation();
  const { pathname } = location;
  const dispatch = useDispatch();

  //! State
  const [sidebarShow, setSidebarShow] = useState(false);

  //! Redux data selection hook
  const cartToggle = useSelector((state) => state.cartToggle.showCart);
  const cartItems = useSelector((state) => state.cart);
  const { cartProducts } = cartItems;

  const cartItemsNumber = cartProducts.reduce(
    (accum, cartItem) => accum + cartItem.quantity,
    0
  );
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dropdownShow = useSelector((state) => state.showUserMenu);
  const { showUserMenu } = dropdownShow;

  //! Handlers

  const closeMenu = () => {
    setSidebarShow(false);
  };

  return (
    <>
      {" "}
      {pathname === "/shipping" ||
      pathname === "/payment" ||
      pathname === "/complete-order" ? (
        ""
      ) : (
        <>
          <header className="header">
            <nav className="nav">
              <div className="nav__mobile-menu">
                <Hamburger
                  hideOutline={true}
                  label="Show menu"
                  rounded
                  color="#6412cf"
                  toggled={sidebarShow}
                  toggle={setSidebarShow}
                />
              </div>
              <Link className="nav__logo-container" title="Go home" to="/">
                <GiTechnoHeart className="nav__logo" />{" "}
                <h2 className="nav__title">Cyber Heart</h2>
              </Link>

              <div className=" nav__searchbox-container">
                <SearchBox phone={false} />{" "}
                <div className="nav__subnav">
                  <h4 className="heading-4 nav__subnav--text mr-md">
                    <NavLink
                      onClick={() =>
                        dispatch({ type: productConstants.PRODUCT_LIST_RESET })
                      }
                      activeClassName="nav__subnav--text nav__subnav--text--active"
                      to="/shop/all-products"
                    >
                      All Products
                    </NavLink>
                  </h4>
                  <h4 className="heading-4 nav__subnav--text mr-md">
                    <NavLink
                      onClick={() =>
                        dispatch({ type: productConstants.PRODUCT_LIST_RESET })
                      }
                      activeClassName="nav__subnav--text nav__subnav--text--active"
                      to="/shop/electronics"
                    >
                      Electronics
                    </NavLink>
                  </h4>
                  <h4 className="heading-4 nav__subnav--text mr-md">
                    <NavLink
                      onClick={() =>
                        dispatch({ type: productConstants.PRODUCT_LIST_RESET })
                      }
                      activeClassName="nav__subnav--text nav__subnav--text--active"
                      to="/shop/home-appliances"
                    >
                      Home Appliances
                    </NavLink>
                  </h4>
                </div>
              </div>

              <div className="nav__icons-container">
                <NavLink
                  title="Favorites"
                  className="nav__icon  nav__icon--heart"
                  activeClassName="nav__icon--heart--active"
                  to="/profile/favorites"
                >
                  {" "}
                  <FaHeart />
                </NavLink>

                <div
                  title="Shopping cart"
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
                    <FaRobot title="Log In / Register" />
                  </Link>
                )}
              </div>
            </nav>
            <SearchBox phone={true} />
            {sidebarShow ? (
              <div className="sidebar-container">
                <Sidebar handler={closeMenu} />
              </div>
            ) : null}
          </header>
        </>
      )}
    </>
  );
};

export default Header;
