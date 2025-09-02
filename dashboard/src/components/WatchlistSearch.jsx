import { useState } from "react";
import { StocksAPI } from "../services/api";

export default function WatchlistSearch({ onAddStock, existingSymbols }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await StocksAPI.getOne(query.trim());
      setResults(res.data || []);
    } catch (err) {
      console.error("❌ Stock search failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = (stock) => {
    // 🚫 Prevent duplicates
    if (existingSymbols.includes(stock.symbol)) {
      alert(`${stock.name} is already in your watchlist!`);
      return;
    }
    onAddStock(stock); // ✅ just call the parent handler
  };

  return (
    <div className="p-2">
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          placeholder="Search stocks..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border rounded p-1 flex-1"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {results.length > 0 && (
        <ul className="border rounded divide-y max-h-48 overflow-y-auto">
          {results.map((stock) => (
            <li
              key={stock.symbol}
              className="flex justify-between items-center p-2 hover:bg-gray-50"
            >
              <span>
                {stock.name} ({stock.symbol})
              </span>
              <button
                onClick={() => handleAdd(stock)}
                className="text-green-600 hover:underline"
              >
                + Add
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

