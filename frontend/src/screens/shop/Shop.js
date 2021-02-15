//! Core
import React, { useEffect, useState } from "react";
import "./Shop.scss";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

//! Components
import Product from "../../components/product/Product";
import Loader from "../../components/loader/Loader.js";
import ErrorMessage from "../../components/error-message/ErrorMessage.js";
import ProductFilter from "../../components/product-filter/ProductFilter.js";

//! Redux actions
import { listProducts } from "../../redux/product/product.actions.js";
import { listFavoriteProducts } from "../../redux/user/user.actions.js";
import { getCartProducts } from "../../redux/cart/cart.actions.js";

//!=======================================================
const Shop = () => {
  //! Hooks declaration

  const location = useLocation();
  const dispatch = useDispatch();

  //! Redux data selection hook

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  //! Use effect
  useEffect(() => {
    if (location.pathname === "/shop/all-products") {
      dispatch(listProducts({}));
    } else if (location.pathname === "/shop/electronics") {
      dispatch(listProducts({ category: "Electronics" }));
    } else if (location.pathname === "/shop/home-appliances") {
      dispatch(listProducts({ category: "Home" }));
    }

    dispatch(listFavoriteProducts());
    dispatch(getCartProducts());
  }, [dispatch, location]);
  //!=======================================================
  return (
    <div className="shop">
      <div className="shop__top">
        <h1 className="heading-1  shop__title">SHOP</h1>
      </div>

      <div className="shop__filter">
        <ProductFilter />
      </div>
      <div className="shop__products">
        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorMessage color="alert">{error}</ErrorMessage>
        ) : (
          <>
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Shop;
