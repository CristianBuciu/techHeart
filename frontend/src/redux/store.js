import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
} from "./product/product.reducers.js";
import cartReducer from "./cart/cart.reducers.js";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userAddressesReducer,
  addAddressReducer,
  showUserMenuReducer,
} from "./user/user.reducers.js";
import { addOrderAddressReducer } from "./order/order.reducers.js";

//! REDUX STORE=========================================
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userAddresses: userAddressesReducer,
  addAddress: addAddressReducer,
  showUserMenu: showUserMenuReducer,
  orderAddress: addOrderAddressReducer,
});
//!=====================================================

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const userAddressesFromStorage = localStorage.getItem("userAddresses")
  ? JSON.parse(localStorage.getItem("userAddresses"))
  : null;

const orderAddressFromStorage = localStorage.getItem("orderAddress")
  ? JSON.parse(localStorage.getItem("orderAddress"))
  : {};

const initialState = {
  showUserMenu: false,
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
  userAddresses: { addresses: userAddressesFromStorage },
  orderAddress: { orderAddress: orderAddressFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
