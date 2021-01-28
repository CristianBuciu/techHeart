import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
} from "./product/product.reducers.js";
import { cartToggleReducer, getCartReducer } from "./cart/cart.reducers.js";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userAddressesReducer,
  addAddressReducer,
  showUserMenuReducer,
  getUserFavoriteProductsReducer,
} from "./user/user.reducers.js";
import { addOrderAddressReducer } from "./order/order.reducers.js";

//! REDUX STORE=========================================
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cartToggle: cartToggleReducer,
  cart: getCartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userAddresses: userAddressesReducer,
  addAddress: addAddressReducer,
  showUserMenu: showUserMenuReducer,
  orderAddress: addOrderAddressReducer,
  userFavoriteProducts: getUserFavoriteProductsReducer,
});
//!=====================================================

const cartItemsFromStorage = localStorage.getItem("cartProducts")
  ? JSON.parse(localStorage.getItem("cartProducts"))
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

const userFavoriteProductsFromStorage = localStorage.getItem(
  "userFavoriteProducts"
)
  ? JSON.parse(localStorage.getItem("userFavoriteProducts"))
  : [];
const initialState = {
  productDetails: { product: { reviews: [], likedBy: [] } },
  showUserMenu: false,
  cart: { cartProducts: cartItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
  userAddresses: { addresses: userAddressesFromStorage },
  orderAddress: { orderAddress: orderAddressFromStorage },
  userFavoriteProducts: {
    userFavoriteProducts: userFavoriteProductsFromStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
