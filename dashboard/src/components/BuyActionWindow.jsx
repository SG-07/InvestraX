import { useState } from "react";
import WatchlistSearch from "./WatchlistSearch";
import { DoughnutChart } from "./DoughnutChart";
import { useGeneralContext } from "./GeneralContext";
import { toast } from "react-toastify";

const WatchList = () => {
  const { portfolio } = useGeneralContext();
  const [activeSearchSymbols, setActiveSearchSymbols] = useState([]);

  // fallback to [] if backend sends duplicates
  const watchlist = [...new Map((portfolio?.watchlist || []).map(s => [s.symbol, s])).values()];

  const handleAddToWatchlist = (stock) => {
    if (!watchlist.some((s) => s.symbol === stock.symbol)) {
      console.log("🔔 Added via search:", stock);
      // You’ll probably trigger backend API here to persist
      toast.success(`✅ Added ${stock.symbol} to Watchlist`);
    } else {
      toast.info(`ℹ️ ${stock.symbol} is already in your Watchlist`);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-xl shadow-md overflow-hidden">
      
      {/* 🔍 Search Bar */}
      <div className="p-2 border-b border-gray-200">
        <WatchlistSearch
          onAdd={handleAddToWatchlist}
          setActiveSearchSymbols={setActiveSearchSymbols}
        />
      </div>

      {/* 📋 Watchlist Items */}
      <div className="flex-1 overflow-y-auto p-3">
        {watchlist.length === 0 ? (
          <p className="text-gray-500 text-sm">No stocks in watchlist</p>
        ) : (
          <ul className="space-y-2">
            {watchlist.map((stock) => (
              <li
                key={stock.symbol}
                className="flex justify-between items-center p-2 border rounded-lg hover:bg-gray-50"
              >
                <div>
                  <p className="font-medium">{stock.name}</p>
                  <p className="text-xs text-gray-500">{stock.symbol}</p>
                </div>
                <p className="text-sm font-semibold">₹{stock.price}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 📊 Doughnut Chart */}
      <div className="h-1/3 border-t border-gray-200 p-3">
        <DoughnutChart watchlist={watchlist} />
      </div>
    </div>
  );
};

export default WatchList;
