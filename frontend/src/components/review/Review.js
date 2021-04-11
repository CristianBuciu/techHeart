import React from "react";

import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
//!========================================================================
const Reviews = ({ review }) => {
  const createdDate = new Date(review.createdAt).toLocaleString();
  return (
    <div className="review mt-md">
      <div className="review__header">
        <img
          className="review__avatar"
          src="https://st4.depositphotos.com/5575514/23597/v/600/depositphotos_235978748-stock-illustration-neutral-profile-picture.jpg"
          alt="avatar"
        />
        <h5 className="heading-5">
          <strong>{review.name}</strong>
        </h5>
      </div>
      <Box component="fieldset" borderColor="transparent">
        <Rating name="read-only" value={review.rating} readOnly />
      </Box>
      <h4 className="heading-4">{review.title} </h4>
      <p className="review__created-date">Review written at {createdDate}</p>
      <p className="review__comment">{review.comment}</p>
    </div>
  );
};

export default Reviews;
