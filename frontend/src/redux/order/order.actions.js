import { orderConstants } from "./order.constants.js";
import axios from "axios";

export const addOrderAddress = (data) => (dispatch) => {
  dispatch({
    type: orderConstants.ORDER_STORE_ADDRESS,
    payload: {
      fullName: data.fullName,
      line1: data.line1,
      line2: data.line2,
      city: data.city,
      stateProvionceRegion: data.stateProvinceRegion,
      postalCode: data.postalCode,
      phoneNumber: data.phoneNumber,
    },
  });
  localStorage.setItem("orderAddress", JSON.stringify(data));
};

export const saveOrderPaymentMethod = (paymentMethod, shippingMethod) => (
  dispatch
) => {
  dispatch({
    type: orderConstants.ORDER_STORE_PAYMENT_METHOD,
    payload: { paymentMethod, shippingMethod },
  });
  localStorage.setItem(
    "orderPaymentMethod",
    JSON.stringify({ paymentMethod, shippingMethod })
  );
};

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: orderConstants.ORDER_CREATE_REQUEST,
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
    const { data } = await axios.post(`/api/orders`, order, config);

    dispatch({
      type: orderConstants.ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: orderConstants.ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: orderConstants.ORDER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch({
      type: orderConstants.ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: orderConstants.ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const payOrder = (orderId, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: orderConstants.ORDER_PAY_REQUEST,
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
    const { data } = await axios.put(
      `/api/orders/${orderId}/pay`,
      paymentResult,
      config
    );

    dispatch({
      type: orderConstants.ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: orderConstants.ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: orderConstants.ORDER_USER_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/orders/myorders`, config);

    dispatch({
      type: orderConstants.ORDER_USER_LIST_SUCCESS,
      payload: data,
    });
    localStorage.setItem("orderMyOrders", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: orderConstants.ORDER_USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
