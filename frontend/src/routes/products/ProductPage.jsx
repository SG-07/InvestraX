import Hero from '@routes/products/Hero';
import LeftSection from '@routes/products/LeftSection';
import RightSection from '@routes/products/RightSection';

function ProductPage() {
  return (
    <>
      <Hero />

      <LeftSection
        imageUrl="media/images/kite.png"
        productName="TradeSprint"
        productDesc="Our lightning-fast investment simulation platform designed for modern learners and aspiring investors. 
        Experience real-time market scenarios, intuitive charts, a clean interface, and powerful tools — all crafted 
        to help you learn and grow confidently. Available seamlessly on desktop, Android, and iOS."
      />

      <RightSection imageUrl="media/images/kite.png"
        productName="TradeBoard"
        productDesc="Your all-in-one investment dashboard. From trade summaries to portfolio visualizations, 
        TradeBoard gives you the power to evaluate and grow your strategy."
      />

      <LeftSection
        imageUrl="media/images/coin.png"
        productName="FundFlow"
        productDesc="Invest in direct mutual funds — fast, secure, and commission-free. 
        FundFlow brings mutual fund investing to your fingertips, right inside your InvestraX account."
      />

      <RightSection imageUrl="media/images/varsity.png"
        productName="LearnX"
        productDesc="Master the markets with bite-sized, interactive lessons. LearnX turns complex financial concepts into easy, 
        everyday learning — accessible anywhere, anytime."
      />


    </>
  );
}

export default ProductPage;
