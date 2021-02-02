import React, { useState, useEffect } from "react";
import "./ActionShow.scss";
import { ImArrowUp } from "react-icons/im";
//!=================================================
const ToCartVisual = () => {
  const [isVisible, setVisible] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, 3000);
  }, []);
  return isVisible ? (
    <div className="to-cart-visual">
      <ImArrowUp className="to-cart-visual__arrow" />
      <h3>Added to cart</h3>
    </div>
  ) : (
    <></>
  );
};

export default ToCartVisual;
