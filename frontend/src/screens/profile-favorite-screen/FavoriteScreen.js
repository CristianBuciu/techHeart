import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listFavoriteProducts } from "../../redux/user/user.actions.js";
import { useHistory } from "react-router-dom";
import { FaHeartBroken } from "react-icons/fa";
import axios from "axios";
import "./FavoriteScreen.scss";
import { addToCart, getCartProducts } from "../../redux/cart/cart.actions.js";
import { TiShoppingCart } from "react-icons/ti";
import ActionShow from "../../components/action-show/ActionShow.js";
import LoaderGeneric from "../../components/loader-generic/LoaderGeneric.js";
import ErrorMessage from "../../components/error-message/ErrorMessage.js";
//!==============================================================
const FavoriteScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [toCart, setToCart] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

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
  const favoriteProductsList = useSelector(
    (state) => state.userFavoriteProducts
  );
  const { userFavoriteProducts, loading } = favoriteProductsList;
  const favoriteProductsLength = userFavoriteProducts.length;
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    dispatch(listFavoriteProducts());
  }, [history, userInfo, dispatch]);

  const addToCartHandler = (id) => {
    dispatch(addToCart(id, 1));
    dispatch(getCartProducts());
    setToCart(true);
    setTimeout(() => {
      setToCart(false);
    }, 3100);
  };
  const productLink = (id) => {
    history.push(`/product/${id}`);
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
                <span className="heading-3 favorite-screen__item-details--price-value price-number">
                  € {item.price}
                </span>
              </h4>
              <span
                onClick={() => removeFromFavoriteHandler(item._id)}
                className="favorite-screen__remove"
              >
                Remove Favorite &nbsp; <FaHeartBroken />
              </span>
              <span
                onClick={async () => addToCartHandler(item._id)}
                className="favorite-screen__add-to-cart"
              >
                <TiShoppingCart /> &nbsp; Add To Cart
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavoriteScreen;
