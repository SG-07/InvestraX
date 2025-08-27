import { Navigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./routes/home/HomePage";
import AboutPage from "./routes/about/AboutPage";
import NotFound from "@components/layout/NotFound";
import ScrollToTop from "./scrollToTop";
import PricingPage from "./routes/pricing/PricingPage";
import ProductPage from "./routes/products/ProductPage";
import SupportPage from "./routes/support/SupportPage";
import { Login, Signup } from "./routes/signup/index";


function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="products" element={<ProductPage />} />
          <Route path="support" element={<SupportPage />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route
            path="/dashboard/*"
            element={
              <Navigate
                to={import.meta.env.VITE_DASHBOARD_URL}
                replace
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

