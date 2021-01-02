import React, { useState } from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { BsHeartFill } from "react-icons/bs";
import "./ProductScreen.scss";
import { TiShoppingCart } from "react-icons/ti";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

import products from "../../products";
//!==================================================================

const ProductScreen = ({ match }) => {
  const [like, setLike] = useState(false);
  const product = products.find((p) => p._id === match.params.id);
  return (
    <>
      <div className="product-screen__top-links mb-sm">
        <Link className="product-screen__link" to="/">
          Home
        </Link>
        <Link className="product-screen__link" to="/shop">
          Shop
        </Link>
      </div>
      <div className="product-screen__body">
        <img
          className="product-screen__image"
          src={product.image}
          alt="product"
        />
        <h1 className="product-screen__name">{product.name}</h1>
        <div className="product-screen__price">
          <h4 className="heading-4 product-screen__price--title">PRICE</h4>
          <span className=" product-screen__price--value">
            ${product.price}
          </span>
          {product.countInStock > 0 ? (
            <p className="product-screen__stock">
              <AiOutlineCheckCircle />
              &nbsp;&nbsp;Product is in stock
            </p>
          ) : (
            <p className="product-screen__stock product-screen__stock--out">
              <AiOutlineCloseCircle />
              &nbsp;&nbsp; Product out of stock
            </p>
          )}
          <button
            className={
              product.countInStock === 0
                ? "product-screen__button-disabled"
                : "product-screen__button"
            }
          >
            {" "}
            <TiShoppingCart className="product-screen__button--icon" />
            {product.countInStock === 0 ? "not in stock" : "Add to cart"}
          </button>
        </div>
        <div className="product-screen__rating">
          <span className="product__rating-text">
            User Rating:&nbsp;&nbsp;&nbsp;
            <strong>{product.rating}</strong> ({product.numReviews} reviews)
          </span>
          <StarRatings
            className="product-screen__rating-stars"
            rating={product.rating}
            starDimension="2rem"
            starSpacing=".25rem"
            starRatedColor="rgb(255, 180, 3)"
          />
        </div>
        <div className="product-screen__add-favorite">
          <span className="product-screen__add-favorite--text">
            ADD TO WISH LIST
          </span>
          <BsHeartFill
            onClick={() => setLike(!like)}
            className={
              like
                ? "product-screen__heart product-screen__heart--selected"
                : "product-screen__heart"
            }
          />
        </div>
        <div className="product-screen__details">
          <h3 className="heading-3 ">PRODUCT DESCRIPTION</h3>
          <p className="product-screen__details--text">{product.description}</p>
        </div>
      </div>
    </>
  );
};

export default ProductScreen;
