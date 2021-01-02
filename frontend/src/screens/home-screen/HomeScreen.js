import React, { useState, useEffect } from "react";
import "./HomeScreen.scss";
import Product from "../../components/product/Product";
import axios from "axios";

//!=======================================================
const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="home-screen">
      <div className="home-screen__top">
        <h1 className="heading-1  home-screen__title">SHOP</h1>
      </div>
      <div className="home-screen__products">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
