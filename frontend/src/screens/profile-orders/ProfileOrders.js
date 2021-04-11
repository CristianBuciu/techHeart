//! Core
import React, { useEffect } from "react";
//! Redux
import { getMyOrders } from "../../redux/order/order.actions.js";
import { useDispatch, useSelector } from "react-redux";
//! Components
import LoadingGeneric from "../../components/loader-generic/LoaderGeneric.js";
import ErrorMessage from "../../components/error-message/ErrorMessage.js";
import OrderOfOrders from "../../components/order-of-orders/OrderOfOrders";
//!======================================================
const AllOrdersScreen = () => {
  //! Hooks
  const dispatch = useDispatch();

  //! Selectors
  const orderMyOrders = useSelector((state) => state.orderMyOrders);
  const { loading, error, orders } = orderMyOrders;

  //! Use Effect
  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  return (
    <>
      <h1 className="heading-1  ">YOUR ORDERS</h1>
      {loading ? (
        <LoadingGeneric />
      ) : error ? (
        <ErrorMessage color="alert">{error}</ErrorMessage>
      ) : (
        <div className="my-orders">
          <h2 className="favorite-screen__item-count mb-md">
            You have made{" "}
            {orders.length === 1 ? "1 order" : `${orders.length} orders`} in the
            past .
          </h2>
          {orders.map((order) => (
            <OrderOfOrders key={order._id} order={order} />
          ))}
        </div>
      )}
    </>
  );
};

export default AllOrdersScreen;
