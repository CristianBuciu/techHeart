import React from "react";
import "./Header.scss";
import { GiTechnoHeart } from "react-icons/gi";
import { TiShoppingCart, TiUserOutline } from "react-icons/ti";
//!==============================================================
const Header = () => {
  const techTitle = "Cyber Heart";
  return (
    <header className="header">
      <nav className="nav">
        <div className="nav__logo-container">
          <GiTechnoHeart className="nav__logo" />{" "}
          <h2 className="nav__title">{techTitle}</h2>
        </div>
        <div className="nav__links-container">Links</div>
        <div className="nav__icons-container">
          <TiShoppingCart className="nav__icon" />
          <TiUserOutline className="nav__icon" />
        </div>
      </nav>
    </header>
  );
};

export default Header;
