//! Core
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";

//! Components
import Product from "../../components/product/Product";
import LoaderGeneric from "../../components/loader-generic/LoaderGeneric";
import ErrorMessage from "../../components/error-message/ErrorMessage.js";

import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

//! Redux actions
import { listProducts } from "../../redux/product/product.actions.js";

//!=======================================================
const DealsScreen = () => {
  //! Hooks declaration

  const dispatch = useDispatch();
  const match = useRouteMatch();

  //! State
  const [pageParams, setPageParams] = useState(1);

  //! Redux data selection hook

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages } = productList;

  //! Use effect
  useEffect(() => {
    try {
      dispatch(listProducts({ onOffer: true }, 1));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, match]);

  //! MaterialUI Pagination Style
  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        marginTop: theme.spacing(2),
      },
    },
  }));
  const classes = useStyles();

  //! Handlers
  const pageChangeHandler = (event, value) => {
    setPageParams(value);
    dispatch(listProducts(dispatch(listProducts({ onOffer: true }, 1)), value));
    window.scrollTo(0, 0);
  };
  //!=======================================================
  return (
    <div className="shop">
      <div className="shop__filter">
        {/* //todo ==========================================
        <ProductFilter />
        //todo ========================================== */}
      </div>

      {loading ? (
        <LoaderGeneric />
      ) : error ? (
        <ErrorMessage color="alert">{error}</ErrorMessage>
      ) : (
        <>
          <h4 className="heading-4 mb-md">The best offers are here.</h4>
          <div className="shop__products">
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
          <div className={`${classes.root} mt-md pagination-container`}>
            <Pagination
              count={Number(pages)}
              page={Number(pageParams)}
              onChange={pageChangeHandler}
              variant="outlined"
              shape="rounded"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default DealsScreen;
