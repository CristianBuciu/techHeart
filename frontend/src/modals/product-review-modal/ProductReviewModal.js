//! Core
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "./ProductReviewModal.scss";
//! Components
import AddReview from "../../components/add-review/AddReview";

//! Icons
import { RiCloseFill } from "react-icons/ri";

//!=================================================================
const AddressEdit = ({ product }) => {
  const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [history, userInfo]);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="my-orders__btn-container--btn"
      >
        Leave Review
      </button>
      {showModal ? (
        <div className="edit-address">
          <div className="edit-address__form-container">
            <RiCloseFill
              onClick={() => setShowModal(false)}
              className="edit-address__close"
            />
            <h2 className="heading-2 ">Add Review to</h2>
            <span className="product-review-modal__product-name">
              {product.name}
            </span>
            <img
              className="product-review-modal__image"
              src={product.image}
              alt={product.name}
            />

            <AddReview showModal={true} productId={product._id} />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default AddressEdit;
