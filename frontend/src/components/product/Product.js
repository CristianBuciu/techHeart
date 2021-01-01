import React, { useState } from "react";
import "./Product.scss";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { BsHeartFill } from "react-icons/bs";
//!==================================================================
const Product = ({ product }) => {
  const [like, setLiked] = useState(false);
  return (
    <Link className="product" to={`/product/${product._id}`}>
      <div className="product__image-container">
        <img className="product__image" src={product.image} alt="" />
        <BsHeartFill
          onClick={() => setLiked(!like)}
          className={
            like ? "product__heart product__heart--selected" : "product__heart"
          }
        />
      </div>
      <h3 className="heading-4 heading-4--center product__title">
        {product.name}
      </h3>
      <div className="product__center">
        <span className="product__rating-text">Rating:</span>
        <div className="product__rating-stars">
          <span className="product__rating-text">
            {product.rating} ({product.numReviews})
          </span>
          <StarRatings
            rating={product.rating}
            starDimension="1rem"
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
  );
};

export default Product;
