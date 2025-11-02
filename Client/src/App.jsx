import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import ProductList from "./Pages/ProductList";
import Product from "./Pages/Product";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Cart from "./Pages/Cart";
import Favourites from "./Pages/Favourites";
import About from "./Pages/About";
import Profile from "./Pages/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="productlist" element={<ProductList />} />
          <Route path="product" element={<Product />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/profile" element={<Profile />} />
          {/*           <Route path="/about" element={<About />} />
           */}{" "}
          <Route path="favourites" element={<Favourites />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
