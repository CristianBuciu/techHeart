import React, { useState } from "react";
import "./AddReview.scss";
import { createProductReview } from "../../redux/product/product.actions";
import { AiOutlinePlus } from "react-icons/ai";
import { BiMessageAdd } from "react-icons/bi";
import Rating from "@material-ui/lab/Rating";
import { useSelector, useDispatch } from "react-redux";
import Box from "@material-ui/core/Box";
import { BsFillBackspaceFill } from "react-icons/bs";
import ErrorMessage from "../error-message/ErrorMessage.js";
//!==========================================================
const AddReview = ({ productId }) => {
  const dispatch = useDispatch();

  const productReviewCreateSelector = useSelector(
    (state) => state.productReviewCreate
  );
  const { success, error } = productReviewCreateSelector;

  const [addReviewShow, setAddReviewShow] = useState(false);
  const [hover, setHover] = React.useState(-1);
  const [starValue, setStarValue] = React.useState(0);
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
    setAddReviewShow(false);
    refreshPage();
  };
  function refreshPage() {
    window.location.reload();
  }
  return (
    <div className="add-review mt-sm">
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
            title="Cancel writting review"
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
