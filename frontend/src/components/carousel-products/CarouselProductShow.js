//! Core
import React, { useEffect } from "react";
import "./CarouselProductShow.scss";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//! Redux Actions
import { listProducts } from "../../redux/product/product.actions";

//!===================================================================================
const CarouselProductShow = ({ products, roundToTwo, title, buttonLink }) => {
  const dispatch = useDispatch();
  //! Redux data selection hook

  const history = useHistory();
  return (
    <div className="carousel">
      <div className="carousel--title">
        <h1 className="heading-1 text-center">{title}</h1>
      </div>

      <div className="carousel--offer-products">
        {products
          .map((product) => (
            <div
              onClick={() => history.push(`/product/${product._id}`)}
              key={product._id}
              className="carousel--product"
            >
              {product.onOffer ? (
                <h4 className=" carousel--discount">
                  {product.offerPriceDiscount}% discount
                </h4>
              ) : (
                ""
              )}

              <img className="carousel--image" src={product.image} alt="" />
              <h4 className="mt-xs mb-sm text-center carousel--product-name">
                {product.name.slice(0, 85)}&nbsp;...
              </h4>
              {product.onOffer ? (
                <h4 className="heading-4 text-center  ">
                  <s style={{ fontSize: "1.3rem", width: "100%" }}>
                    {" "}
                    € {product.price}
                  </s>
                  <br />
                  <span className="carousel--product-price">
                    €{" "}
                    {roundToTwo(
                      product.price -
                        product.price * (product.offerPriceDiscount / 100)
                    )}{" "}
                  </span>
                </h4>
              ) : (
                <h4 className="heading-4 text-center  ">
                  <span className="carousel--product-price">
                    {" "}
                    € {product.price}
                  </span>{" "}
                </h4>
              )}
            </div>
          ))
          .slice(0, 5)}
      </div>
      <div className="carousel--bottom">
        <button className="carousel--btn">{buttonLink}</button>
      </div>
    </div>
  );
};

export default CarouselProductShow;
