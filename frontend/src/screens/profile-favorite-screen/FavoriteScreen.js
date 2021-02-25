//! Core
import React, { useEffect, useState } from "react";
import "./FavoriteScreen.scss";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { roundToTwo } from "../../utils.js";

//! Components
import LoaderGeneric from "../../components/loader-generic/LoaderGeneric.js";
import ActionShow from "../../components/action-show/ActionShow.js";
import ErrorMessage from "../../components/error-message/ErrorMessage.js";

//! Redux Actions
import { listFavoriteProducts } from "../../redux/user/user.actions.js";
import { addToCart, getCartProducts } from "../../redux/cart/cart.actions.js";
import { productConstants } from "../../redux/product/product.constants";

//! Icons
import { FaHeartBroken } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
//!==============================================================
const FavoriteScreen = () => {
  //! Hooks declaration
  const history = useHistory();
  const dispatch = useDispatch();

  //! State
  const [toCart, setToCart] = useState(false);

  //! Redux data selection hook
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const favoriteProductsList = useSelector(
    (state) => state.userFavoriteProducts
  );
  const { userFavoriteProducts, loading } = favoriteProductsList;
  const favoriteProductsLength = userFavoriteProducts.length;

  //! Use effect ============================
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    dispatch(listFavoriteProducts());
    return () => clearTimeout(timer);
  }, [history, userInfo, dispatch]);
  //!==========================================
  let timer;
  //!Handlers
  const removeFromFavoriteHandler = (id) => {
    const deleteProduct = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        await axios.delete(`/api/users/profile/favorites/${id}`, config);

        dispatch(listFavoriteProducts());
      } catch (error) {
        console.log(error);
      }
    };
    deleteProduct();
  };
  const addToCartHandler = (id) => {
    dispatch(addToCart(id, 1));
    dispatch(getCartProducts());
    setToCart(true);
    timer = setTimeout(() => {
      setToCart(false);
    }, 3100);
  };
  const productLink = (id) => {
    history.push(`/product/${id}`);
    dispatch({ type: productConstants.PRODUCT_DETAILS_RESET });
  };
  return loading ? (
    <LoaderGeneric />
  ) : (
    <div className="favorite-screen">
      {toCart ? <ActionShow /> : null}
      <h1 className="heading-1  ">FAVORITE PRODUCTS</h1>

      <h2 className="favorite-screen__item-count mb-md">
        You have {favoriteProductsLength} favorite products.
      </h2>
      {userFavoriteProducts.map((item) => (
        <div key={item._id} className="favorite-screen__product-container">
          <div className="favorite-screen__item">
            <div
              className="favorite-screen__image-wrapper"
              onClick={() => productLink(item._id)}
            >
              <img
                src={item.image}
                alt={item.name}
                className="favorite-screen__image"
              />
            </div>
            <div className="favorite-screen__item-details">
              <h4
                onClick={() => productLink(item._id)}
                className="heading-4 favorite-screen__item-details--title"
              >
                {item.name}
              </h4>
              {item.countInStock ? (
                <h3 className="in-stock mt-xs">In stock</h3>
              ) : (
                <h3 className="out-of-stock-favorites mt-xs">Not in stock</h3>
              )}
              <span className="favorite-screen__item-details--default-text">
                Default quantity when addding to cart is 1
              </span>
              <h4 className="heading-4 favorite-screen__item-details--price">
                PRICE:{" "}
                <span className=" favorite-screen__item-details--price-value price-number">
                  €{" "}
                  {roundToTwo(
                    item.price - item.price * (item.offerPriceDiscount / 100)
                  )}
                </span>
              </h4>
              <span
                onClick={() => removeFromFavoriteHandler(item._id)}
                className="favorite-screen__remove"
              >
                Remove Favorite &nbsp; <FaHeartBroken />
              </span>
              {item.countInStock === 0 ? (
                <button className=" favorite-screen__button-disabled">
                  {" "}
                  <TiShoppingCart className="favorite-screen__button--icon" />{" "}
                  out of stock{" "}
                </button>
              ) : (
                <button
                  onClick={async () => addToCartHandler(item._id)}
                  className="favorite-screen__button"
                >
                  <TiShoppingCart className="favorite-screen__button--icon" />{" "}
                  Add to cart
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavoriteScreen;
