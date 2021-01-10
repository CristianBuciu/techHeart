import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import HomeScreen from "./screens/home-screen/HomeScreen";
import { Route } from "react-router-dom";
import ProductScreen from "./screens/product-screen/ProductScreen";
import Checkout from "./screens/checkout/Checkout.js";
import { useSelector, useDispatch } from "react-redux";
import { toggleCartShow } from "./redux/cart/cart.actions.js";
import Login from "./screens/login/Login.js";
import Signup from "./screens/signup/Signup.js";
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

      <main>
        {showCart ? (
          <div onClick={overlayClickHandler} className="overlay"></div>
        ) : null}
        <Route exact path="/shop" render={() => <HomeScreen />} />
        <Route path="/product/:id" component={ProductScreen} />
        <Route path="/checkout/:id?" component={Checkout} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Signup} />
      </main>
      <Footer />
    </>
  );
}

export default App;
