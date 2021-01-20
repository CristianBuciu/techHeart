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

//!==================================================================
function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.cart.showCart);
  const overlayClickHandler = () => {
    dispatch(toggleCartShow());
  };

  return (
    <>
      <Header />
      <main className="app-main">
        {" "}
        {showCart ? (
          <div onClick={overlayClickHandler} className="overlay">
            {" "}
          </div>
        ) : null}{" "}
        <Route exact path="/shop" render={() => <HomeScreen />} />{" "}
        <Route path="/product/:id" component={ProductScreen} />{" "}
        <Route path="/login" component={Login} />{" "}
        <Route path="/register" component={Signup} />{" "}
        <Route path="/profile" component={ProfileScreen} />{" "}
        <Route path="/shipping" component={ShippingScreen} />{" "}
        <Route path="/payment" component={PaymentScreen} />{" "}
      </main>{" "}
      <Footer />
    </>
  );
}

export default App;
