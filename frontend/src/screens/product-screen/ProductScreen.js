import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { FaHeart } from "react-icons/fa";
import "./ProductScreen.scss";
import { TiShoppingCart } from "react-icons/ti";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import LoaderProduct from "../../components/loader-product/LoaderProduct.js";
import { addToCart, getCartProducts } from "../../redux/cart/cart.actions.js";
import { listFavoriteProducts } from "../../redux/user/user.actions.js";
import ToCartVisual from "../../components/add-to-cart-visual/ToCartVisual.js";
//!==================================================================

const ProductScreen = ({ match, history }) => {
  const [like, setLike] = useState(false);
  const [product, setProduct] = useState({ reviews: [], likedBy: [] });
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [toCart, setToCart] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //! Getting the state with redux hooks ============================

  //?================================================================
  const favoriteProductsList = useSelector(
    (state) => state.userFavoriteProducts
  );
  const { userFavoriteProducts } = favoriteProductsList;
  const isFavorite = userFavoriteProducts.find(
    (favoriteProduct) => favoriteProduct._id == product._id
  );
  //! Get the product by id from the API=============================
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
  //?==================================================================
  //!Handlers =========================================================
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

  //?==================================================================
  return (
    <>
      {toCart ? <ToCartVisual /> : null}
      <div className=" top-links mb-sm">
        {" "}
        <Link className="product-screen__link" to="/">
          &#10092;&#10092; Home
        </Link>
        <Link className="product-screen__link" to="/shop">
          &#10092;&#10092; Shop
        </Link>
      </div>
      {loading ? (
        <LoaderProduct />
      ) : (
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
              $ {product.price}
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
                <TiShoppingCart className="product-screen__button--icon" /> out
                of stock{" "}
              </button>
            ) : (
              <button
                onClick={async () => addToCartHandler()}
                className="product-screen__button"
              >
                <TiShoppingCart className="product-screen__button--icon" /> Add
                to cart
              </button>
            )}
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
      )}
    </>
  );
};

export default ProductScreen;
