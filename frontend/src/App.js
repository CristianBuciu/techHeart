import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import HomeScreen from "./screens/home-screen/HomeScreen";
function App() {
  return (
    <>
      <Header />
      <main>
        <HomeScreen />
      </main>
      <Footer />
    </>
  );
}

export default App;
