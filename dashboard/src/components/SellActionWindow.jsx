import { useState, useMemo } from "react";
import { TradeAPI } from "../services/api";
import { useGeneralContext } from "./GeneralContext";
import { toast } from "react-toastify";

const SellActionWindow = ({ stock, onClose }) => {
  const { holdings, setHoldings, setWallet, transactions, setTransactions, setPositions } =
    useGeneralContext();
  const [quantity, setQuantity] = useState("");
  const [tradeType, setTradeType] = useState("longterm");
  const [loading, setLoading] = useState(false);

  if (!stock) return null;

  // ✅ find user’s holding for this stock
  const holdingInfo = useMemo(() => {
    return holdings.find((h) => h.symbol === stock.symbol);
  }, [holdings, stock]);

  const availableQty = holdingInfo ? holdingInfo.qty : 0;
  const hasLongterm = holdingInfo?.longtermQty > 0;
  const hasIntraday = holdingInfo?.intradayQty > 0;

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setQuantity("");
    } else {
      const num = parseInt(value, 10);
      if (!isNaN(num) && num >= 1) {
        setQuantity(num);
      }
    }
  };

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
      qty: quantity,
      price: stock.price,
      type: tradeType,
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
        `✅ Sold ${quantity} × ${stock.symbol} @ ₹${stock.price} (${tradeType})`
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
    <div className="w-[40%] h-auto bg-gray-100 fixed bottom-10 left-[30%] rounded-xl border border-gray-200 z-[100] cursor-move shadow-lg">
      {/* Header */}
      <div className="w-full bg-red-600 px-4 py-3 rounded-t-xl">
        <h3 className="text-white text-base font-medium mb-1">
          Sell {stock?.name} <span className="text-xs">(NSE:{stock?.symbol})</span>
        </h3>
        <p className="text-white text-sm font-light">
          Available: {availableQty} shares
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-gray-100 border-b border-gray-300 flex">
        <button
          disabled={!hasLongterm}
          className={`py-2 px-6 text-sm font-medium ${
            tradeType === "longterm"
              ? "text-red-600 border-b-2 border-red-600"
              : "text-gray-600"
          } disabled:opacity-50`}
          onClick={() => setTradeType("longterm")}
        >
          Longterm
        </button>
        <button
          disabled={!hasIntraday}
          className={`py-2 px-6 text-sm font-medium ${
            tradeType === "intraday"
              ? "text-red-600 border-b-2 border-red-600"
              : "text-gray-600"
          } disabled:opacity-50`}
          onClick={() => setTradeType("intraday")}
        >
          Intraday
        </button>
      </div>

      {/* Order Form */}
      <div className="bg-white p-5">
        <label className="text-sm block mb-2">Quantity</label>
        <fieldset className="border border-gray-300 max-w-[120px] px-2 py-1 mb-4 rounded">
          <legend className="text-sm text-gray-600 px-1">Qty</legend>
          <input
            type="number"
            className="w-full py-1 px-2 text-base focus:outline-none"
            min="1"
            max={availableQty}
            value={quantity}
            onChange={handleQuantityChange}
          />
        </fieldset>

        {/* Footer */}
        <div className="flex justify-between items-center pt-3">
          <span className="text-sm">
            Price: ₹{Number(stock?.price ?? 0).toLocaleString()}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 text-sm rounded hover:bg-gray-500 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleSell}
              disabled={loading}
              className="bg-red-600 text-white px-4 py-2 text-sm rounded hover:bg-red-500 disabled:opacity-50"
            >
              {loading ? "Processing..." : "Sell"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;
