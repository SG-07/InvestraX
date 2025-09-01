import { useEffect, useState } from "react";
import { StocksAPI, PortfolioAPI } from "../services/api";
import { useGeneralContext } from "./GeneralContext";
import BuyActionWindow from "./BuyActionWindow";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Stocks = () => {
  const { setPortfolio, refreshPortfolio } = useGeneralContext();

  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);

  // Fetch all stocks from DB
  useEffect(() => {
    async function fetchStocks() {
      try {
        const res = await StocksAPI.list({ limit: 200 });
        const filteredStocks = (res.data?.data || []).filter((s) => s.name);
        setStocks(filteredStocks);
        console.log(`📊 Stocks rendered: ${filteredStocks.length}`);
      } catch (err) {
        console.error("❌ Error fetching stocks:", err);
      }
    }
    fetchStocks();
  }, []);

  const handleAddWatchlist = async (symbol) => {
    try {
      const res = await PortfolioAPI.addWatchlist(symbol);
      toast.success(`⭐ Added ${symbol} to Watchlist`, {
        position: "top-right",
      });

      setPortfolio((prev) => {
        // ensure we don't add duplicates
        const updatedWatchlist = Array.isArray(prev.watchlist)
          ? [...new Set([...prev.watchlist, symbol])]
          : [symbol];

        return {
          ...prev,
          watchlist: updatedWatchlist,
        };
      });

      console.log("✅ Watchlist updated in context:", symbol);
    } catch (err) {
      console.error("❌ Watchlist add failed:", err);
      toast.error(
        err?.response?.data?.message || "Failed to add to watchlist",
        {
          position: "top-right",
        }
      );
    }
  };

  return (
    <div className="p-4">
      <ToastContainer />
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
                    onClick={() => setSelectedStock(s)}
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

      {/* BuyActionWindow modal */}
      {selectedStock && (
        <BuyActionWindow
          stock={selectedStock}
          onClose={() => setSelectedStock(null)}
        />
      )}
    </div>
  );
};

export default Stocks;
