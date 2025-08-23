import { useEffect, useState } from "react";
import { getWatchlist, removeFromWatchlist } from "../services/api";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    getWatchlist().then((res) => {
      setWatchlist(res.data?.data || []);
    });
  }, []);

  const handleRemove = async (symbol) => {
    await removeFromWatchlist(symbol);
    setWatchlist((prev) => prev.filter((item) => item.symbol !== symbol));
  };

  return (
    <div>
      <h3 className="text-xl font-light text-gray-700 mb-2">
        Watchlist ({watchlist.length})
      </h3>

      <div className="w-full overflow-x-auto border border-gray-300 px-10 py-5">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-y border-gray-200">
              <th className="text-left px-2 py-3 text-gray-500 font-light">
                Stock
              </th>
              <th className="text-right px-2 py-3 text-gray-500 font-light">
                Price
              </th>
              <th className="text-right px-2 py-3 text-gray-500 font-light">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {watchlist.map((stock, index) => (
              <tr key={index} className="border-y border-gray-200">
                <td className="px-2 py-2">{stock.name}</td>
                <td className="text-right px-2 py-2">
                  {stock.price?.toFixed(2)}
                </td>
                <td className="text-right px-2 py-2">
                  <button
                    onClick={() => handleRemove(stock.symbol)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md text-xs"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Watchlist;
