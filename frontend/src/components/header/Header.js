import React from "react";
import "./Header.scss";
import { GiTechnoHeart } from "react-icons/gi";
import { TiShoppingCart, TiUserOutline, TiHeart } from "react-icons/ti";
import { Link, NavLink } from "react-router-dom";
//!==============================================================
const Header = () => {
  const techTitle = "Cyber Heart";
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
          <Link className="nav__icon" to="/cart">
            {" "}
            <TiShoppingCart />
          </Link>
          <Link className="nav__icon" to="/user">
            {" "}
            <TiUserOutline />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
