import { userConstants } from "./user.constants.js";

const initialState = {
  addresses: [],
};
//!=========================================================================
export const userLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.USER_LOGIN_REQUEST:
      return { loading: true };
    case userConstants.USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case userConstants.USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case userConstants.USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
//!=========================================================================

export const userRegisterReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.USER_REGISTER_REQUEST:
      return { loading: true };
    case userConstants.USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case userConstants.USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
//!=========================================================================

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case userConstants.USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case userConstants.USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case userConstants.USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
//!=========================================================================

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case userConstants.USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case userConstants.USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case userConstants.USER_UPDATE__PROFILE_RESET:
      return {};
    default:
      return state;
  }
};
//!=========================================================================

export const addAddressReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.USER_ADD_ADDRESS_REQUEST:
      return { loading: true };
    case userConstants.USER_ADD_ADDRESS_SUCCESS:
      return {
        loading: false,
        success: true,
        address: action.payload,
      };
    case userConstants.USER_ADD_ADDRESS_FAIL:
      return { loading: false, error: action.payload };
    case userConstants.USER_UPDATE__PROFILE_RESET:
      return {};
    default:
      return state;
  }
};
//!=========================================================================

export const userAddressesReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.USER_GET_ADDRESSES_REQUEST:
      return { ...state, loading: true };
    case userConstants.USER_GET_ADDRESSES_SUCCESS:
      return { loading: false, addresses: action.payload };
    case userConstants.USER_GET_ADDRESSES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
//!=========================================================================

export const editAddressReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.USER_GET_ADDRESS_BY_ID_REQUEST:
      return { loading: true, ...state };
    case userConstants.USER_GET_ADDRESS_BY_ID_SUCCESS:
      return { loading: false, address: action.payload };
    case userConstants.USER_GET_ADDRESS_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
//!=========================================================================

export const showUserMenuReducer = (
  state = { showUserMenu: false },
  action
) => {
  switch (action.type) {
    case userConstants.USER_MENU_SHOW_TOGGLE:
      return {
        ...state,
        showUserMenu: !state.showUserMenu,
      };
    default:
      return state;
  }
};
//!=========================================================================

export const getUserFavoriteProductsReducer = (
  state = { userFavoriteProducts: [] },
  action
) => {
  switch (action.type) {
    case userConstants.USER_GET_FAVORITES_REQUEST:
      return { loading: true, ...state };
    case userConstants.USER_GET_FAVORITES_SUCCESS:
      return {
        loading: false,
        userFavoriteProducts: action.payload,
      };
    case userConstants.USER_GET_FAVORITES_FAIL:
      return {
        loading: false,
        userFavoriteProducts: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
