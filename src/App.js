import { Route, Routes } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import { useState } from "react";
import CartPage from "./pages/CartPage";

function App() {
  const [cart, setCart] = useState([]);
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/products" element={<Products />} />
      <Route path="/cart" element={<CartPage />} />
      <Route
        path="/product/:id"
        element={<ProductDetail cart={cart} setCart={setCart} />}
      />
    </Routes>
  );
}

export default App;
