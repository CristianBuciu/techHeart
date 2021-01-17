import React from "react";
import "./UserDropdown.scss";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/user/user.actions.js";
//!==================================================
const UserDropdown = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <div className="user-dropdown">
      <ul>
        <li className="user-dropdown__list-item">
          <Link to="/profile/info">Profile</Link>
        </li>

        <li className="user-dropdown__list-item">My orders</li>
        <hr />
        <li
          onClick={logoutHandler}
          style={{
            borderTop: "1px solid $color-grey-light-2",
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
