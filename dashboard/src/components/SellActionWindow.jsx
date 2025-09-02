import { useState } from "react";
import { TradeAPI } from "../services/api";
import { useGeneralContext } from "./GeneralContext";
import { toast } from "react-toastify";

const SellActionWindow = ({ stock, onClose }) => {
  const { setHoldings, setPositions, setTransactions, transactions, setWallet } =
    useGeneralContext();

  const [quantity, setQuantity] = useState(1);
  const [investmentType, setInvestmentType] = useState("long"); // "long" or "short"
  const [loading, setLoading] = useState(false);

  if (!stock) return null;

  const availableQty =
    stock.quantity || stock.qty || stock.holdingQty || stock.available || 0;

  const handleSell = async () => {
    if (!stock?.symbol) return;

    if (!quantity || quantity < 1) {
      toast.error("⚠️ Quantity must be at least 1");
      return;
    }
    if (quantity > availableQty) {
      toast.error("⚠️ You don’t have enough shares to sell");
      return;
    }

    setLoading(true);
    const payload = {
      symbol: stock.symbol,
      quantity, // ✅ backend expects "quantity"
      price: stock.price,
      type: investmentType === "long" ? "L" : "S", // ✅ map to L/S
    };

    try {
      console.log("🟠 Selling stock:", payload);
      const res = await TradeAPI.sell(payload);

      setHoldings(res.data?.holdings || []);
      setPositions(res.data?.positions || []);
      if (res.data?.wallet) setWallet(res.data.wallet);
      if (res.data?.transaction) {
        setTransactions([res.data.transaction, ...(transactions || [])]);
      }

      toast.success(
        `✅ Sold ${quantity} × ${stock.symbol} @ ₹${stock.price} (${
          investmentType === "long" ? "Long-Term" : "Intraday"
        })`
      );
      onClose?.();
    } catch (err) {
      console.error("❌ Sell failed:", err);
      toast.error(err?.response?.data?.message || "❌ Sell order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          Sell {stock.symbol} ({stock.name})
        </h2>

        <p className="mb-2 text-sm text-gray-600">
          Current Price: <span className="font-medium">₹{stock.price}</span>
        </p>
        <p className="mb-4 text-sm text-gray-600">
          Available Quantity:{" "}
          <span className="font-medium">{availableQty}</span>
        </p>

        {/* Quantity Input */}
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full border rounded-lg p-2 mb-3"
          placeholder="Enter quantity"
          min="1"
        />

        {/* Investment Type Selector */}
        <select
          value={investmentType}
          onChange={(e) => setInvestmentType(e.target.value)}
          className="w-full border rounded-lg p-2 mb-4"
        >
          <option value="long">Long-Term</option>
          <option value="short">Intraday</option>
        </select>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSell}
            className="px-4 py-2 rounded-lg bg-red-600 text-white"
            disabled={loading}
          >
            {loading ? "Processing..." : "Sell"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;
