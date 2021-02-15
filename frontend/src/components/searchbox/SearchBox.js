//! Core
import React, { useState } from "react";
import "./SearchBox.scss";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//! Icons
import { BiSearchAlt } from "react-icons/bi";

//! Redux Actions
import { listProducts } from "../../redux/product/product.actions.js";
import { listFavoriteProducts } from "../../redux/user/user.actions.js";
//!============================================================
const SearchBox = () => {
  //! Hooks declaration
  const history = useHistory();
  const dispatch = useDispatch();
  //! State
  const [keyword, setKeyword] = useState("");

  //!Handlers
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim().toLowerCase()) {
      dispatch(
        listProducts({ name: { $regex: `.*${keyword}.*`, $options: "i" } })
      );
      setKeyword("");
    } else {
      dispatch(listProducts({}));
    }
  };
  return (
    <div className="search-box">
      <form onSubmit={handleSearchSubmit}>
        <input
          className="search-box__input"
          type="text"
          title="Search for products"
          placeholder="Search all products ..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button title="Search" className="search-box__search-btn">
          <BiSearchAlt />
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
