import React from "react";
import "./CheckoutStepts.scss";

import { AiOutlineDoubleRight } from "react-icons/ai";

//!=====================================================================
const CheckoutSteps = ({
  active1,
  active2,
  active3,

  animate1,
  animate2,
}) => {
  return (
    <div className="checkout-steps">
      <div className="checkout-steps__progress">
        <span
          className={`checkout-steps__number checkout-steps__number--${active1}`}
        >
          1
        </span>{" "}
        <span
          className={`checkout-steps--text checkout-steps--text--${active1} `}
        >
          Address
        </span>
        <AiOutlineDoubleRight
          className={`checkout-steps--arrows checkout-steps--arrows--${active1}  checkout-steps--arrows--${animate1}`}
        />
      </div>

      <div className="checkout-steps__progress">
        <span
          className={`checkout-steps__number  checkout-steps__number--${active2} `}
        >
          2
        </span>{" "}
        <span
          className={`checkout-steps--text  checkout-steps--text--${active2} `}
        >
          Payment
        </span>
        <AiOutlineDoubleRight
          className={`checkout-steps--arrows checkout-steps--arrows--${active2} checkout-steps--arrows--${animate2}`}
        />
      </div>

      <div className="checkout-steps__progress">
        <span
          className={`checkout-steps__number checkout-steps__number--${active3}`}
        >
          3
        </span>
        <span
          className={`checkout-steps--text checkout-steps--text--${active3}`}
        >
          Complete Order
        </span>
        <div></div>
      </div>
    </div>
  );
};

export default CheckoutSteps;
