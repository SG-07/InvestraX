import { useState } from "react";
import { useGeneralContext } from "./GeneralContext";
import { TradeAPI } from "../services/api";
import { toast } from "react-toastify";

export default function BuyActionWindow({ stock, onClose }) {
  const { refreshPortfolio } = useGeneralContext();
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(stock?.price || 0);
  const [investmentType, setInvestmentType] = useState("short"); // short | long
  const [loading, setLoading] = useState(false);

  if (!stock) return null;

  const handleBuy = async () => {
    if (quantity <= 0) {
      toast.error("⚠️ Quantity must be greater than 0");
      return;
    }

    try {
      setLoading(true);
      await TradeAPI.buy({
        symbol: stock.symbol,
        quantity,
        price,
        type: investmentType === "long" ? "L" : "S", // ✅ matches backend
      });

      toast.success(
        `✅ Bought ${quantity} of ${stock.symbol} (${
          investmentType === "long" ? "Long-Term" : "Intraday"
        })`
      );
      refreshPortfolio();
      onClose?.();
    } catch (err) {
      console.error("❌ Buy failed:", err.response?.data || err.message);
      toast.error(
        err?.response?.data?.message || "Failed to complete purchase"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="absolute bottom-0 left-[35%] w-[40%] h-[65%] bg-white border border-gray-200 rounded-2xl shadow-2xl z-50">
        {/* Header */}
        <div className="p-4 border-b bg-gradient-to-r from-blue-500 to-indigo-600 rounded-t-2xl text-white">
          <h2 className="text-xl font-semibold">
            Buy {stock.name} ({stock.symbol})
          </h2>
          <p className="text-sm opacity-90">
            Current Price: ₹{Number(stock.price ?? 0).toLocaleString()}
          </p>
        </div>

        {/* Inputs Section */}
        <div className="p-6 space-y-6">
          {/* Quantity & Price */}
          <div className="flex justify-between gap-4">
            {/* Quantity */}
            <fieldset className="border border-gray-300 flex-1 rounded-lg">
              <legend className="ml-2 text-sm px-1 text-gray-600">
                Quantity
              </legend>
              <input
                type="number"
                min="1"
                className="w-full px-3 py-2 text-lg outline-none rounded-lg"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, Number(e.target.value)))
                }
              />
            </fieldset>

            {/* Price */}
            <fieldset className="border border-gray-300 flex-1 rounded-lg">
              <legend className="ml-2 text-sm px-1 text-gray-600">Price</legend>
              <input
                type="number"
                step="0.05"
                className="w-full px-3 py-2 text-lg outline-none rounded-lg"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </fieldset>
          </div>

          {/* Investment Type */}
          <div>
            <h3 className="text-sm text-gray-600 mb-2">Investment Type</h3>
            <div className="flex gap-4">
              <label
                className={`flex-1 cursor-pointer px-4 py-3 rounded-lg border text-center transition ${
                  investmentType === "short"
                    ? "bg-blue-500 text-white border-blue-600 shadow-md"
                    : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="investmentType"
                  value="short"
                  checked={investmentType === "short"}
                  onChange={() => setInvestmentType("short")}
                  className="hidden"
                />
                Short-Term
              </label>

              <label
                className={`flex-1 cursor-pointer px-4 py-3 rounded-lg border text-center transition ${
                  investmentType === "long"
                    ? "bg-green-500 text-white border-green-600 shadow-md"
                    : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="investmentType"
                  value="long"
                  checked={investmentType === "long"}
                  onChange={() => setInvestmentType("long")}
                  className="hidden"
                />
                Long-Term
              </label>
            </div>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex justify-between items-center px-6 py-4 border-t">
          <span className="text-sm text-gray-600">
            Margin required ₹{(quantity * price).toFixed(2)}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={handleBuy}
              disabled={loading}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-500 shadow-md disabled:opacity-50"
            >
              {loading ? "Processing..." : "Buy"}
            </button>
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-400 hover:text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
