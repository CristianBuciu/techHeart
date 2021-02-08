import { productConstants } from "./product.constants.js";
import axios from "axios";
//!=================================================================

//! List all Products Action =======================================
export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: productConstants.PRODUCT_LIST_REQUEST });
    const { data } = await axios.get("/api/products");
    dispatch({
      type: productConstants.PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: productConstants.PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//?=====================================================================

//! List Details of a Product Action ===================================

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: productConstants.PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({
      type: productConstants.PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: productConstants.PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//?=====================================================================

//! Create a Product review Action =====================================

export const createProductReview = (productId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: productConstants.PRODUCT_CREATE_REVIEW_REQUEST,
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
    await axios.post(`/api/products/${productId}/reviews`, review, config);

    dispatch({
      type: productConstants.PRODUCT_CREATE_REVIEW_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: productConstants.PRODUCT_CREATE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//?=====================================================================
