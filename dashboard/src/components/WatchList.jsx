import { useEffect, useState, useRef } from "react";
import { WatchlistAPI, HoldingsAPI } from "../services/api";
import { useGeneralContext } from "./GeneralContext";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import WatchlistSearch from "./WatchlistSearch";

ChartJS.register(ArcElement, Tooltip, Legend);

const WatchList = () => {
  const { openBuyWindow } = useGeneralContext();
  const chartRef = useRef(null);

  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [holdingsData, setHoldingsData] = useState({ labels: [], datasets: [] });
  const [activeSearchSymbols, setActiveSearchSymbols] = useState([]);

  const PAGE_SIZE = 6; // 🔹 show only 6 per page

  const fetchWatchlist = async () => {
    try {
      const res = await WatchlistAPI.list();
      setWatchlist(Array.isArray(res.data?.data) ? res.data.data : []);
    } catch (err) {
      console.error("❌ Failed to fetch watchlist:", err);
      setError("Unable to load watchlist. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWatchlist();
    fetchHoldings();
  }, []);

  const fetchHoldings = async () => {
    try {
      const res = await HoldingsAPI.list();
      const holdings = Array.isArray(res.data) ? res.data : [];
      updateHoldingsChart(holdings);
    } catch (err) {
      console.error("❌ Failed to fetch holdings data:", err);
    }
  };

  const updateHoldingsChart = (holdings) => {
    const defaultColors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"];
    setHoldingsData(
      holdings.length > 0
        ? {
            labels: holdings.map((h) => h.symbol),
            datasets: [
              {
                label: "Holdings Value",
                data: holdings.map((h) => h.value),
                backgroundColor: holdings.map((_, i) => defaultColors[i % defaultColors.length]),
                borderWidth: 1,
              },
            ],
          }
        : { labels: [], datasets: [] }
    );
  };

  const handleRemove = async (symbol) => {
    try {
      await WatchlistAPI.remove(symbol);
      setWatchlist((prev) => prev.filter((s) => s.symbol !== symbol));
    } catch (err) {
      alert("❌ Failed to remove from watchlist");
    }
  };

  const filteredStocks = watchlist;
  const totalPages = Math.ceil(filteredStocks.length / PAGE_SIZE);
  const currentStocks = filteredStocks.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  if (loading) return <p className="text-center mt-10">Loading watchlist...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  const handleChartClick = (event) => {
    const chart = chartRef.current;
    if (!chart) return;

    const elements = chart.getElementsAtEventForMode(event.native, "nearest", { intersect: true }, true);
    if (elements.length > 0) {
      const idx = elements[0].index;
      const symbol = holdingsData.labels[idx];
      if (symbol) openBuyWindow(symbol);
    }
  };

  return (
    <div className="flex flex-col h-full border border-gray-300 rounded">
      {/* --- Company search component --- */}
      <WatchlistSearch 
        fetchWatchlist={fetchWatchlist} 
        setActiveSearchSymbols={setActiveSearchSymbols} 
      />

      {/* --- Watchlist table --- */}
      <div className="flex flex-col flex-[0_0_66%] border-b border-gray-200">
        <div className="flex-1 overflow-y-auto p-4">
          {currentStocks.length === 0 ? (
            <p className="text-center text-gray-400 mt-10">No matching stocks found.</p>
          ) : (
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left px-2 py-2 text-gray-500 font-light">Symbol</th>
                  <th className="text-right px-2 py-2 text-gray-500 font-light">Price</th>
                  <th className="text-right px-2 py-2 text-gray-500 font-light">Change</th>
                  <th className="text-right px-2 py-2 text-gray-500 font-light">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentStocks.map((stock, idx) => (
                  <tr
                    key={idx}
                    className={`border-b border-gray-200 ${
                      activeSearchSymbols.includes(stock.symbol) ? "bg-yellow-100" : ""
                    }`}
                  >
                    <td className="px-2 py-2">{stock.symbol}</td>
                    <td className="px-2 py-2 text-right">{stock.price?.toFixed(2) ?? "-"}</td>
                    <td
                      className={`px-2 py-2 text-right ${
                        (stock.change ?? 0) >= 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {(stock.change ?? 0).toFixed(2)}
                    </td>
                    <td className="px-2 py-2 text-right flex gap-2 justify-end">
                      <button
                        onClick={() => openBuyWindow(stock.symbol)}
                        className="px-3 py-1 bg-blue-500 text-white rounded-md"
                      >
                        Trade
                      </button>
                      <button
                        onClick={() => handleRemove(stock.symbol)}
                        className="px-3 py-1 bg-red-500 text-white rounded-md"
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

        {/* --- Pagination --- */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 p-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className={`px-3 py-1 rounded ${page === 1 ? "bg-gray-200 text-gray-400" : "bg-gray-300"}`}
            >
              Prev
            </button>

            <span className="px-2 py-1 text-gray-600">
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className={`px-3 py-1 rounded ${page === totalPages ? "bg-gray-200 text-gray-400" : "bg-gray-300"}`}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* --- Holdings Chart --- */}
      <div className="flex-1 p-4">
        {holdingsData.labels.length > 0 ? (
          <Doughnut ref={chartRef} data={holdingsData} onClick={handleChartClick} />
        ) : (
          <p className="text-center text-gray-400 mt-10">No holdings data available.</p>
        )}
      </div>
    </div>
  );
};

export default WatchList;
