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
import OrderOfOrders from "../../components/order-of-orders/OrderOfOrders";

//! Icons
import { AiOutlineArrowRight } from "react-icons/ai";
import { AiOutlineArrowLeft } from "react-icons/ai";

//! Redux Actions
import {
  listProducts,
  listCategories,
} from "../../redux/product/product.actions";
import { listFavoriteProducts } from "../../redux/user/user.actions";
import { getMyOrders } from "../../redux/order/order.actions";
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

  const productCategoriesList = useSelector((state) => state.productCategories);
  const { loading: categoriesLoading, categories } = productCategoriesList;

  const myLastOrder = useSelector((state) => state.orderMyOrders);
  let { orders } = myLastOrder;

  //! useEffect

  useEffect(() => {
    try {
      if (userInfo) {
        dispatch(getMyOrders());
      }
      dispatch(listCategories());
      dispatch(listFavoriteProducts());
      dispatch(listProducts({ onOffer: true }, 1));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  //! Handlers

  //! Slider
  const Wrapper = styled.div`
    background-color: white;
    border-radius: 1rem;
  `;

  const Page = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 1rem;
    overflow: hidden;
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
            arrows={false}
            autoplay={true}
            autoplaySpeed={5000}
            pauseOnHover={true}
            adaptiveHeight={false}
          >
            <div className="homepage__slider-page">
              <Page>
                <CarouselProductShow
                  buttonLink="See all deals"
                  title="Latest Deals"
                  roundToTwo={roundToTwo}
                  products={products}
                />
              </Page>
            </div>

            <div className="homepage__slider-page">
              <Page>
                <div className="homepage__lottery">
                  <h1 className="heading-1">Win a new Samsung Galaxy S21</h1>
                  <img
                    src="https://www.androidpolice.com/wp-content/uploads/2021/01/11/d8a5e279e6afacb10e0dbe51f49707445a0ffcb66a0d85bcae52c32075c79e85-1.jpg"
                    alt=""
                  />
                  <div className="homepage__lottery-form">
                    <div>
                      <h3 className="heading-3">Subscribe and WIN</h3>
                      <p>Get thiss incredible Samsung Galaxy S21</p>
                    </div>
                    <input
                      className="homepage__lottery-input"
                      type="email"
                      placeholder="Enter your email"
                    />
                    <div>
                      <input className="mr-sm" type="checkbox" />{" "}
                      <span>
                        I confirm that I have read, understand and agree to the
                        above policy and procedure for enrollment in the Win a
                        Samsung Galaxy S21 Program.
                      </span>
                    </div>
                    <button className="homepage__lottery-btn">Subscribe</button>
                  </div>
                </div>
              </Page>
            </div>
          </Slider>
        </Wrapper>
      </div>
      {userInfo ? (
        <div className="homepage__user-quicklook">
          <h4 className="heading-4 homepage__welcome-message">
            Welcome, {userInfo.name}
          </h4>
          <div className="mb-md">
            <h4 style={{ padding: "1rem" }} className="heading-4 mb-sm">
              Your Last Order:{" "}
            </h4>
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

      <div className="homepage__select-category">
        <div className="homepage__select-category--inner">
          <h3 className="heading-3 mb-md">Search by Category</h3>
          <div className="homepage__select-category--grid">
            {categories.map((subcategory) => (
              <div className="mb-md" key={subcategory._id}>
                <div className="homepage__select-category--container">
                  <div
                    key={subcategory.subcategoryName}
                    className="homepage__select-category--subcategory"
                  >
                    <div className="homepage__select-category--image-container  mb-xs">
                      <img
                        className="homepage__select-category--image"
                        src={subcategory.image}
                        alt="subcategory image"
                      />
                    </div>
                    <h3>{subcategory._id}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
