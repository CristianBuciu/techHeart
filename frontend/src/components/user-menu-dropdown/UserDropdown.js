import React from "react";
import "./UserDropdown.scss";
import { FiLogOut } from "react-icons/fi";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/user/user.actions.js";
import { toggleUserMenuShow } from "../../redux/user/user.actions.js";
//!==================================================
const UserDropdown = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    // history.push("/");
  };
  const menuToggler = () => {
    dispatch(toggleUserMenuShow());
  };
  return (
    <div className="user-dropdown">
      <ul>
        <li className="user-dropdown__list-item">
          <Link onClick={menuToggler} to="/profile/info">
            Profile
          </Link>
        </li>

        <Link
          to="/profile/orders"
          onClick={menuToggler}
          className="user-dropdown__list-item"
        >
          My orders
        </Link>
        <div />
        <li
          onClick={() => {
            logoutHandler();
            menuToggler();
          }}
          style={{
            borderTop: "1px solid $color-grey-light-1-2",
            paddingTop: ".5rem",
          }}
          className="user-dropdown__list-item"
        >
          Log Out&nbsp; <FiLogOut />
        </li>
      </ul>
    </div>
  );
};

export default UserDropdown;
