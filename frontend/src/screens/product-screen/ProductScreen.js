//! Core
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./ProductScreen.scss";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

//! Components
import LoaderGeneric from "../../components/loader-generic/LoaderGeneric.js";
import ActionShow from "../../components/action-show/ActionShow.js";
import AddReview from "../../components/add-review/AddReview.js";
import Review from "../../components/review/Review";

import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";

//! Icons
import { FaHeart } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

//! Redux Actions
import { addToCart, getCartProducts } from "../../redux/cart/cart.actions.js";
import { listFavoriteProducts } from "../../redux/user/user.actions.js";

//!==================================================================

const ProductScreen = ({ match }) => {
  //! Hooks declaration
  const history = useHistory();
  const dispatch = useDispatch();

  //! State
  const [like, setLike] = useState(false);
  const [product, setProduct] = useState({ reviews: [], likedBy: [] });
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [toCart, setToCart] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //! Redux data selection hook
  const favoriteProductsList = useSelector(
    (state) => state.userFavoriteProducts
  );
  const { userFavoriteProducts } = favoriteProductsList;
  const isFavorite = userFavoriteProducts.find(
    (favoriteProduct) => favoriteProduct._id == product._id
  );
  //! Get the product by id from the API
  useEffect(async () => {
    const { data } = await axios.get(`/api/products/${match.params.id}`);
    setProduct(data);
    setLoading(false);

    if (isFavorite) {
      setLike(true);
    } else {
      setLike(false);
    }
    return () => clearTimeout();
  }, [match, isFavorite]);

  //!Handlers
  const addToCartHandler = () => {
    dispatch(addToCart(match.params.id, Number(qty)));
    dispatch(getCartProducts());
    setToCart(true);
    setTimeout(() => {
      setToCart(false);
    }, 3100);
  };

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

  const likedByNumber = product.likedBy.length;

  return (
    <>
      {toCart ? <ActionShow /> : null}
      <div className=" top-links mb-sm">
        {" "}
        <Link className="product-screen__link" to="/">
          &#10092;&#10092; Home
        </Link>
        <span onClick={() => history.goBack()} className="product-screen__link">
          &#10092;&#10092; Shop
        </span>
      </div>
      {loading ? (
        <LoaderGeneric />
      ) : (
        <>
          <div className="product-screen__body">
            <h1 className="product-screen__name">{product.name}</h1>
            <div className="product-screen__image-wrapper">
              <img
                className="product-screen__image"
                src={product.image}
                alt="product"
              />
            </div>

            <div className="product-screen__price">
              <h4 className=" product-screen__price--title">PRICE</h4>
              <span className=" product-screen__price--value">
                € {product.price}
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

              {product.countInStock > 0 && (
                <div className="product-screen__quantity-selector">
                  <form action="">
                    <label
                      className="product-screen__quantity-selector--text"
                      htmlFor="quantity"
                    >
                      Select quantity
                    </label>
                    <select
                      className="product-screen__quantity-selector--selection"
                      value={qty}
                      name="quantity"
                      id="quantity"
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {[...Array(product.countInStock).keys()].map((el) => (
                        <option
                          className="product-screen__quantity-selector--option"
                          key={el + 1}
                          value={el + 1}
                        >
                          {el + 1}
                        </option>
                      ))}
                    </select>
                  </form>
                </div>
              )}
              {product.countInStock === 0 ? (
                <button className="product-screen__button-disabled">
                  {" "}
                  <TiShoppingCart className="product-screen__button--icon" />{" "}
                  out of stock{" "}
                </button>
              ) : (
                <button
                  onClick={async () => addToCartHandler()}
                  className="product-screen__button"
                >
                  <TiShoppingCart className="product-screen__button--icon" />{" "}
                  Add to cart
                </button>
              )}
            </div>

            <div className="product-screen__rating">
              <span className="product__rating-text">
                User Rating:&nbsp;&nbsp;&nbsp;
                <strong>{product.rating}</strong> ({product.numReviews} reviews)
              </span>
              <Box component="fieldset" borderColor="transparent">
                <Rating
                  name="Product Rating"
                  title="Product Rating"
                  value={product.rating}
                  size="large"
                  readOnly
                />
              </Box>
            </div>
            <div className="product-screen__add-favorite">
              {like ? (
                <div className="product-screen__add-favorite--flex">
                  <FaHeart
                    onClick={async () => {
                      await removeFromFavoriteHandler(product._id);
                      await dispatch(listFavoriteProducts());
                    }}
                    className="product-screen__heart product-screen__heart--selected"
                  />
                  <span className="product-screen__add-favorite--text ml-sm">
                    FAVORITE PRODUCT
                  </span>{" "}
                </div>
              ) : (
                <div className="product-screen__add-favorite--flex">
                  <FaHeart
                    onClick={async () => {
                      await handleAddUserToLikedArrayAndProductToFavorites(
                        product._id
                      );
                      await dispatch(listFavoriteProducts());
                    }}
                    className="product-screen__heart"
                  />
                  <span className="product-screen__add-favorite--text ml-sm">
                    ADD TO FAVORITES
                  </span>
                </div>
              )}
              <span className="product-screen__add-favorite--favorite-by">
                {" "}
                ( Favorite by {likedByNumber}{" "}
                {likedByNumber > 1 ? "users" : "user"} )
              </span>
            </div>
            <div className="product-screen__details">
              <h3 className="heading-3 product-screen__product-description-title">
                {" "}
                <strong>PRODUCT DESCRIPTION</strong>{" "}
              </h3>
              <p className="product-screen__details--text">
                {product.description}
              </p>
            </div>
          </div>
          <AddReview productId={product._id} />
          <div className="line-break"></div>

          {product.reviews.map((review) => (
            <Review key={review._id} review={review} />
          ))}
        </>
      )}
    </>
  );
};

export default ProductScreen;
