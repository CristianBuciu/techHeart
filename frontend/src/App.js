import React, { useEffect } from "react";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Shop from "./screens/shop/Shop";
import { Route } from "react-router-dom";
import ProductScreen from "./screens/product-screen/ProductScreen";
import { useSelector, useDispatch } from "react-redux";
import { toggleCartShow } from "./redux/cart/cart.actions.js";
import Login from "./screens/login-screen/Login.js";
import Signup from "./screens/signup-screen/Signup.js";
import ProfileScreen from "./screens/profile-screen/ProfileScreen.js";
import ShippingScreen from "./screens/shipping-screen/ShippingScreen.js";
import PaymentScreen from "./screens/payment-screen/PaymentScreen";
import CompleteOrder from "./screens/complete-order-screen/CompleteOrder";

//!==================================================================
function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.cartToggle.showCart);
  const overlayClickHandler = () => {
    dispatch(toggleCartShow());
  };

  return (
    <>
      <Header />
      <main className="app-main">
        <div>
          <Route path="/shipping" component={ShippingScreen} />{" "}
          <Route path="/payment" component={PaymentScreen} />{" "}
          <Route path="/complete-order" component={CompleteOrder} />{" "}
        </div>
        {showCart ? (
          <div onClick={overlayClickHandler} className="overlay">
            {" "}
          </div>
        ) : null}{" "}
        <Route path="/shop/:category" component={Shop} />
        <Route path="/product/:id" component={ProductScreen} />{" "}
        <Route path="/login" component={Login} />{" "}
        <Route path="/register" component={Signup} />{" "}
        <Route path="/profile" component={ProfileScreen} />{" "}
      </main>{" "}
      <Footer className="footer" />
    </>
  );
}

export default App;
