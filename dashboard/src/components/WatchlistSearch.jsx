import { useState, useEffect } from "react";
import { WatchlistAPI } from "../services/api";

const WatchlistSearch = ({ fetchWatchlist, setActiveSearchSymbols }) => {
  const [searchName, setSearchName] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchCompany = async () => {
    if (!searchName.trim()) return;
    try {
      const res = await WatchlistAPI.searchByName(searchName.trim());
      // Attach 10-second timer to each result
      const resultsWithTimer = (res.data?.data || []).map((stock) => ({
        ...stock,
        timer: 10,
      }));
      setSearchResults(resultsWithTimer);

      // Update active symbols for highlighting
      setActiveSearchSymbols(resultsWithTimer.map((s) => s.symbol));
    } catch (err) {
      console.error("❌ Failed to search company:", err);
      alert("Failed to search company. Try again.");
    }
  };

  const confirmAddStock = async (stock) => {
    const isConfirmed = window.confirm(
      `Do you want to add ${stock.name} (${stock.symbol}) at ₹${stock.price?.toFixed(2) ?? "-"}?`
    );
    if (!isConfirmed) return;

    try {
      await WatchlistAPI.add(stock.symbol);
      fetchWatchlist(); // Refresh watchlist after adding
      // Remove the added stock from search results
      setSearchResults((prev) => prev.filter((s) => s.symbol !== stock.symbol));

      // Update active symbols
      setActiveSearchSymbols((prev) => prev.filter((s) => s !== stock.symbol));

      setSearchName("");
    } catch (err) {
      console.error("❌ Failed to add stock:", err);
      alert("Failed to add stock. Try again!");
    }
  };

  // Timer countdown effect
  useEffect(() => {
    if (searchResults.length === 0) return;

    const interval = setInterval(() => {
      setSearchResults((prev) => {
        const updated = prev
          .map((stock) => ({ ...stock, timer: stock.timer - 1 }))
          .filter((stock) => stock.timer > 0); // remove stocks when timer is 0

        // Update active symbols for highlighting
        setActiveSearchSymbols(updated.map((s) => s.symbol));

        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [searchResults, setActiveSearchSymbols]);

  return (
    <>
      <div className="p-4 border-b border-gray-200 flex gap-2">
        <input
          type="text"
          placeholder="Enter company name or symbol..."
          className="flex-1 px-4 py-2 text-sm border-b border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-0"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearchCompany()}
        />
        <button
          onClick={handleSearchCompany}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Search
        </button>
      </div>

      {searchResults.length > 0 && (
        <div className="p-4 border-b border-gray-200 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left px-2 py-2 text-gray-500 font-light">Company</th>
                <th className="text-left px-2 py-2 text-gray-500 font-light">Symbol</th>
                <th className="text-right px-2 py-2 text-gray-500 font-light">Price</th>
                <th className="text-right px-2 py-2 text-gray-500 font-light">Time Left</th>
                <th className="text-right px-2 py-2 text-gray-500 font-light">Action</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((stock, idx) => (
                <tr key={idx} className="border-b border-gray-200">
                  <td className="px-2 py-2">{stock.name}</td>
                  <td className="px-2 py-2">{stock.symbol}</td>
                  <td className="px-2 py-2 text-right">{stock.price?.toFixed(2) ?? "-"}</td>
                  <td className="px-2 py-2 text-right">{stock.timer}s</td>
                  <td className="px-2 py-2 text-right">
                    <button
                      onClick={() => confirmAddStock(stock)}
                      className="px-3 py-1 bg-green-500 text-white rounded-md"
                    >
                      Add
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default WatchlistSearch;
