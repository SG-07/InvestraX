import { useEffect, useState } from "react";
import { PortfolioAPI } from "../services/api";
import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";

const Positions = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBuy, setSelectedBuy] = useState(null);
  const [selectedSell, setSelectedSell] = useState(null);

  // Function to fetch positions
  const refreshPositions = async () => {
    console.log("🔄 refreshPositions called");
    setLoading(true);
    try {
      const res = await PortfolioAPI.positions();
      console.log("✅ API Response:", res);

      // Adjusted here
      const data = res.data?.data ?? res.data ?? [];
      console.log("📊 Positions data:", data);

      setPositions(data);
    } catch (err) {
      console.error("❌ Failed to fetch positions:", err);
      setPositions([]);
    } finally {
      setLoading(false);
      console.log("⏹️ Finished refreshing positions");
    }
  };

  // Fetch positions on mount
  useEffect(() => {
    console.log("🚀 useEffect: fetching positions on mount");
    refreshPositions();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading positions...</p>;
  if (!positions.length)
    return (
      <p className="text-center mt-10 text-gray-500">No positions found</p>
    );

  return (
    <>
      <h3 className="text-[1.3rem] font-light text-gray-700 mb-2">
        Positions ({positions.length})
      </h3>

      <div className="w-full border border-gray-300 px-4 py-5 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-t border-b border-gray-200 text-sm text-right text-gray-500 font-light">
              <th className="text-left px-2">Product</th>
              <th className="text-left px-2">Instrument</th>
              <th className="px-2">Qty.</th>
              <th className="px-2">Avg.</th>
              <th className="px-2">LTP</th>
              <th className="px-2">P&amp;L</th>
              <th className="px-2">Chg.</th>
              <th className="px-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((stock, index) => {
              const qty = Number(stock.stocksQuantity ?? stock.qty ?? 0);
              const avg = Number(stock.avg ?? 0);
              const ltp = Number(stock.price ?? 0);
              const curValue = ltp * qty;
              const invValue = avg * qty;

              const isProfit = curValue - invValue >= 0;
              const profClass = isProfit ? "text-green-600" : "text-red-400";
              const dayClass =
                (stock.day ?? 0) >= 0 ? "text-green-600" : "text-red-400";

              return (
                <tr
                  key={index}
                  className="border-t border-b border-gray-200 text-sm text-right text-gray-700"
                >
                  <td className="text-left px-2">{stock.product || "-"}</td>
                  <td className="text-left px-2">
                    {stock.company || stock.name || stock.symbol}
                  </td>
                  <td className="px-2">{qty}</td>
                  <td className="px-2">{avg.toFixed(2)}</td>
                  <td className="px-2">{ltp.toFixed(2)}</td>
                  <td className={`px-2 ${profClass}`}>
                    {(curValue - invValue).toFixed(2)}
                  </td>
                  <td className={`px-2 ${dayClass}`}>
                    {(stock.day ?? 0).toFixed(2)}
                  </td>
                  <td className="px-2 space-x-2">
                    <button
                      onClick={() => {
                        console.log("🟢 Buy clicked for", stock);
                        setSelectedBuy(stock);
                      }}
                      className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Buy
                    </button>
                    <button
                      onClick={() => {
                        console.log("🔴 Sell clicked for", stock);
                        setSelectedSell(stock);
                      }}
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Sell
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Buy Window */}
      {selectedBuy && (
        <BuyActionWindow
          stock={selectedBuy}
          onClose={() => setSelectedBuy(null)}
          onSuccess={() => {
            console.log("✅ BuyActionWindow success callback called");
            refreshPositions();
          }}
        />
      )}

      {/* Sell Window */}
      {selectedSell && (
        <SellActionWindow
          stock={selectedSell}
          onClose={() => setSelectedSell(null)}
          onSuccess={() => {
            console.log("✅ SellActionWindow success callback called");
            refreshPositions();
          }}
        />
      )}
    </>
  );
};

export default Positions;
