import React from "react";
import "./HomeScreen.scss";
import Product from "../../components/product/Product";

import products from "../../products";
//!=======================================================
const HomeScreen = () => {
  return (
    <div className="home-screen">
      <div className="home-screen__top">
        <h1 className="heading-1  home-screen__title">SHOP</h1>
      </div>
      <div className="home-screen__products">
        {products.map((product) => (
          <Product product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
