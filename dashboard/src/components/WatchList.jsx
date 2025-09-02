import { useState, useEffect } from "react";
import { useGeneralContext } from "./GeneralContext";
import WatchlistSearch from "./WatchlistSearch";
import { DoughnutChart } from "./DoughnutChart";
import { toast } from "react-toastify";
import SellActionWindow from "./SellActionWindow";
import BuyActionWindow from "./BuyActionWindow"; // ✅ import Buy window
import { PortfolioAPI } from "../services/api";

export default function WatchList() {
  const { portfolio } = useGeneralContext();
  const [localWatchlist, setLocalWatchlist] = useState([]);
  const [activeSearchSymbols, setActiveSearchSymbols] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  // ✅ Normalize stock data
  const normalizeStock = (stock) => ({
    symbol: stock.symbol?.replace(/^.*:/, "").trim() || "UNKNOWN",
    name: stock.name || stock.symbol || "Unnamed Stock",
    price: stock.price || 0,
    changePct: stock.changePct ?? 0,
  });

  // 🔄 Sync with portfolio
  useEffect(() => {
    if (portfolio?.watchlist) {
      const uniqueStocks = [
        ...new Map(
          portfolio.watchlist.map((s) => [s.symbol, normalizeStock(s)])
        ).values(),
      ];
      setLocalWatchlist(uniqueStocks);
      setCurrentPage(0);
    }
  }, [portfolio]);

  // ➕ Add stock
  const handleAddToWatchlist = (stock) => {
    const normalized = normalizeStock(stock);
    if (!localWatchlist.some((s) => s.symbol === normalized.symbol)) {
      const updated = [...localWatchlist, normalized];
      setLocalWatchlist(updated);
      toast.success(`✅ Added ${normalized.symbol} to Watchlist`);
    } else {
      toast.info(`ℹ️ ${normalized.symbol} already exists`);
    }
  };

  // ❌ Remove stock
  const handleRemoveFromWatchlist = async (symbol) => {
    try {
      await PortfolioAPI.removeWatchlist(symbol);
      setLocalWatchlist((prev) => prev.filter((s) => s.symbol !== symbol));
      toast.success("Removed from watchlist!");
    } catch (err) {
      console.error("❌ Failed to remove from watchlist:", err);
      toast.error("Failed to remove from watchlist.");
    }
  };

  // 🪙 Buy + Sell windows
  const [buyWindow, setBuyWindow] = useState({ open: false, stock: null });
  const [sellWindow, setSellWindow] = useState({ open: false, stock: null });

  const openBuyWindow = (stock) => setBuyWindow({ open: true, stock });
  const closeBuyWindow = () => setBuyWindow({ open: false, stock: null });

  const openSellWindow = (stock) => setSellWindow({ open: true, stock });
  const closeSellWindow = () => setSellWindow({ open: false, stock: null });

  // 📑 Pagination logic
  const pageSize = 8;
  const totalPages = Math.ceil(localWatchlist.length / pageSize);
  const start = currentPage * pageSize;
  const end = start + pageSize;
  const paginatedStocks = localWatchlist.slice(start, end);

  return (
    <div className="flex-[0_0_32%] h-full shadow bg-white flex flex-col">
      {/* 🔍 Sticky Search */}
      <div className="border-b border-gray-200 p-3 sticky top-0 bg-white z-10">
        <WatchlistSearch
          onAdd={handleAddToWatchlist}
          setActiveSearchSymbols={setActiveSearchSymbols}
        />
        <div className="text-xs text-gray-400 mt-1">
          {localWatchlist.length} / 50
        </div>
      </div>

      {/* Main body: list + chart */}
      <div className="flex-1 flex flex-col">
        {/* 📋 Watchlist + Pagination */}
        <div className="flex-[2] flex flex-col overflow-hidden">
          <ul className="flex-1 overflow-y-auto">
            {paginatedStocks.length === 0 ? (
              <li className="px-4 py-3 text-gray-500 text-sm">
                No stocks in watchlist
              </li>
            ) : (
              paginatedStocks.map((stock) => (
                <WatchListItem
                  key={stock.symbol}
                  stock={stock}
                  openBuyWindow={openBuyWindow}
                  openSellWindow={openSellWindow}
                  removeFromWatchlist={handleRemoveFromWatchlist}
                />
              ))
            )}
          </ul>

          {/* 🔄 Pagination */}
          <div className="flex justify-between items-center p-2 border-t border-gray-200 bg-white">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
              disabled={currentPage === 0}
              className="px-2 py-1 text-xs rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-xs text-gray-500">
              Page {currentPage + 1} of {totalPages || 1}
            </span>
            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(p + 1, totalPages - 1))
              }
              disabled={currentPage >= totalPages - 1}
              className="px-2 py-1 text-xs rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        {/* 📊 Doughnut Chart */}
        <div className="flex-[1] p-3 border-t border-gray-200">
          <DoughnutChart watchlist={localWatchlist} />
        </div>
      </div>

      {/* 🪙 Action Windows */}
      {buyWindow.open && (
        <BuyActionWindow stock={buyWindow.stock} onClose={closeBuyWindow} />
      )}
      {sellWindow.open && (
        <SellActionWindow
          stock={sellWindow.stock}
          onClose={closeSellWindow}
        />
      )}
    </div>
  );
}

function WatchListItem({
  stock,
  openBuyWindow,
  openSellWindow,
  removeFromWatchlist,
}) {
  const [showActions, setShowActions] = useState(false);

  return (
    <li
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      className="relative hover:bg-gray-50 cursor-pointer"
    >
      <div className="flex justify-between items-center px-4 py-2 text-sm">
        <span
          className={stock.changePct < 0 ? "text-red-500" : "text-green-600"}
        >
          {stock.name}
        </span>
        <div className="flex items-center space-x-2">
          <span
            className={`text-xs font-semibold ${
              stock.changePct < 0 ? "text-red-500" : "text-green-600"
            }`}
          >
            {stock.changePct.toFixed(2)}%
          </span>
          <span
            className={stock.changePct < 0 ? "text-red-500" : "text-green-600"}
          >
            {stock.changePct < 0 ? "▼" : "▲"}
          </span>
          <span className="text-sm text-gray-800">₹{stock.price}</span>
        </div>
      </div>

      {/* Hover Actions */}
      {showActions && (
        <div className="absolute inset-0 flex justify-end items-center bg-white bg-opacity-80 pr-4 space-x-2">
          <button
            onClick={() => openBuyWindow(stock)}
            className="px-2 py-1 bg-green-500 hover:bg-green-600 text-white text-xs rounded"
          >
            Buy
          </button>
          <button
            onClick={() => openSellWindow(stock)}
            className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded"
          >
            Sell
          </button>
          <button
            onClick={() => removeFromWatchlist(stock.symbol)}
            className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded"
          >
            ✕
          </button>
        </div>
      )}
    </li>
  );
}
