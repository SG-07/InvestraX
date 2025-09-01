import { useState } from "react";
import { PortfolioAPI, TradeAPI } from "../services/api";
import { useGeneralContext } from "./GeneralContext";

const WatchList = () => {
  const { portfolio, setPortfolio, setHoldings, setWallet, transactions, setTransactions } =
    useGeneralContext();

  const [loading, setLoading] = useState(false);

  const watchlist = portfolio?.watchlist || [];

  const handleTrade = async (symbol, price, type) => {
    setLoading(true);
    try {
      const payload = { symbol, qty: 1, price };
      const res =
        type === "BUY" ? await TradeAPI.buy(payload) : await TradeAPI.sell(payload);

      setHoldings(res.data?.holdings || []);
      if (res.data?.portfolio) setWallet(res.data.portfolio.totalValue ?? 0);
      if (res.data?.transaction) {
        setTransactions([res.data.transaction, ...(transactions || [])]);
      }

      alert(`✅ ${type} successful for ${symbol}`);
    } catch (err) {
      console.error(`❌ ${type} failed:`, err);
      alert(err?.response?.data?.message || "Trade failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (symbol) => {
    try {
      await PortfolioAPI.removeWatchlist(symbol);

      // ✅ Update context portfolio
      setPortfolio((prev) => ({
        ...prev,
        watchlist: (prev.watchlist || []).filter((s) => s.symbol !== symbol),
      }));
    } catch (err) {
      console.error("❌ Failed to remove stock from watchlist:", err);
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded h-full overflow-y-auto">
      <h2 className="text-lg font-bold mb-3">📋 Watchlist</h2>
      {watchlist.length === 0 ? (
        <p className="text-sm text-gray-500">No stocks in your watchlist</p>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Symbol</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {watchlist.map((s, i) => (
              <tr key={i}>
                <td className="border p-2">{s.symbol}</td>
                <td className="border p-2">₹{s.price || "-"}</td>
                <td className="border p-2 flex gap-2">
                  <button
                    onClick={() => handleTrade(s.symbol, s.price, "BUY")}
                    disabled={loading}
                    className="px-2 py-1 bg-green-600 text-white rounded"
                  >
                    Buy
                  </button>
                  <button
                    onClick={() => handleTrade(s.symbol, s.price, "SELL")}
                    disabled={loading}
                    className="px-2 py-1 bg-red-600 text-white rounded"
                  >
                    Sell
                  </button>
                  <button
                    onClick={() => handleRemove(s.symbol)}
                    className="px-2 py-1 bg-gray-400 text-white rounded"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default WatchList;
