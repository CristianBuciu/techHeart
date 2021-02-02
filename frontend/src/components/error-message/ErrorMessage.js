import React, { useState, useEffect } from "react";
import "./ErrorMessage.scss";

const ErrorMessage = ({ children, color }) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, 5000);
  }, []);
  return visible ? (
    <div className={`error-message ${color}`}>{children}</div>
  ) : (
    <></>
  );
};

export default ErrorMessage;
