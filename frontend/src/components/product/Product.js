import React, { useState, useEffect } from "react";
import "./Product.scss";
import { Link, useHistory } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { BsHeartFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";
//!==================================================================
const Product = ({ product }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const history = useHistory();

  const [like, setLike] = useState(false);
  useEffect(() => {});
  const handleAddUserToLikedArray = async (id) => {
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
      }
    } catch (error) {
      console.error(error);
    }
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
      <BsHeartFill
        onClick={() => {
          setLike(!like);
          handleAddUserToLikedArray(product._id);
        }}
        className={
          like ? "product__heart product__heart--selected" : "product__heart"
        }
      />
    </div>
  );
};

export default Product;
