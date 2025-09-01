import { useState, useEffect } from "react";
import { StocksAPI } from "../services/api";

const WatchlistSearch = ({ onAdd, setActiveSearchSymbols }) => {
  const [searchName, setSearchName] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // 🔍 Search as user types
  useEffect(() => {
    if (!searchName.trim()) {
      setSearchResults([]);
      return; // ❌ don't touch setActiveSearchSymbols here
    }

    const delayDebounce = setTimeout(async () => {
      try {
        const res = await StocksAPI.list({ query: searchName.trim() });

        const resultsWithTimer = (res.data?.data || []).map((stock) => ({
          ...stock,
          timer: 10,
        }));

        setSearchResults(resultsWithTimer);
      } catch (err) {
        console.error("❌ Failed to search company:", err);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchName]);

  // ✅ Keep active symbols synced after searchResults update
  useEffect(() => {
    setActiveSearchSymbols(searchResults.map((s) => s.symbol));
  }, [searchResults, setActiveSearchSymbols]);

  const handleAdd = (stock) => {
    onAdd(stock);
    setSearchName(""); // clear input after adding
    setSearchResults([]);
  };

  return (
    <div className="p-4">
      <input
        type="text"
        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
        placeholder="Search company..."
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />

      {searchResults.length > 0 && (
        <ul className="mt-3 border border-gray-200 rounded-lg bg-white shadow-md">
          {searchResults.map((stock) => (
            <li
              key={stock.symbol}
              className="flex justify-between items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleAdd(stock)}
            >
              <span className="font-medium">{stock.name}</span>
              <span className="text-sm text-gray-500">{stock.symbol}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WatchlistSearch;
