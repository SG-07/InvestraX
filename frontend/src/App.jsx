import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import Navbar from "./landing-page/Navbar";
import Footer from "./landing-page/Footer";
import Signup from "./landing-page/signup/Signup";
import AboutPage from "./landing-page/about/AboutPage";
import ProductPage from "./landing-page/products/ProductPage";
import PricingPage from "./landing-page/pricing/PricingPage";
import HomePage from "./landing-page/home/HomePage";
import Contact from "./landing-page/support/ContactPage";
import NotFound from "./landing-page/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      
      {/* Add full height flex layout wrapper */}
      <div className="min-h-screen flex flex-col">
        <Navbar />

        {/* Main content with padding for navbar and grow space */}
        <main className="pt-20 flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

