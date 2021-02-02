import { userConstants } from "./user.constants.js";
import axios from "axios";
//!====================================================================
//! User header menu toggler===========================================
export const toggleUserMenuShow = () => ({
  type: userConstants.USER_MENU_SHOW_TOGGLE,
});
//?=====================================================================



//! LOGIN Action ======================================================
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: userConstants.USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    dispatch({
      type: userConstants.USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: userConstants.USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//?=====================================================================

//! REGISTER Action ====================================================
export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: userConstants.USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users",
      { name, email, password },
      config
    );

    dispatch({
      type: userConstants.USER_REGISTER_SUCCESS,
      payload: data,
    });
    //! We also log the user in after he register
    dispatch({
      type: userConstants.USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: userConstants.USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//?=====================================================================

//! User Profile Action ================================================

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: userConstants.USER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/users/${id}`, config);

    dispatch({
      type: userConstants.USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: userConstants.USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//?=====================================================================

//! UPDATE User Profile Action =========================================

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: userConstants.USER_UPDATE_PROFILE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api/users/profile`, user, config);

    dispatch({
      type: userConstants.USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: userConstants.USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//?=====================================================================

//! UPDATE Add User Address Action =====================================

export const addAddress = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: userConstants.USER_ADD_ADDRESS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `/api/users/profile/addresses`,
      user,
      config
    );

    dispatch({
      type: userConstants.USER_ADD_ADDRESS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: userConstants.USER_ADD_ADDRESS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//?=====================================================================
//! GET User Addresses Action ================================================

export const getUserAddresses = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: userConstants.USER_GET_ADDRESSES_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get("/api/users/profile/addresses", config);

    dispatch({
      type: userConstants.USER_GET_ADDRESSES_SUCCESS,
      payload: data,
    });
    localStorage.setItem(
      "userAddresses",
      JSON.stringify(getState().userAddresses.addresses)
    );
  } catch (error) {
    dispatch({
      type: userConstants.USER_GET_ADDRESSES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//! List all Product Favorites Action =======================================
export const listFavoriteProducts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_GET_FAVORITES_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get("/api/users/profile/favorites", config);
    dispatch({
      type: userConstants.USER_GET_FAVORITES_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userFavboriteProducts", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: userConstants.USER_GET_FAVORITES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//?=====================================================================

//?=====================================================================

//! LOGOUT Action=======================================================

export const logout = () => (dispatch) => {
  window.localStorage.clear();
  window.location.reload();
  dispatch({ type: userConstants.USER_LOGOUT });
};
//?=====================================================================
