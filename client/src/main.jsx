import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProductProvider } from './contexts/ProductContext.jsx';
import { CartProvider } from './contexts/CartContext.jsx';
import "./css/index.css";

import LandingPage from './LandingPage.jsx';
import App from './App.jsx';        // ✅ this is your shop
import Cart from './components/Cart.jsx';
import Checkout from './pages/Checkout.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ProductProvider>
      <CartProvider>
        <main className="main">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/shop/products/" element={<App />} />       {/* ✅ your actual shop */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </main>
      </CartProvider>
    </ProductProvider>
  </BrowserRouter>
);
