import { orderConstants } from "./order.constants.js";

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
