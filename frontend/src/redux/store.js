import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
  productCreateReviewReducer,
  productGetCategoriesReducer,
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
  getUserProductReviewsReducer,
} from "./user/user.reducers.js";
import {
  orderAddAddressReducer,
  orderSavePaymentMethodReducer,
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderGetMyOrdersReducer,
} from "./order/order.reducers.js";

//! REDUX STORE=========================================
const reducer = combineReducers({
  addAddress: addAddressReducer,
  cart: getCartReducer,
  cartToggle: cartToggleReducer,
  orderAddress: orderAddAddressReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderMyOrders: orderGetMyOrdersReducer,
  orderPay: orderPayReducer,
  orderPaymentMethod: orderSavePaymentMethodReducer,
  productDetails: productDetailsReducer,
  productList: productListReducer,
  productReviewCreate: productCreateReviewReducer,
  showUserMenu: showUserMenuReducer,
  userAddresses: userAddressesReducer,
  userDetails: userDetailsReducer,
  userFavoriteProducts: getUserFavoriteProductsReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userReviews: getUserProductReviewsReducer,
  productCategories: productGetCategoriesReducer,
});

//! Local storage asignments ================================================

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
const orderPaymentMethodFromStorage = localStorage.getItem("orderPaymentMethod")
  ? JSON.parse(localStorage.getItem("orderPaymentMethod"))
  : {
      paymentMethod: "",
      shippingMethod: {},
    };

const userFavoriteProductsFromStorage = localStorage.getItem(
  "userFavoriteProducts"
)
  ? JSON.parse(localStorage.getItem("userFavoriteProducts"))
  : [];
const orderMyOrderFromStorage = localStorage.getItem("orderMyOrder")
  ? JSON.parse(localStorage.getItem("orderMyOrder"))
  : [];
const userProductReviewsFromStorage = localStorage.getItem("userReviews")
  ? JSON.parse(localStorage.getItem("userReviews"))
  : [];
const productCategoriesFromStorage = localStorage.getItem("productCategories")
  ? JSON.parse(localStorage.getItem("productCategories"))
  : [];

//! INITIAL STATE VALUES ====================================================
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
  orderPaymentMethod: orderPaymentMethodFromStorage,
  orderDetails: {
    loading: true,
    order: { shippingAddress: {}, orderItems: [] },
  },
  orderMyOrders: { loading: true, orders: orderMyOrderFromStorage },
  userReviews: { userReviews: userProductReviewsFromStorage },
  productCategories: { categories: productCategoriesFromStorage },
};

//! Middleware for async redux ===================================================

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
