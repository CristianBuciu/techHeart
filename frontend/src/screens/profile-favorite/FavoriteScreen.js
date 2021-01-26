import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listFavoriteProducts } from "../../redux/user/user.actions.js";
import { Link } from "react-router-dom";
import { FaHeartBroken } from "react-icons/fa";
import "./FavoriteScreen.scss";
//!==============================================================
const FavoriteScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const favoriteProductsList = useSelector(
    (state) => state.userFavoriteProducts
  );
  const { userFavoriteProducts, loading } = favoriteProductsList;
  const numberOfProducts = userFavoriteProducts.length;

  const removeFromFavoriteHandler = (id) => {
    console.log("remove");
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    dispatch(listFavoriteProducts());
  }, [history, userInfo, dispatch]);
  return (
    <div className="favorite-screen">
      <h1 className="heading-1  ">FAVORITE PRODUCTS</h1>

      <h2 className="favorite-screen__item-count mb-md">
        You have {numberOfProducts} favorite products.
      </h2>
      {userFavoriteProducts.map((item) => (
        <div key={item._id} className="favorite-screen__product-container">
          <div className="favorite-screen__item">
            <Link
              className="favorite-screen__image-wrapper"
              to={`/product/${item._id}`}
            >
              <img
                src={item.image}
                alt={item.name}
                className="favorite-screen__image"
              />
            </Link>
            <div className="favorite-screen__item-details ">
              <h4 className="heading-4 favorite-screen__item-details--title">
                {item.name}
              </h4>
              {item.countInStock ? (
                <h3 className="in-stock mt-xs">In stock</h3>
              ) : (
                <h3 className="out-of-stock-favorites mt-xs">Not in stock</h3>
              )}
              <h4 className="heading-4 favorite-screen__item-details--price">
                PRICE:{" "}
                <span className="heading-3 favorite-screen__item-details--price-value">
                  € {item.price}
                </span>
              </h4>
              <span
                onClick={() => removeFromFavoriteHandler(item._id)}
                className="favorite-screen__remove"
              >
                Remove &nbsp; <FaHeartBroken />
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavoriteScreen;
