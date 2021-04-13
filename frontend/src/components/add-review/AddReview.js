//! Core
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";

//! Components
import ErrorMessage from "../error-message/ErrorMessage.js";
import Rating from "@material-ui/lab/Rating";

import Box from "@material-ui/core/Box";

//! Redux Actions
import {
  createProductReview,
  listProductDetails,
} from "../../redux/product/product.actions";
import { productConstants } from "../../redux/product/product.constants";

//! Icons
import { AiOutlinePlus } from "react-icons/ai";
import { BiMessageAdd } from "react-icons/bi";
import { BsFillBackspaceFill } from "react-icons/bs";

//!==========================================================
const AddReview = ({ productId, showModal, style }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const productReviewCreateSelector = useSelector(
    (state) => state.productReviewCreate
  );
  const { success, error } = productReviewCreateSelector;

  const [addReviewShow, setAddReviewShow] = useState(showModal);
  const [hover, setHover] = useState(-1);
  const [starValue, setStarValue] = useState(0);
  const [textFieldValue, setTextFieldValue] = useState("");
  const [title, setTitle] = useState("");

  const addReviewHandler = () => {
    setAddReviewShow(!addReviewShow);
  };
  const labels = {
    1: "Useless",

    2: "Poor",

    3: "Ok",

    4: "Good",

    5: "Excellent",
  };
  const submitReviewHandler = () => {
    const review = {
      title: title,
      rating: starValue,
      comment: textFieldValue,
    };
    dispatch(createProductReview(productId, review));
    if (location.pathname === `/product/${productId}`) {
      dispatch(listProductDetails(productId));
    } else {
      dispatch({ type: productConstants.PRODUCT_DETAILS_RESET });
      history.push(`/product/${productId}`);
    }

    setAddReviewShow(false);
  };

  return (
    <div style={style} className="add-review mt-sm">
      {error ? <ErrorMessage color="alert">{error}</ErrorMessage> : ""}
      {success ? <ErrorMessage color="success">{success}</ErrorMessage> : ""}
      {addReviewShow ? (
        <div className="add-review__submit-flex">
          <button onClick={submitReviewHandler} className="add-review__button">
            <BiMessageAdd style={{ fontSize: "1.8rem" }} />
            &nbsp; Submit Review
          </button>
          <BsFillBackspaceFill
            onClick={() => setAddReviewShow(false)}
            className="add-review__cancel-review ml-sm"
            title="Cancel writing review"
          />
        </div>
      ) : (
        <button onClick={addReviewHandler} className="add-review__button">
          <AiOutlinePlus style={{ fontSize: "1.8rem" }} />
          &nbsp; Add Review
        </button>
      )}
      {addReviewShow ? (
        <div className="add-review__whole-body">
          <form>
            <div className="add-review__star-select mt-sm mb-sm">
              <h4 className="heading-4 ">Select Rating &nbsp;</h4>
              <Rating
                size="large"
                name="hover-feedback"
                value={starValue}
                precision={1}
                onChange={(event, newstarValue) => {
                  setStarValue(newstarValue);
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
              />
              {starValue !== null && (
                <Box style={{ fontSize: "1.4rem" }} ml={2}>
                  {labels[hover !== -1 ? hover : starValue]}
                </Box>
              )}
            </div>
            <div>
              <label htmlFor="review-title">
                <h4 className="heading-4 mb-xs"> Add a title</h4>
                <input
                  className="add-review__title mb-sm"
                  name="review-title"
                  type="text"
                  placeholder="What is the most important ?"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>

              <label htmlFor="review-title">
                <h4 className="heading-4 mb-xs"> Add a written review</h4>
                <textarea
                  className="add-review__text-field"
                  name="rating-text"
                  id=""
                  rows="7"
                  value={textFieldValue}
                  placeholder="What did you like and what you did not?"
                  onChange={(e) => setTextFieldValue(e.target.value)}
                ></textarea>
              </label>
            </div>
          </form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default AddReview;
