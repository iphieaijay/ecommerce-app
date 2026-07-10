import "./App.css";
import { Routes, Route } from "react-router-dom";

import { ThemeProvider } from "./context/ThemeProvider";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductDetails from "./pages/ProductDetails";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Checkout from "./pages/Checkout";
import ContactForm from "./pages/ContactForm";
import Cart from "./pages/Cart";
import OrderConfirmation from "./pages/OrderConfirmation";



function AppContent() {
  return (
    <div className="min-h-screen bg-brand-50 text-brand-950 transition-colors duration-500 dark:bg-brand-950 dark:text-brand-50">
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/contact" element={<ContactForm />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>

  );
}

