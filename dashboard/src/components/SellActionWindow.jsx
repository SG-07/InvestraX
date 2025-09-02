import { useState, useEffect } from "react";
import { useGeneralContext } from "./GeneralContext";
import { TradeAPI, PortfolioAPI } from "../services/api";
import { toast } from "react-toastify";

export default function SellActionWindow({ stock, onClose }) {
  const {
    setHoldings,
    setPositions,
    setTransactions,
    transactions,
    setWallet,
  } = useGeneralContext();

  const [quantity, setQuantity] = useState(1);
  const [investmentType, setInvestmentType] = useState(null); // "long" | "short"
  const [sellInfo, setSellInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [infoLoading, setInfoLoading] = useState(false);

  if (!stock) return null;

  const availableQty = sellInfo?.qty || 0;

  useEffect(() => {
    const fetchSellInfo = async () => {
      if (!investmentType || !stock?.symbol) return;
      setInfoLoading(true);
      try {
        const backendType = investmentType === "long" ? "holding" : "position";
        const res = await PortfolioAPI.getSellInfo(stock.symbol, backendType);
        setSellInfo(res.data);
        setQuantity(1);
      } catch (err) {
        console.error("❌ Failed to fetch sell info:", err);
        toast.error("❌ Could not fetch stock sell details");
      } finally {
        setInfoLoading(false);
      }
    };

    fetchSellInfo();
  }, [investmentType, stock]);

  const handleSell = async () => {
    if (!stock?.symbol || !investmentType) return;

    if (quantity <= 0) {
      toast.error("⚠️ Quantity must be at least 1");
      return;
    }
    if (quantity > availableQty) {
      toast.error("⚠️ You don’t have enough shares to sell");
      return;
    }

    const payload = {
      symbol: stock.symbol,
      quantity,
      type: investmentType === "long" ? "L" : "S",
    };

    try {
      setLoading(true);
      const res = await TradeAPI.sell(payload);

      setHoldings(res.data?.holdings || []);
      setPositions(res.data?.positions || []);
      if (res.data?.wallet) setWallet(res.data.wallet);
      if (res.data?.transaction) {
        setTransactions([res.data.transaction, ...(transactions || [])]);
      }

      toast.success(
        `✅ Sold ${quantity} of ${stock.symbol} (${investmentType === "long" ? "Holding" : "Position"})`
      );
      onClose?.();
    } catch (err) {
      console.error("❌ Sell failed:", err.response?.data || err.message);
      toast.error(err?.response?.data?.message || "❌ Sell order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="absolute bottom-0 left-[35%] w-[40%] h-[70%] bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b bg-gradient-to-r from-red-500 to-red-700 rounded-t-2xl text-white">
          <h2 className="text-xl font-semibold">
            Sell {stock.name} ({stock.symbol})
          </h2>
        </div>

        {/* Step 1: Choose Investment Type */}
        {!investmentType && (
          <div className="flex-1 flex flex-col justify-center items-center gap-6 p-6">
            <h3 className="text-lg font-medium text-gray-700">
              What do you want to sell?
            </h3>
            <div className="flex gap-6">
              <button
                onClick={() => setInvestmentType("short")}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
              >
                Intraday Position
              </button>
              <button
                onClick={() => setInvestmentType("long")}
                className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
              >
                Long-Term Holding
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Fetching info */}
        {investmentType && infoLoading && (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500">Fetching stock details...</p>
          </div>
        )}

        {/* Step 3: No stock available */}
        {investmentType && !infoLoading && sellInfo && availableQty === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6">
            <p className="text-lg text-red-600 font-medium">
              ⚠️ No available quantity to sell for this {investmentType === "long" ? "holding" : "position"}.
            </p>
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-400 hover:text-white"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Step 4: Show sell form */}
        {investmentType && !infoLoading && sellInfo && availableQty > 0 && (
          <>
            <div className="p-6 space-y-6 flex-1 overflow-y-auto">
              <div className="bg-gray-100 p-4 rounded-lg">
                <p><span className="font-semibold">Available Qty:</span> {sellInfo.qty}</p>
                <p><span className="font-semibold">Avg Buy Price:</span> ₹{sellInfo.avgBuyPrice}</p>
                <p><span className="font-semibold">Current Price:</span> ₹{sellInfo.currentPrice}</p>
                <p><span className="font-semibold">P/L:</span> ₹{sellInfo.profitLoss} ({sellInfo.profitLossPct}%)</p>
              </div>

              <div className="flex justify-between gap-4">
                <fieldset className="border border-gray-300 flex-1 rounded-lg">
                  <legend className="ml-2 text-sm px-1 text-gray-600">Quantity</legend>
                  <input
                    type="number"
                    min="1"
                    max={availableQty}
                    className="w-full px-3 py-2 text-lg outline-none rounded-lg"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                  />
                </fieldset>
              </div>
            </div>

            <div className="flex justify-between items-center px-6 py-4 border-t">
              <span className="text-sm text-gray-600">
                Expected Credit ₹{(quantity * (sellInfo?.currentPrice || 0)).toFixed(2)}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={handleSell}
                  disabled={loading}
                  className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-500 shadow-md disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Sell"}
                </button>
                <button
                  onClick={onClose}
                  className="bg-gray-300 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-400 hover:text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
