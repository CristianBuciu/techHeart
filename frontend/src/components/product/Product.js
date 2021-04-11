//! Core
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { roundToTwo } from "../../utils";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

//! Components
import StarRatings from "react-star-ratings";

//! Icons
import { FaHeart } from "react-icons/fa";

//! Redux Actions
import { listFavoriteProducts } from "../../redux/user/user.actions.js";
import { productConstants } from "../../redux/product/product.constants";

//!==================================================================
const Product = ({ product }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

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

  const handleAddUserToLikedArrayAndProductToFavorites = (id) => {
    const addProduct = async () => {
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
          setLike(true);
          dispatch(listFavoriteProducts());
        }
      } catch (error) {
        console.error(error);
      }
    };
    addProduct();
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
        setLike(false);
        dispatch(listFavoriteProducts());
      } catch (error) {
        console.log(error);
      }
    };
    deleteProduct();
  };

  const handleProductDetailsLink = () => {
    history.push(`/product/${product._id}`);
    dispatch({ type: productConstants.PRODUCT_DETAILS_RESET });
  };

  return (
    <div
      className={
        product.countInStock === 0 ? "product out-of-stock" : "product"
      }
    >
      <div onClick={handleProductDetailsLink} className="product__card">
        {product.onOffer ? (
          <div className="product__discount-message">
            -{product.offerPriceDiscount}%
          </div>
        ) : (
          ""
        )}
        <div className="product__image-container">
          <img className="product__image" src={product.image} alt="" />
        </div>
        <h3 className="heading-4 heading-4--center product__title">
          {product.name}
        </h3>
        <div className="product__bottom">
          <span className="product__price-text">
            {product.onOffer ? (
              <strong>
                <s style={{ fontSize: "1.3rem" }}> € {product.price}</s>&nbsp; €{" "}
                {roundToTwo(
                  product.price -
                    product.price * (product.offerPriceDiscount / 100)
                )}{" "}
              </strong>
            ) : (
              <strong>
                {" "}
                €{" "}
                {roundToTwo(
                  product.price -
                    product.price * (product.offerPriceDiscount / 100)
                )}{" "}
              </strong>
            )}
          </span>
        </div>
        <div className="product__center mt-xs">
          <span className="product__rating-text"></span>
          <div className="product__rating-stars">
            <span className="product__rating-text">
              <strong>{roundToTwo(product.rating)}</strong> (
              {product.numReviews})
            </span>
            <StarRatings
              rating={product.rating}
              starDimension="1.2rem"
              starSpacing=".25rem"
              starRatedColor="rgb(255, 180, 3)"
            />
          </div>
        </div>
      </div>
      {like ? (
        <span
          onClick={() => {
            removeFromFavoriteHandler(product._id);
          }}
          title="Remove from Favorites"
        >
          <FaHeart className="product__heart product__heart--selected" />
        </span>
      ) : (
        <span
          onClick={async () => {
            handleAddUserToLikedArrayAndProductToFavorites(product._id);
          }}
          title="Add to Favorites"
        >
          <FaHeart className="product__heart" />
        </span>
      )}
    </div>
  );
};

export default Product;
