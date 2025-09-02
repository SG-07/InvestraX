import { useEffect, useState } from "react";
import { PortfolioAPI } from "../services/api";
import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";

const Holdings = () => {
  const [holdingsArray, setHoldingsArray] = useState([]);
  const [selectedBuy, setSelectedBuy] = useState(null);
  const [selectedSell, setSelectedSell] = useState(null);

  // Function to fetch holdings
  const refreshHoldings = async () => {
    try {
      const res = await PortfolioAPI.holdings();
      setHoldingsArray(res?.data?.data || []);
    } catch (error) {
      console.error("Error fetching holdings:", error);
    }
  };

  // Fetch holdings on mount
  useEffect(() => {
    refreshHoldings();
  }, []);

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-lg font-semibold mb-4">Holdings</h2>
      <table className="min-w-full border-collapse border border-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr className="text-gray-600 text-center">
            <th className="p-2 text-left">Company</th>
            <th className="p-2">Qty</th>
            <th className="p-2">Avg</th>
            <th className="p-2">Price</th>
            <th className="p-2">Invested</th>
            <th className="p-2">Current</th>
            <th className="p-2">Net</th>
            <th className="p-2">Day</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {holdingsArray.map((h, idx) => {
            const qty = Number(h.stocksQuantity) || 0;
            const avg = Number(h.avg) || 0;
            const price = Number(h.price) || 0;

            const invested = h.investedValue ?? avg * qty;
            const current = h.currentValue ?? price * qty;
            const netPL = h.net ?? current - invested;
            const isProfit = netPL >= 0;

            return (
              <tr
                key={idx}
                className="border-t border-b border-gray-200 text-sm text-right text-gray-700"
              >
                <td className="text-left px-2">{h.company || h.symbol}</td>
                <td className="px-2">{qty}</td>
                <td className="px-2">{avg.toFixed(2)}</td>
                <td className="px-2">{price.toFixed(2)}</td>
                <td className="px-2">₹{invested.toFixed(2)}</td>
                <td className="px-2">₹{current.toFixed(2)}</td>
                <td
                  className={`px-2 ${isProfit ? "text-green-600" : "text-red-500"}`}
                >
                  {netPL.toFixed(2)}
                </td>
                <td
                  className={`px-2 ${
                    (Number(h.dayPct) || 0) >= 0 ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {(Number(h.dayPct) || 0).toFixed(2)}%
                </td>
                <td className="px-2 space-x-2">
                  <button
                    onClick={() => setSelectedBuy(h)}
                    className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Buy
                  </button>
                  <button
                    onClick={() => setSelectedSell(h)}
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

      {/* Buy Window */}
      {selectedBuy && (
        <BuyActionWindow
          stock={selectedBuy}
          onClose={() => setSelectedBuy(null)}
          onSuccess={refreshHoldings} // Refresh after buy
        />
      )}

      {/* Sell Window */}
      {selectedSell && (
        <SellActionWindow
          stock={selectedSell}
          onClose={() => setSelectedSell(null)}
          onSuccess={refreshHoldings} // Refresh after sell
        />
      )}
    </div>
  );
};

export default Holdings;
