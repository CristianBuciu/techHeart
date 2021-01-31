import { orderConstants } from "./order.constants.js";

export const addOrderAddressReducer = (state = {}, action) => {
  switch (action.type) {
    case orderConstants.ORDER_STORE_ADDRESS: {
      return { ...state, orderAddress: action.payload };
    }
    default:
      return state;
  }
};
export const savePaymentMethodReducer = (state = {}, action) => {
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
