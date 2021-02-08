import React, { useState } from "react";
import "./AddReview.scss";
import { createProductReview } from "../../redux/product/product.actions";
import { AiOutlinePlus } from "react-icons/ai";

//!==========================================================
const AddReview = () => {
  const [addReviewShow, setAddReviewShow] = useState(false);
  const [rating, setRating] = useState(0);
  const addReviewHandler = () => {
    setAddReviewShow(!addReviewShow);
  };
  return (
    <div className="add-review mt-sm">
      <button onClick={addReviewHandler} className="add-review__button">
        <AiOutlinePlus />
        &nbsp; Add Review
      </button>
      {addReviewShow ? (
        <div>
          <h4 className="heading-4 mt-sm mb-xs">Select Rating</h4>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default AddReview;
