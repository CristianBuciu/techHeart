import React from "react";
import ReactDOM from "react-dom";
import "./sass/main.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import ScrollToTop from "./components/scroll-to-top/ScrollToTop.jsx";
ReactDOM.render(
  <Provider store={store}>
    {" "}
    <Router>
      <ScrollToTop />
      <App />
    </Router>
  </Provider>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
