import { useState, useEffect } from "react";
import WatchlistSearch from "./WatchlistSearch";
import { DoughnutChart } from "./DoughnutChart";
import { useGeneralContext } from "./GeneralContext";
import { toast } from "react-toastify";
import SellActionWindow from "./SellActionWindow";

const WatchList = () => {
  const { portfolio, openBuyWindow } = useGeneralContext();
  const [activeSearchSymbols, setActiveSearchSymbols] = useState([]);
  const [localWatchlist, setLocalWatchlist] = useState([]);

  // ✅ Normalize stock data before saving
  const normalizeStock = (stock) => {
    return {
      symbol: stock.symbol?.replace(/^.*:/, "").trim() || "UNKNOWN",
      name: stock.name || stock.symbol || "Unnamed Stock",
      price: stock.price || 0,
    };
  };

  // 🔄 Sync with portfolio changes
  useEffect(() => {
    if (portfolio?.watchlist) {
      const uniqueStocks = [
        ...new Map(portfolio.watchlist.map((s) => [s.symbol, normalizeStock(s)]))
          .values(),
      ];
      setLocalWatchlist(uniqueStocks);
    }
  }, [portfolio]);

  const handleAddToWatchlist = (stock) => {
    const normalized = normalizeStock(stock);
    if (!localWatchlist.some((s) => s.symbol === normalized.symbol)) {
      const updated = [...localWatchlist, normalized];
      setLocalWatchlist(updated);
      toast.success(`✅ Added ${normalized.symbol} to Watchlist`);
      // TODO: Call backend API to persist
    } else {
      toast.info(`ℹ️ ${normalized.symbol} is already in your Watchlist`);
    }
  };

  const handleRemoveFromWatchlist = (symbol) => {
    const updated = localWatchlist.filter((s) => s.symbol !== symbol);
    setLocalWatchlist(updated);
    toast.warn(`🗑️ Removed ${symbol} from Watchlist`);
    // TODO: Call backend API to persist removal
  };

  const [sellWindow, setSellWindow] = useState({ open: false, stock: null });

  const openSellWindow = (stock) => {
    setSellWindow({ open: true, stock });
  };

  const closeSellWindow = () => {
    setSellWindow({ open: false, stock: null });
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-xl shadow-md overflow-hidden">
      {/* Divide into 3 parts */}
      <div className="flex flex-col h-full">
        {/* 🔍 Search Bar (fixed small area) */}
        <div className="p-2 border-b border-gray-200 flex-none">
          <WatchlistSearch
            onAdd={handleAddToWatchlist}
            setActiveSearchSymbols={setActiveSearchSymbols}
          />
        </div>

        {/* 📋 Watchlist Items (takes remaining space above chart) */}
        <div className="flex-1 overflow-y-auto p-3">
          {localWatchlist.length === 0 ? (
            <p className="text-gray-500 text-sm">No stocks in watchlist</p>
          ) : (
            <ul className="space-y-3">
              {localWatchlist.map((stock) => (
                <li
                  key={stock.symbol}
                  className="p-3 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className="font-medium">{stock.name}</p>
                      <p className="text-xs text-gray-500">{stock.symbol}</p>
                    </div>
                    <p className="text-sm font-semibold">₹{stock.price}</p>
                  </div>

                  {/* 🎯 Action Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openBuyWindow(stock.symbol, stock.price)}
                      className="px-3 py-1 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      Buy
                    </button>
                    <button
                      onClick={() => openSellWindow(stock)}
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Sell
                    </button>
                    <button
                      onClick={() => handleRemoveFromWatchlist(stock.symbol)}
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 📊 Doughnut Chart (fixed 1/3 height) */}
        <div className="h-1/3 border-t border-gray-200 p-3">
          {/* <DoughnutChart watchlist={localWatchlist} /> */}
        </div>
      </div>

      {/* 🪙 Sell Action Window */}
      {sellWindow.open && (
        <SellActionWindow
          symbol={sellWindow.stock.symbol}
          price={sellWindow.stock.price}
          onClose={closeSellWindow}
        />
      )}
    </div>
  );
};

export default WatchList;
