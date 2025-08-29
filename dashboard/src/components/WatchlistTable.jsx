import WatchlistAPI from "../api/watchlist"; 

const WatchlistTable = ({ watchlist, setWatchlist, openBuyWindow }) => {
  const handleRemove = async (symbol) => {
    try {
      await WatchlistAPI.remove(symbol);
      setWatchlist((prev) => prev.filter((s) => s.symbol !== symbol));
    } catch (err) {
      alert("❌ Failed to remove from watchlist");
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 border-b border-gray-200">
      {watchlist.length === 0 ? (
        <p className="text-center text-gray-400 mt-10">No stocks in watchlist</p>
      ) : (
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left px-2 py-2 text-gray-500 font-light">Symbol</th>
              <th className="text-right px-2 py-2 text-gray-500 font-light">Price</th>
              <th className="text-right px-2 py-2 text-gray-500 font-light">Change</th>
              <th className="text-right px-2 py-2 text-gray-500 font-light">% Change</th>
              <th className="text-right px-2 py-2 text-gray-500 font-light">Actions</th>
            </tr>
          </thead>
          <tbody>
            {watchlist.map((stock, idx) => {
              const isDown = stock.change < 0;
              const color = isDown ? "text-red-600" : "text-green-600";
              const arrow = isDown ? "↓" : "↑";

              return (
                <tr key={idx} className="border-b border-gray-200">
                  <td className="px-2 py-2">{stock.symbol}</td>
                  <td className="px-2 py-2 text-right">{(stock.price ?? 0).toFixed(2)}</td>
                  <td className={`px-2 py-2 text-right font-semibold flex items-center justify-end gap-1 ${color}`}>
                    {arrow} {(stock.change ?? 0).toFixed(2)}
                  </td>
                  <td className={`px-2 py-2 text-right font-semibold flex items-center justify-end gap-1 ${color}`}>
                    {arrow} {(stock.changepct ?? 0).toFixed(2)}%
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
                      className="px-3 py-1 bg-gray-300 rounded-md"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default WatchlistTable;
