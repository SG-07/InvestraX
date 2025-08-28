import { useEffect, useState } from "react";
import Menu from "./Menu";
import { getNifty, getSensex } from "../services/api";
import clsx from "clsx"; // make sure to install clsx: npm i clsx

const TopBar = () => {
  const [nifty, setNifty] = useState({ price: null, prevPrice: null, change: 0, highlight: false });
  const [sensex, setSensex] = useState({ price: null, prevPrice: null, change: 0, highlight: false });

  const fetchMarketData = async () => {
    try {
      const [niftyRes, sensexRes] = await Promise.all([getNifty(), getSensex()]);

      const niftyPrice = niftyRes.data?.data?.price ?? null;
      const sensexPrice = sensexRes.data?.data?.price ?? null;

      setNifty(prev => {
        const change = prev.price !== null ? niftyPrice - prev.price : 0;
        const highlight = prev.price !== niftyPrice;
        console.log(`📈 Nifty update: Prev=${prev.price}, Current=${niftyPrice}, Change=${change.toFixed(2)}`);
        return { price: niftyPrice, prevPrice: prev.price ?? niftyPrice, change, highlight };
      });

      setSensex(prev => {
        const change = prev.price !== null ? sensexPrice - prev.price : 0;
        const highlight = prev.price !== sensexPrice;
        console.log(`📈 Sensex update: Prev=${prev.price}, Current=${sensexPrice}, Change=${change.toFixed(2)}`);
        return { price: sensexPrice, prevPrice: prev.price ?? sensexPrice, change, highlight };
      });

    } catch (err) {
      console.error("❌ Failed to fetch market data:", err);
    }
  };

  useEffect(() => {
    fetchMarketData();
    const interval = setInterval(fetchMarketData, 10000);
    return () => clearInterval(interval);
  }, []);

  // Reset highlight after 1 second
  useEffect(() => {
    if (nifty.highlight) {
      const timer = setTimeout(() => setNifty(prev => ({ ...prev, highlight: false })), 1000);
      return () => clearTimeout(timer);
    }
  }, [nifty.highlight]);

  useEffect(() => {
    if (sensex.highlight) {
      const timer = setTimeout(() => setSensex(prev => ({ ...prev, highlight: false })), 1000);
      return () => clearTimeout(timer);
    }
  }, [sensex.highlight]);

  const formatValue = (val) => (val !== null ? val.toFixed(2) : "--");

  const renderChange = (change) => {
    if (change > 0) return `↑ ${change.toFixed(2)}`;
    if (change < 0) return `↓ ${Math.abs(change).toFixed(2)}`;
    return "—";
  };

  const changeColor = (change) => {
    if (change > 0) return "text-green-600";
    if (change < 0) return "text-red-500";
    return "text-gray-500";
  };

  const highlightClass = (highlight) => highlight ? "bg-yellow-200 transition-colors duration-500" : "";

  return (
    <div className="w-full h-[10vh] flex items-center shadow-[0px_0px_4px_2px_rgb(236,235,235)] box-border z-[9]">
      <div className="basis-[32%] h-full px-[20px] py-[10px] border-r border-r-[rgb(224,224,224)] box-border flex items-center justify-around">
        {/* NIFTY */}
        <div className="basis-[40%] flex items-center justify-evenly">
          <p className="text-[0.8rem] font-medium uppercase text-[#616161] whitespace-nowrap">
            NIFTY 50
          </p>
          <p className={clsx(`text-[0.8rem] font-medium ${changeColor(nifty.change)}`, highlightClass(nifty.highlight))}>
            {formatValue(nifty.price)}
          </p>
          <p className={clsx(`text-[0.8rem] font-normal ${changeColor(nifty.change)}`, highlightClass(nifty.highlight))}>
            {renderChange(nifty.change)}
          </p>
        </div>

        {/* SENSEX */}
        <div className="basis-[40%] flex items-center justify-evenly">
          <p className="text-[0.8rem] font-medium uppercase text-[#616161] whitespace-nowrap">
            SENSEX
          </p>
          <p className={clsx(`text-[0.8rem] font-medium ${changeColor(sensex.change)}`, highlightClass(sensex.highlight))}>
            {formatValue(sensex.price)}
          </p>
          <p className={clsx(`text-[0.8rem] font-normal ${changeColor(sensex.change)}`, highlightClass(sensex.highlight))}>
            {renderChange(sensex.change)}
          </p>
        </div>
      </div>

      {/* User Menu */}
      <Menu />
    </div>
  );
};

export default TopBar;
