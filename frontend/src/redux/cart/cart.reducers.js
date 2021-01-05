import { cartConstants } from "./cart.constants.js";

const INITIAL_STATE = {
  showCart: false,
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case cartConstants.TOGGLE_CART_SHOW:
      return {
        ...state,
        showCart: !state.showCart,
      };
  }
};

export default cartReducer;
