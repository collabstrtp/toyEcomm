import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import Product from "./Pages/ProductList"
import ProductList from "./Pages/Product";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="product" element={<Product />} />
          <Route path="productlist" element={<ProductList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;