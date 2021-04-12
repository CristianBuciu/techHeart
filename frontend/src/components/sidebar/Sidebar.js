//! Core
import React from "react";
import { useHistory } from "react-router-dom";
//! Redux
import { useDispatch, useSelector } from "react-redux";
import { productConstants } from "../../redux/product/product.constants";
import { logout } from "../../redux/user/user.actions.js";

//! Icons
import { FaRobot } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

//! Components
import ProfileSidebar from "../profile-sidebar/ProfileSidebar";

//! ============================================================
const Sidebar = ({ handler }) => {
  //! Hooks
  const dispatch = useDispatch();
  const history = useHistory();

  //! Selectors
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //! Handlers
  const logoutHandler = () => {
    dispatch(logout());
    // history.push("/");
  };
  return (
    <nav className="sidebar">
      {userInfo ? (
        <div className="sidebar__welcome-message">
          <FaRobot className="sidebar__welcome-message--icon" /> Welcome,{" "}
          {userInfo.name}
        </div>
      ) : (
        <div className="sidebar__signin-message">
          <h3 className="sidebar__signin-message--text">
            Sign In for an optimal experience
          </h3>
          <button
            onClick={() => {
              history.push("/login");
              handler();
            }}
            className="sidebar__signin-message--button"
          >
            Sign In
          </button>
          <p
            className="login-screen__create-account-link"
            onClick={() => {
              history.push("/register");
              handler();
            }}
          >
            Don't have an account? Create one here.
          </p>
        </div>
      )}
      <h4
        onClick={() => {
          dispatch({ type: productConstants.PRODUCT_LIST_RESET });
          history.push("/shop/all-products");
          handler();
        }}
        className="heading-4 sidebar__text mr-md"
      >
        All Products
      </h4>
      <h4
        onClick={() => {
          dispatch({ type: productConstants.PRODUCT_LIST_RESET });
          history.push("/shop/electronics");
          handler();
        }}
        className="heading-4 sidebar__text mr-md"
      >
        Electronics
      </h4>
      <h4
        onClick={() => {
          dispatch({ type: productConstants.PRODUCT_LIST_RESET });
          history.push("/shop/home-appliances");
          handler();
        }}
        className="heading-4 sidebar__text mr-md"
      >
        Home Appliances
      </h4>
      {userInfo ? (
        <div className="sidebar__profile-links">
          {/* <h4
            onClick={() => {
              history.push("/profile/info");
            }}
            className="heading-4 sidebar__text mr-md"
          >
            Profile
          </h4> */}
          <ProfileSidebar handler={handler} />
          <div
            onClick={() => {
              logoutHandler();
              handler();
            }}
            style={{
              paddingTop: ".5rem",
            }}
            className="sidebar__logout"
          >
            Log Out&nbsp; <FiLogOut />
          </div>
        </div>
      ) : (
        ""
      )}
    </nav>
  );
};

export default Sidebar;
