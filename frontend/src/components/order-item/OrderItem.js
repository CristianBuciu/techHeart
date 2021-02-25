import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { roundToTwo } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
//! Components
import ProductReviewModal from "../../modals/product-review-modal/ProductReviewModal";

//! Redux Actions
import { productConstants } from "../../redux/product/product.constants";

//! =======================================================================================
const OrderItem = ({ item }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  //! State
  const [productState, setProductState] = useState({ products: [] });

  //! Redux data selection hook
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //! Use Effect -> Axios call to get individual product info to later compare it with the user ID
  useEffect(() => {
    let isCancelled = false;
    try {
      const fetchProduct = async () => {
        const { data } = await axios.get("/api/products", {
          params: { search: { _id: item.product._id }, pageNumber: 1 },
        });
        setProductState(data);
      };
      if (!isCancelled) {
        fetchProduct();
      }
    } catch (error) {
      console.log(error);
    }
    return () => {
      isCancelled = true;
    };
  }, [item, dispatch, axios]);

  return (
    <div className="my-orders__items-grid">
      <div
        onClick={() => {
          history.push(`/product/${item.product._id}`);
          dispatch({ type: productConstants.PRODUCT_DETAILS_RESET });
        }}
        className="my-orders__item "
      >
        <div className="my-orders__image--container">
          <img
            src={item.product.image}
            alt={item.product.name}
            className="my-orders__image mr-sm"
          />
        </div>

        <div className="my-orders__item-details">
          <h4 className="my-orders__item-details--title text-center mb-xs">
            {item.product.name}
          </h4>

          <div style={{ textAlign: "end" }}>
            <h4 className="my-orders__item-details">
              Quantity: {item.quantity}
            </h4>
            <h4 className="my-orders__item-details--price price-number">
              €{" "}
              {roundToTwo(
                item.product.price -
                  item.product.price * (item.product.offerPriceDiscount / 100)
              )}
            </h4>
          </div>
        </div>
      </div>
      <div className="my-orders__btn-container">
        {productState.products.map((el) =>
          el.reviews.find((review) => review.user === userInfo._id) ? (
            <button key={el._id} className=" my-orders__reviewd">
              Product reviewd
            </button>
          ) : (
            <ProductReviewModal key={el._id} product={item.product} />
          )
        )}
        <button className="my-orders__btn-container--btn">
          Technical Support
        </button>
        <button className="my-orders__btn-container--btn">Return Item</button>
      </div>
    </div>
  );
};

export default OrderItem;
