import { orderConstants } from "./order.constants.js";

export const orderAddAddressReducer = (state = {}, action) => {
  switch (action.type) {
    case orderConstants.ORDER_STORE_ADDRESS: {
      return { ...state, orderAddress: action.payload };
    }
    default:
      return state;
  }
};
export const orderSavePaymentMethodReducer = (state = {}, action) => {
  switch (action.type) {
    case orderConstants.ORDER_STORE_PAYMENT_METHOD: {
      return {
        ...state,
        paymentMethod: action.payload.paymentMethod,
        shippingMethod: action.payload.shippingMethod,
      };
    }
    default:
      return state;
  }
};

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case orderConstants.ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };
    case orderConstants.ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case orderConstants.ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { order: { loading: true, orderItems: [], shippingAddress: {} } },
  action
) => {
  switch (action.type) {
    case orderConstants.ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderConstants.ORDER_DETAILS_SUCCESS:
      return {
        loading: false,

        order: action.payload,
      };
    case orderConstants.ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
