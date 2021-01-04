import React from "react";
import "./ErrorMessage.scss";

const ErrorMessage = ({ children }) => {
  return <div className="error-message">{children}</div>;
};

export default ErrorMessage;
