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
import CarouselProductShow from "../../components/carousel-products/CarouselProductShow";

//! Icons
import { AiOutlineArrowRight } from "react-icons/ai";
import { AiOutlineArrowLeft } from "react-icons/ai";

//! Redux Actions
import { listProducts } from "../../redux/product/product.actions";
import { listFavoriteProducts } from "../../redux/user/user.actions";
import { getMyOrders } from "../../redux/order/order.actions";
import OrderOfOrders from "../../components/order-of-orders/OrderOfOrders";
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

  const myLastOrder = useSelector((state) => state.orderMyOrders);
  let { orders } = myLastOrder;
  console.log(`The orders are: ${orders}`);
  //! useEffect

  useEffect(() => {
    try {
      if (userInfo) {
        dispatch(getMyOrders());
      }
      dispatch(listFavoriteProducts());
      dispatch(listProducts({ onOffer: true }, 1));
    } catch (error) {
      console.log(error);
    }
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
                <CarouselProductShow
                  buttonLink="See all offers"
                  title="Latest Deals"
                  roundToTwo={roundToTwo}
                  products={products}
                />
              </Page>
            </div>
            <div className="homepage__slider-page">
              <Page>
                <CarouselProductShow
                  buttonLink="Check it out"
                  title="Latest From Apple"
                  roundToTwo={roundToTwo}
                  products={products}
                />
              </Page>
            </div>
            <div className="homepage__slider-page">top products</div>
            <div className="homepage__slider-page">newest additions</div>
          </Slider>
        </Wrapper>
      </div>
      {userInfo ? (
        <div className="homepage__user-quicklook">
          <h4 className="heading-4 homepage__welcome-message">
            Welcome {userInfo.name}
          </h4>
          <div>
            <h4 className="heading-4 mb-sm">Last Order: </h4>
            {orders
              .map((order) => (
                <div key={order._id}>
                  <OrderOfOrders order={order} />
                </div>
              ))
              .slice(0, 1)}
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="homepage__select-category">select category</div>
      <div className="homepage__favorites-quicklook">select category</div>
    </div>
  );
};

export default HomePage;
