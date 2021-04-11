//! Core
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

//! Components
import Review from "../../components/review/Review.js";

//! Redux Actions
import { listProductReviews } from "../../redux/user/user.actions";
import { productConstants } from "../../redux/product/product.constants";

//!======================================================
const ProfileReviews = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const reviews = useSelector((state) => state.userReviews);
  const { userReviews } = reviews;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(listProductReviews());
    }
  }, [dispatch, history, userInfo]);
  return (
    <>
      <h1 className="heading-1 mb-sm">YOUR REVIEWS</h1>
      {userReviews.map((el) => (
        <div key={el._id}>
          <h4 className="profile-reviews__product-name">{el.productName}</h4>
          <div className="profile-reviews__flex">
            <div className="profile-reviews__image-title">
              <img
                onClick={() => {
                  dispatch({ type: productConstants.PRODUCT_DETAILS_RESET });
                  history.push(`/product/${el.productId}`);
                }}
                className="profile-reviews__image"
                src={el.image}
                alt="product"
              />
            </div>
            <h4>{el.title}</h4>
            {el.reviews.map((review) => (
              <Review key={review._id} review={review} />
            ))}
          </div>
          <div className="line-break"></div>
        </div>
      ))}
    </>
  );
};

export default ProfileReviews;
