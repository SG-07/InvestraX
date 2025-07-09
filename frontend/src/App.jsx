import { Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import HomePage from './routes/home/HomePage';
import AboutPage from './routes/about/AboutPage';
import NotFound from '@components/layout/NotFound'; // make sure it's correctly imported
import ScrollToTop from './ScrollToTop';
import PricingPage from './routes/pricing/PricingPage';
import ProductPage from './routes/products/ProductPage';
import SupportPage from './routes/support/SupportPage';

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
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
