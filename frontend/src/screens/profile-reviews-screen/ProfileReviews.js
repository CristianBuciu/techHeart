import React, { useEffect } from "react";
import "./ProfileReviews.scss";
import { useDispatch, useSelector } from "react-redux";
import { listProductReviews } from "../../redux/user/user.actions";
import { useHistory } from "react-router-dom";
import Review from "../../components/review/Review.js";
//!======================================================
const ProfileReviews = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const reviews = useSelector((state) => state.userReviews);
  const { loading, userReviews } = reviews;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(listProductReviews());
    }
  }, [dispatch, listProductReviews]);
  return (
    <>
      <h1 className="heading-1 mb-sm">YOUR REVIEWS</h1>
      {userReviews.map((el) => (
        <div key={el._id}>
          <h4 className="profile-reviews__product-name">{el.productName}</h4>
          <div className="profile-reviews__flex">
            <div className="profile-reviews__image-title">
              <img
                onClick={() => history.push(`/product/${el.productId}`)}
                className="profile-reviews__image"
                src={el.image}
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
