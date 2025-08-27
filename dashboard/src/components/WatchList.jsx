import { useEffect, useState } from "react";
import { getWatchlist, removeFromWatchlist } from "../services/api";
import BuyActionWindow from "./BuyActionWindow";

const WatchList = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedStock, setSelectedStock] = useState(null);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const res = await getWatchlist();
        setWatchlist(Array.isArray(res.data?.data) ? res.data.data : []);
      } catch (err) {
        console.error("❌ Failed to fetch watchlist:", err);
        setError("Unable to load watchlist. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, []);

  const handleRemove = async (symbol) => {
    try {
      await removeFromWatchlist(symbol);
      setWatchlist((prev) => prev.filter((s) => s.symbol !== symbol));
    } catch (err) {
      alert("❌ Failed to remove from watchlist");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading watchlist...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (watchlist.length === 0)
    return (
      <p className="text-center text-gray-400 mt-10">
        Your watchlist is empty. Add stocks to track them here.
      </p>
    );

  return (
    <>
      <h3 className="text-xl font-light text-gray-700 mb-2">
        Watchlist ({watchlist.length})
      </h3>

      <div className="w-full overflow-x-auto border border-gray-300 px-4 py-3">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-y border-gray-200">
              <th className="text-left px-2 py-2 text-gray-500 font-light">Symbol</th>
              <th className="text-right px-2 py-2 text-gray-500 font-light">Price</th>
              <th className="text-right px-2 py-2 text-gray-500 font-light">Change</th>
              <th className="text-right px-2 py-2 text-gray-500 font-light">Actions</th>
            </tr>
          </thead>
          <tbody>
            {watchlist.map((stock, idx) => (
              <tr key={idx} className="border-y border-gray-200">
                <td className="text-left px-2 py-2">{stock.symbol}</td>
                <td className="text-right px-2 py-2">{(stock.price ?? "-").toFixed?.(2) ?? "-"}</td>
                <td
                  className={`text-right px-2 py-2 ${
                    (stock.change ?? 0) >= 0 ? "text-green-500" : "text-orange-400"
                  }`}
                >
                  {(stock.change ?? 0).toFixed?.(2) ?? "0.00"}
                </td>
                <td className="text-right px-2 py-2 flex gap-2 justify-end">
                  <button
                    onClick={() => setSelectedStock(stock)}
                    className="px-3 py-1 bg-blue-500 text-white rounded-md"
                  >
                    Trade
                  </button>
                  <button
                    onClick={() => handleRemove(stock.symbol)}
                    className="px-3 py-1 bg-gray-300 rounded-md"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedStock && (
        <BuyActionWindow stock={selectedStock} onClose={() => setSelectedStock(null)} />
      )}
    </>
  );
};

export default WatchList;
