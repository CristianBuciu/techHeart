import React, { useState } from "react";
import "./SearchBox.scss";
//!============================================================
const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  return (
    <div className="search-box">
      <input
        className="search-box__input"
        type="text"
        placeholder="Search for products"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
    </div>
  );
};

export default SearchBox;
