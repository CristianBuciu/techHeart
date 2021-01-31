import React, { useEffect } from "react";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import HomeScreen from "./screens/home-screen/HomeScreen";
import { Route } from "react-router-dom";
import ProductScreen from "./screens/product-screen/ProductScreen";
import { useSelector, useDispatch } from "react-redux";
import { toggleCartShow } from "./redux/cart/cart.actions.js";
import Login from "./screens/login/Login.js";
import Signup from "./screens/signup/Signup.js";
import ProfileScreen from "./screens/profile/ProfileScreen.js";
import ShippingScreen from "./screens/shipping-screen/ShippingScreen.js";
import PaymentScreen from "./screens/payment/PaymentScreen";
import CompleteOrder from "./screens/complete-order/CompleteOrder";
import { Link } from "react-router-dom";
import { GiTechnoHeart } from "react-icons/gi";

//!==================================================================
function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.cartToggle.showCart);
  const overlayClickHandler = () => {
    dispatch(toggleCartShow());
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <>
      <Header />
      <Route path="/shipping" component={ShippingScreen} />{" "}
      <Route path="/payment" component={PaymentScreen} />{" "}
      <Route path="/complete-order" component={CompleteOrder} />{" "}
      <main className="app-main">
        {" "}
        {showCart ? (
          <div onClick={overlayClickHandler} className="overlay">
            {" "}
          </div>
        ) : null}{" "}
        <Route path="/shop" render={() => <HomeScreen />} />{" "}
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
