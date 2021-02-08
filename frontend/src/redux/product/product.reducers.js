import { productConstants } from "./product.constants.js";

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case productConstants.PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case productConstants.PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case productConstants.PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: { reviews: [], likedBy: [] } },
  action
) => {
  switch (action.type) {
    case productConstants.PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state };
    case productConstants.PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case productConstants.PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productCreateReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case productConstants.PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case productConstants.PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case productConstants.PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case productConstants.PRODUCT_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};
