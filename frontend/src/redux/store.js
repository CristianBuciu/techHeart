import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
} from "../redux/reducers/product/productReducers.js";

//! REDUX STORE=========================================
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
});
//!=====================================================
const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
