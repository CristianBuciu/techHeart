//! Core
import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

//! Redux Actions
import { productConstants } from "../../redux/product/product.constants";
//!===================================================================================
const CarouselProductShow = ({
  products,
  roundToTwo,
  title,
  buttonLink,
  subtitle,
}) => {
  //! Redux data selection hook

  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <div className="carousel">
      <div className="carousel--title">
        <h1 className="heading-1">{title}</h1>
        <p className="carousel--subtitle">{subtitle}</p>
      </div>

      <div className="carousel--offer-products">
        {products
          .map((product) => (
            <div
              onClick={() => {
                dispatch({ type: productConstants.PRODUCT_DETAILS_RESET });
                history.push(`/product/${product._id}`);
              }}
              key={product._id}
              className="carousel--product"
            >
              <div
                style={{
                  height: "33rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                {product.onOffer ? (
                  <h4 className=" carousel--discount">
                    -{product.offerPriceDiscount}%
                  </h4>
                ) : (
                  ""
                )}
                <img className="carousel--image" src={product.image} alt="" />
              </div>
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
          .slice(0, 4)}
      </div>
      <div className="carousel--bottom">
        <button
          onClick={() => {
            dispatch({ type: productConstants.PRODUCT_LIST_RESET });
            history.push("/latest-deals");
          }}
          className="carousel--btn"
        >
          {buttonLink}
        </button>
      </div>
    </div>
  );
};

export default CarouselProductShow;
