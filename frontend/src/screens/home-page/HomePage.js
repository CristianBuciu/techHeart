//! Core
import React, { useState, useEffect } from "react";
import "./HomePage.scss";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { roundToTwo } from "../../utils";

//! Components
import Slider from "react-slick";

//! Icons

//! Redux Actions
import { listProducts } from "../../redux/product/product.actions";
import { listFavoriteProducts } from "../../redux/user/user.actions";
//!=====================================================================
const HomePage = () => {
  //! Hooks declaration
  const dispatch = useDispatch();
  const history = useHistory();

  //! State

  //! Redux data selection hook
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  const favoriteProductsList = useSelector(
    (state) => state.userFavoriteProducts
  );
  const { userFavoriteProducts } = favoriteProductsList;

  //! useEffect

  useEffect(() => {
    dispatch(listFavoriteProducts());
    dispatch(listProducts({ onOffer: true }, 1));
  }, [dispatch]);

  //! Handlers

  //! Slider
  const Wrapper = styled.div`
    background-color: #f7f7f7;
    border-radius: 1rem;
  `;

  const Page = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  `;
  return (
    <div className="homepage">
      <div className="homepage__top-carousel  mb-md">
        <Wrapper>
          <Slider
            speed={1000}
            slidesToShow={1}
            slidesToScroll={1}
            infinite={true}
            dots={true}
            arrows={true}
            autoplay={false}
            autoplaySpeed={5000}
            pauseOnHover={true}
          >
            <div className="homepage__slider-page">
              <Page>
                <div className="homepage__carousel--title">
                  <h1 className="heading-1 text-center">LATEST OFFERS</h1>
                </div>

                <div className="homepage__carousel--offer-products">
                  {products
                    .map((product) => (
                      <div
                        onClick={() => history.push(`/product/${product._id}`)}
                        key={product._id}
                        className="homepage__carousel--product"
                      >
                        <h4 className="mb-xs text-center homepage__carousel--product-name">
                          {product.name.slice(0, 85)}&nbsp;...
                        </h4>
                        <img
                          className="homepage__carousel--image"
                          src={product.image}
                          alt=""
                        />
                        <h4 className=" homepage__carousel--discount">
                          {product.offerPriceDiscount}% discount
                        </h4>
                        <h4 className="heading-4 text-center  ">
                          <s style={{ fontSize: "1.3rem", width: "100%" }}>
                            {" "}
                            € {product.price}
                          </s>
                          <br />
                          <span className="homepage__carousel--product-price">
                            €{" "}
                            {roundToTwo(
                              product.price -
                                product.price *
                                  (product.offerPriceDiscount / 100)
                            )}{" "}
                          </span>
                        </h4>
                      </div>
                    ))
                    .slice(0, 5)}
                </div>
                <div className="homepage__carousel--bottom">
                  <button className="homepage__carousel--btn">
                    See all offers
                  </button>
                </div>
              </Page>
            </div>
            <div className="homepage__slider-page">top products</div>
            <div className="homepage__slider-page">newest additions</div>
          </Slider>
        </Wrapper>
      </div>
      <div className="homepage__user-quicklook">user quicklook</div>
      <div className="homepage__select-category">select category</div>
      <div className="homepage__favorites-quicklook">select category</div>
    </div>
  );
};

export default HomePage;
