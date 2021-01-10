import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { BsHeartFill } from "react-icons/bs";
import "./ProductScreen.scss";
import { TiShoppingCart } from "react-icons/ti";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import LoaderProduct from "../../components/loader-product/LoaderProduct.js";
import { addToCart } from "../../redux/cart/cart.actions.js";
//!==================================================================

const ProductScreen = ({ match, history }) => {
  const [like, setLike] = useState(false);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  //! Getting the state with redux hooks ============================
  const cartShow = useSelector((state) => state.cart.showCart);
  //?================================================================

  //! Get the product by id from the API=============================
  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${match.params.id}`);
      setProduct(data);
      setLoading(false);
    };
    fetchProduct();
  }, [match]);
  //?==================================================================
  //!Handlers =========================================================
  const addToCartHandler = () => {
    dispatch(addToCart(match.params.id, Number(qty)));
  };

  //?==================================================================
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
                onClick={addToCartHandler}
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
            <h3 className="heading-3 ">
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
