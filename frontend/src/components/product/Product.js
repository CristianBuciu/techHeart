import React, { useState, useEffect, useLayoutEffect } from "react";
import "./Product.scss";
import { Link, useHistory } from "react-router-dom";
import StarRatings from "react-star-ratings";

import { FaHeart } from "react-icons/fa";

import { useSelector, useDispatch } from "react-redux";
import { listFavoriteProducts } from "../../redux/user/user.actions.js";
import { ErrorMessage } from "../error-message/ErrorMessage.js";
import axios from "axios";
//!==================================================================
const Product = ({ product }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const history = useHistory();

  const [like, setLike] = useState(false);

  const favoriteProductsList = useSelector(
    (state) => state.userFavoriteProducts
  );
  const { userFavoriteProducts } = favoriteProductsList;
  const isFavorite = userFavoriteProducts.find(
    (favoriteProduct) => favoriteProduct._id == product._id
  );
  useEffect(() => {
    if (isFavorite) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, [isFavorite]);

  const handleAddUserToLikedArrayAndProductToFavorites = async (id) => {
    try {
      if (!userInfo) {
        history.push("/login");
      } else {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        await axios.put(`/api/products/`, { _id: id }, config);
        await axios.post(`/api/users/profile/favorites`, { _id: id }, config);
      }
    } catch (error) {
      console.error(error);
    }
  };

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

  return (
    <div
      className={
        product.countInStock === 0 ? "product out-of-stock" : "product"
      }
    >
      <Link className="product__card" to={`/product/${product._id}`}>
        <div className="product__image-container">
          <img className="product__image" src={product.image} alt="" />
        </div>
        <h3 className="heading-4 heading-4--center product__title">
          {product.name}
        </h3>
        <div className="product__center">
          <span className="product__rating-text">Rating:</span>
          <div className="product__rating-stars">
            <span className="product__rating-text">
              <strong>{product.rating}</strong> ({product.numReviews})
            </span>
            <StarRatings
              rating={product.rating}
              starDimension="1.2rem"
              starSpacing=".25rem"
              starRatedColor="rgb(255, 180, 3)"
            />
          </div>
        </div>
        <div className="product__bottom">
          <span className="product__price-text">Price: </span>
          <span className="product__price-text">
            <strong>${product.price}</strong>
          </span>
        </div>
      </Link>
      {like ? (
        <FaHeart
          onClick={async () => {
            await removeFromFavoriteHandler(product._id);
            await dispatch(listFavoriteProducts());
          }}
          className="product__heart product__heart--selected"
        />
      ) : (
        <FaHeart
          onClick={async () => {
            await handleAddUserToLikedArrayAndProductToFavorites(product._id);
            await dispatch(listFavoriteProducts());
          }}
          className="product__heart"
        />
      )}
    </div>
  );
};

export default Product;
