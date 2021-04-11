import React, { useState, useEffect } from "react";
import { ImArrowUp } from "react-icons/im";
//!=================================================
const ToCartVisual = () => {
  const [isVisible, setVisible] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);
    return () => clearTimeout(timer);
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
