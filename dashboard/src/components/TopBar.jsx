import { useEffect, useState } from "react";
import Menu from "./Menu";
import { MarketAPI } from "../services/api";
import clsx from "clsx";

const TopBar = () => {
  const [nifty, setNifty] = useState({
    price: null,
    lastNonZeroChange: 0,
    flash: "text-gray-700",
    animate: false,
    arrowFlash: false,
  });

  const [sensex, setSensex] = useState({
    price: null,
    lastNonZeroChange: 0,
    flash: "text-gray-700",
    animate: false,
    arrowFlash: false,
  });

  const fetchMarketData = async () => {
    try {
      const [niftyRes, sensexRes] = await Promise.all([
        MarketAPI.nifty(),
        MarketAPI.sensex(),
      ]);

      const niftyPrice = niftyRes.data?.data?.price ?? null;
      const niftyChange = niftyRes.data?.data?.change ?? 0;

      const sensexPrice = sensexRes.data?.data?.price ?? null;
      const sensexChange = sensexRes.data?.data?.change ?? 0;

      // Nifty update
      setNifty({
        price: niftyPrice,
        lastNonZeroChange: niftyChange,
        flash:
          niftyChange > 0
            ? "text-green-600"
            : niftyChange < 0
            ? "text-red-500"
            : "text-gray-700",
        animate: niftyChange !== 0,
        arrowFlash: niftyChange !== 0,
      });

      // Sensex update
      setSensex({
        price: sensexPrice,
        lastNonZeroChange: sensexChange,
        flash:
          sensexChange > 0
            ? "text-green-600"
            : sensexChange < 0
            ? "text-red-500"
            : "text-gray-700",
        animate: sensexChange !== 0,
        arrowFlash: sensexChange !== 0,
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

  const formatValue = (val) => (val !== null ? val.toFixed(2) : "--");

  const renderChange = (lastNonZeroChange, arrowFlash) => {
    if (lastNonZeroChange > 0)
      return (
        <span className={clsx(arrowFlash && "animate-pulse")}>
          ↑ {lastNonZeroChange.toFixed(2)}
        </span>
      );
    if (lastNonZeroChange < 0)
      return (
        <span className={clsx(arrowFlash && "animate-pulse")}>
          ↓ {Math.abs(lastNonZeroChange).toFixed(2)}
        </span>
      );
    return "—";
  };

  const animatedClass = (animate) =>
    animate
      ? "transition-colors duration-500 scale-105"
      : "transition-colors duration-500 scale-100";

  return (
    <div className="w-full h-[10vh] flex items-center shadow-[0px_0px_4px_2px_rgb(236,235,235)] box-border z-[9]">
      <div className="basis-[32%] h-full px-[20px] py-[10px] border-r border-r-[rgb(224,224,224)] box-border flex items-center justify-around">
        {/* NIFTY */}
        <div className="basis-[40%] flex items-center justify-evenly">
          <p className="text-[0.8rem] font-medium uppercase text-[#616161] whitespace-nowrap">
            NIFTY 50
          </p>
          <p
            className={clsx(
              `text-[0.8rem] font-medium ${nifty.flash}`,
              animatedClass(nifty.animate)
            )}
          >
            {formatValue(nifty.price)}
          </p>
          <p
            className={clsx(
              `text-[0.8rem] font-normal ${nifty.flash}`,
              animatedClass(nifty.animate)
            )}
          >
            {renderChange(nifty.lastNonZeroChange, nifty.arrowFlash)}
          </p>
        </div>

        {/* SENSEX */}
        <div className="basis-[40%] flex items-center justify-evenly">
          <p className="text-[0.8rem] font-medium uppercase text-[#616161] whitespace-nowrap">
            SENSEX
          </p>
          <p
            className={clsx(
              `text-[0.8rem] font-medium ${sensex.flash}`,
              animatedClass(sensex.animate)
            )}
          >
            {formatValue(sensex.price)}
          </p>
          <p
            className={clsx(
              `text-[0.8rem] font-normal ${sensex.flash}`,
              animatedClass(sensex.animate)
            )}
          >
            {renderChange(sensex.lastNonZeroChange, sensex.arrowFlash)}
          </p>
        </div>
      </div>

      {/* User Menu */}
      <Menu />
    </div>
  );
};

export default TopBar;
