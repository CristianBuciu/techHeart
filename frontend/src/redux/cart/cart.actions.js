import { cartConstants } from "./cart.constants.js";
import axios from "axios";

export const toggleCartShow = () => ({
  type: cartConstants.CART_SHOW_TOGGLE,
});

export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    dispatch({
      type: cartConstants.CART_ADD_PRODUCT_REQUEST,
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
    const { data } = axios.put("/api/cart", { id, qty }, config);
    dispatch({ type: cartConstants.CART_ADD_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: cartConstants.CART_ADD_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getCartProducts = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: cartConstants.CART_GET_ALL_PRODUCTS_REQUEST,
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
    const { data } = await axios.get("/api/cart", config);
    dispatch({
      type: cartConstants.CART_GET_ALL_PRODUCTS_SUCCESS,
      payload: data,
    });
    localStorage.setItem("cartProducts", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: cartConstants.CART_GET_ALL_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
