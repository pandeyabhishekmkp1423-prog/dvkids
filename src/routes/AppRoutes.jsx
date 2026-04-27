import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion'; // For smooth page transitions
import Home from '../pages/Home';
import About from '../pages/About';
import ProductsPage from '../pages/ProductsPage';
import ProductPage from '../pages/ProductPage';
import CategoriesPage from '../pages/Categories';
import NewArrivalsPage from '../pages/NewArrivals';
import OffersPage from '../pages/Offers';
import WishlistPage from '../pages/Wishlist';
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import LegalPage from '../pages/LegalPage';
import Blog from '../pages/Blog';
import BlogPost from '../pages/BlogPost';
import Testimonials from '../pages/Testimonials';

export default function AppRoutes() {
  const location = useLocation();

  return (
    /* mode="wait" ensures the old page disappears before the new one enters */
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/new" element={<NewArrivalsPage />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/programs" element={<ProductsPage />} />
        <Route path="/admission" element={<Contact />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* Blog Routes */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/testimonials" element={<Testimonials />} />

        {/* Legal Routes */}
        <Route path="/privacy" element={<LegalPage title="Privacy Policy" />} />
        <Route path="/terms" element={<LegalPage title="Terms of Service" />} />
        <Route path="/shipping" element={<LegalPage title="Shipping Policy" />} />
        <Route path="/refund" element={<LegalPage title="Refund Policy" />} />
      </Routes>
    </AnimatePresence>
  );
}