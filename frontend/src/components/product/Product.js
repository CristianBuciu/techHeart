import React, { useState } from "react";
import "./Product.scss";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { BsHeartFill } from "react-icons/bs";
import { TiShoppingCart } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cart/cart.actions.js";
//!==================================================================
const Product = ({ product }) => {
  const dispatch = useDispatch();
  const addToCartHandler = () => {
    dispatch(addToCart(product._id, 1));
  };
  const [like, setLike] = useState(false);

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
        onClick={() => setLike(!like)}
        className={
          like ? "product__heart product__heart--selected" : "product__heart"
        }
      />
    </div>
  );
};

export default Product;
