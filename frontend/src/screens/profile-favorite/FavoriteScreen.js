import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listFavoriteProducts } from "../../redux/user/user.actions.js";
//!==============================================================
const FavoriteScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const favoriteProductsList = useSelector(
    (state) => state.userFavoriteProducts
  );
  const { userFavoriteProducts, loading } = favoriteProductsList;
  const numberOfProducts = userFavoriteProducts.length;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    dispatch(listFavoriteProducts());
  }, [history, userInfo, dispatch]);
  return (
    <div className="checkout-screen">
      <h1 className="heading-1  ">FAVORITE PRODUCTS</h1>
      {/* <div className="checkout-screen__subtotal">
        <div>
          <h3 className="checkout-screen__subtotal--title">
            Subtotal ({cartItemsNumber} products):
          </h3>
          <h3 className="checkout-screen__subtotal--value">
            € {roundToTwo(subtotal)}
          </h3>
        </div>
        {cartItems.length === 0 ? (
          <button className=" btn-disabled">Cart is empty</button>
        ) : (
          <button
            onClick={() => {
              checkoutHandler();
            }}
            className="checkout-screen__subtotal--button"
          >
            Proceed to checkout
          </button>
        )}
      </div> */}
      <h2 className="checkout-screen__item-count">
        You have {numberOfProducts} favorite products.
      </h2>
      {userFavoriteProducts.map((item) => (
        <div key={item._id} className="checkout-screen__item">
          <img
            src={item.image}
            alt={item.name}
            className="checkout-screen__image"
          />
          <div className="checkout-screen__item-details">
            <h3 className="heading-3 checkout-screen__item-details--title">
              {item.name} x {item.qty}
            </h3>
            {item.countInStock ? (
              <h3 className="in-stock">In stock</h3>
            ) : (
              <h3 className="out-of-stock-favorites">Not in stock</h3>
            )}
            <h3 className="heading-3 checkout-screen__item-details--price">
              PRICE:
            </h3>
            <h3 className="heading-3 checkout-screen__item-details--price-value">
              € {item.price} &#10006;&nbsp;
              {/* {item.countInStock > 0 && (
                <div className="product-screen__quantity-selector checkout-screen__quantity-selector">
                  <form action="">
                    <label
                      className="product-screen__quantity-selector--text"
                      htmlFor="quantity"
                    >
                      quantity
                    </label>
                    <select
                      className="product-screen__quantity-selector--selection"
                      value={item.qty}
                      name="quantity"
                      id="quantity"
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((el) => (
                        <option
                          className="product-screen__quantity-selector--option"
                          key={el + 1}
                          value={el + 1}
                        >
                          {el + 1}
                        </option>
                      ))}
                    </select>
                  </form>
                </div>
              )} */}
            </h3>
            {/* <span
              onClick={() => removeFromCartHandler(item.product)}
              className="checkout-screen__remove"
            >
              Remove
            </span> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavoriteScreen;
