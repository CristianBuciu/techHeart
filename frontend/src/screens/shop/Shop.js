//! Core
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

//! Components
import Product from "../../components/product/Product";
import LoaderGeneric from "../../components/loader-generic/LoaderGeneric";
import ErrorMessage from "../../components/error-message/ErrorMessage.js";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

//! Redux actions
import { listProducts } from "../../redux/product/product.actions.js";
import { listFavoriteProducts } from "../../redux/user/user.actions.js";

//!=======================================================
const Shop = () => {
  //! Hooks declaration
  const location = useLocation();
  const dispatch = useDispatch();

  //! State
  const [pageParams, setPageParams] = useState(1);

  //! Redux data selection hook

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages } = productList;

  //! Use effect
  useEffect(() => {
    if (location.pathname === `/shop/all-products`) {
      dispatch(listProducts({}, 1));
    } else if (location.pathname === `/shop/electronics`) {
      dispatch(listProducts({ category: "Electronics" }, 1));
    } else if (location.pathname === `/shop/home-appliances`) {
      dispatch(listProducts({ category: "Home" }, 1));
    }
    window.scrollTo(0, 0);
    setPageParams(1);
    dispatch(listFavoriteProducts());
  }, [dispatch, location]);

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
    if (location.pathname === `/shop/all-products`) {
      dispatch(listProducts({}, value));
    } else if (location.pathname === `/shop/electronics`) {
      dispatch(listProducts({ category: "Electronics" }, value));
    } else if (location.pathname === `/shop/home-appliances`) {
      dispatch(listProducts({ category: "Home" }, value));
    }
    window.scrollTo(0, 0);
    dispatch(listFavoriteProducts());
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

export default Shop;
