import React from "react";
import NavigationBar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import ProductDetail from './pages/ProductDetail'
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import WhatsAppButton from "./components/WhatsAppButton";
import Footer from "./components/Footer";
import LoginRegister from "./pages/LoginRegister";



function App() {
  useEffect(() => {
  AOS.init({
    duration: 1000, // animation duration
    once: true,     // animation only once
  });
}, []);
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/login" element={<LoginRegister />} />
      </Routes>
      <section data-aos="fade-up">
        <Footer />
      </section>
      <WhatsAppButton /> 
    </>
  );
}

export default App;
