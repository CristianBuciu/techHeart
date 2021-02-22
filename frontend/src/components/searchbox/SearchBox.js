//! Core
import React, { useState } from "react";
import "./SearchBox.scss";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

//! Icons
import { BiSearchAlt } from "react-icons/bi";

//! Redux Actions
import { productConstants } from "../../redux/product/product.constants";

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
    const trimmedKeyword = keyword.trim().toLowerCase();
    history.push(`/search-result/${trimmedKeyword}`);
    dispatch({ type: productConstants.PRODUCT_LIST_RESET });
    setKeyword("");
  };
  const handleChange = (e) => {
    setKeyword(e.target.value);
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
          onChange={handleChange}
        />
        <button title="Search" className="search-box__search-btn">
          <BiSearchAlt />
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
