import React from "react";
import CheckoutSteps from "../../components/checkout-steps/CheckoutSteps";

const PaymentScreen = () => {
  return (
    <div>
      <CheckoutSteps
        active2="selected"
        active1="selected"
        animate1=""
        animate2="animate"
      />
    </div>
  );
};

export default PaymentScreen;
