import { cartConstants } from "./cart.constants.js";

const INITIAL_STATE = {
  showCart: false,
  cartItems: [],
};

export const cartToggleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case cartConstants.CART_SHOW_TOGGLE:
      return {
        ...state,
        showCart: !state.showCart,
      };
    default:
      return state;
  }
};

export const getCartReducer = (state = { cartProducts: [] }, action) => {
  switch (action.type) {
    case cartConstants.CART_GET_ALL_PRODUCTS_REQUEST:
      return { ...state, loading: true };
    case cartConstants.CART_GET_ALL_PRODUCTS_SUCCESS:
      return {
        loading: false,
        cartProducts: action.payload,
      };
    case cartConstants.CART_REMOVE_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
