import { useEffect, useState } from "react";
import Menu from "./Menu";
import { getNifty, getSensex } from "../services/api";

const TopBar = () => {
  const [nifty, setNifty] = useState({ value: 0, change: 0 });
  const [sensex, setSensex] = useState({ value: 0, change: 0 });

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const [niftyRes, sensexRes] = await Promise.all([getNifty(), getSensex()]);
        setNifty({ value: niftyRes.data.value ?? 0, change: niftyRes.data.change ?? 0 });
        setSensex({ value: sensexRes.data.value ?? 0, change: sensexRes.data.change ?? 0 });
      } catch (err) {
        console.error("❌ Failed to fetch market data:", err);
      }
    };

    fetchMarketData();
    const interval = setInterval(fetchMarketData, 15000); // update every 15s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[10vh] flex items-center shadow-[0px_0px_4px_2px_rgb(236,235,235)] box-border z-[9]">
      <div className="basis-[32%] h-full px-[20px] py-[10px] border-r border-r-[rgb(224,224,224)] box-border flex items-center justify-around">
        <div className="basis-[40%] flex items-center justify-evenly">
          <p className="text-[0.8rem] font-medium uppercase text-[#616161] whitespace-nowrap">NIFTY 50</p>
          <p className={`text-[0.8rem] font-medium ${nifty.change >= 0 ? "text-green-600" : "text-red-500"}`}>
            {nifty.value.toFixed(2)}
          </p>
          <p className={`text-[0.8rem] font-normal ${nifty.change >= 0 ? "text-green-600" : "text-red-500"}`}>
            {nifty.change.toFixed(2)}
          </p>
        </div>
        <div className="basis-[40%] flex items-center justify-evenly">
          <p className="text-[0.8rem] font-medium uppercase text-[#616161] whitespace-nowrap">SENSEX</p>
          <p className={`text-[0.8rem] font-medium ${sensex.change >= 0 ? "text-green-600" : "text-red-500"}`}>
            {sensex.value.toFixed(2)}
          </p>
          <p className={`text-[0.8rem] font-normal ${sensex.change >= 0 ? "text-green-600" : "text-red-500"}`}>
            {sensex.change.toFixed(2)}
          </p>
        </div>
      </div>

      <Menu />
    </div>
  );
};

export default TopBar;