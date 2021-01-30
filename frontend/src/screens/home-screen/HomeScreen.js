import React, { useEffect } from "react";
import "./HomeScreen.scss";
import Product from "../../components/product/Product";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../../components/loader/Loader.js";
import ErrorMessage from "../../components/error-message/ErrorMessage.js";

//* Actions imports============
import { listProducts } from "../../redux/product/product.actions.js";
import { listFavoriteProducts } from "../../redux/user/user.actions.js";
import { getCartProducts } from "../../redux/cart/cart.actions.js";

//!=======================================================
const HomeScreen = () => {
  //! Using Redux to get the data ========================
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
    dispatch(listFavoriteProducts());
    dispatch(getCartProducts());
  }, [dispatch]);
  //!=======================================================
  return (
    <div className="home-screen">
      <div className="home-screen__top">
        <h1 className="heading-1  home-screen__title">SHOP</h1>
      </div>
      <div className="home-screen__products">
        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorMessage color="alert">{error}</ErrorMessage>
        ) : (
          <>
            {" "}
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
