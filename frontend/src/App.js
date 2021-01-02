import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import HomeScreen from "./screens/home-screen/HomeScreen";
import { Route } from "react-router-dom";
import ProductScreen from "./screens/product-screen/ProductScreen";
//!==================================================================
function App() {
  return (
    <>
      <Header />
      <main>
        <Route exact path="/shop" render={() => <HomeScreen />} />
        <Route path="/product/:id" component={ProductScreen} />
      </main>
      <Footer />
    </>
  );
}

export default App;
