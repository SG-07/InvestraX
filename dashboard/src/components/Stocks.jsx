import { useEffect, useState } from "react";
import { StocksAPI, TradeAPI, PortfolioAPI } from "../services/api";
import { useGeneralContext } from "./GeneralContext";

const Stocks = () => {
  const {
    setHoldings,
    setWallet,
    transactions,
    setTransactions,
    setPortfolio,
  } = useGeneralContext();

  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch all stocks from DB
  useEffect(() => {
    async function fetchStocks() {
      try {
        const res = await StocksAPI.list({ limit: 100 }); // can add pagination later
        const filteredStocks = (res.data?.data || []).filter((s) => s.name);
        setStocks(filteredStocks);
        console.log(`📊 Stocks rendered: ${filteredStocks.length}`);
      } catch (err) {
        console.error("❌ Error fetching stocks:", err);
      }
    }
    fetchStocks();
  }, []);

  const handleTrade = async (symbol, price, type) => {
    try {
      // Ask user for quantity
      const qtyInput = prompt(`Enter quantity to ${type} for ${symbol}:`, "1");
      if (!qtyInput) return; // user cancelled
      const qty = parseInt(qtyInput, 10);
      if (isNaN(qty) || qty <= 0) {
        alert("❌ Invalid quantity");
        return;
      }

      const totalPrice = qty * price;

      // Confirm total price
      const confirmed = window.confirm(
        `You are about to ${type} ${qty} shares of ${symbol} at ₹${price} each.\nTotal: ₹${totalPrice}\nProceed?`
      );
      if (!confirmed) return;

      setLoading(true);

      const payload = { symbol, qty, price };
      const res =
        type === "BUY"
          ? await TradeAPI.buy(payload)
          : await TradeAPI.sell(payload);

      setHoldings(res.data?.holdings || []);
      if (res.data?.portfolio) setWallet(res.data.portfolio.totalValue ?? 0);
      if (res.data?.transaction) {
        setTransactions([res.data.transaction, ...(transactions || [])]);
      }

      alert(`✅ ${type} successful for ${qty} shares of ${symbol}`);
    } catch (err) {
      console.error(`❌ ${type} failed:`, err);
      alert(err?.response?.data?.message || "Trade failed");
    } finally {
      setLoading(false);
    }
  };

  const handleAddWatchlist = async (symbol) => {
    try {
      const res = await PortfolioAPI.addWatchlist(symbol);
      alert(`⭐ Added ${symbol} to Watchlist`);

      setPortfolio((prev) => ({
        ...prev,
        watchlist: res.data.data, // ✅ use .data to get array
      }));
    } catch (err) {
      console.error("❌ Watchlist add failed:", err);
      alert(err?.response?.data?.message || "Failed to add to watchlist");
    }
  };

  return (
    <div className="p-4">
      <h3 className="font-semibold text-lg mb-2">All Stocks</h3>
      <table className="w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Symbol</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Change%</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(stocks) && stocks.length > 0 ? (
            stocks.map((s, i) => (
              <tr key={i}>
                <td className="border p-2">{s.symbol}</td>
                <td className="border p-2">{s.name}</td>
                <td className="border p-2">₹{s.price}</td>
                <td
                  className={`border p-2 ${
                    s.changepct < 0 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {s.changepct}%
                </td>
                <td className="border p-2 flex gap-2">
                  <button
                    onClick={() => handleTrade(s.symbol, s.price, "BUY")}
                    disabled={loading}
                    className="px-2 py-1 bg-green-600 text-white rounded"
                  >
                    Buy
                  </button>
                  <button
                    onClick={() => handleAddWatchlist(s.symbol)}
                    className="px-2 py-1 bg-blue-600 text-white rounded"
                  >
                    Watchlist
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border p-2 text-center text-gray-500" colSpan={5}>
                No stocks available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Stocks;
