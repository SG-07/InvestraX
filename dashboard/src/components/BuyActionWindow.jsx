import { useState } from "react";
import { buyStock, sellStock } from "../services/api";

const BuyActionWindow = ({ stock, onClose }) => {
  const [qty, setQty] = useState(1);
  const [action, setAction] = useState("BUY");

  const handleConfirm = async () => {
    const payload = { symbol: stock.symbol, qty };

    try {
      if (action === "BUY") {
        await buyStock(payload);
      } else {
        await sellStock(payload);
      }
      alert(`${action} successful for ${stock.symbol}`);
      onClose();
    } catch (err) {
      alert(`❌ ${action} failed: ${err.message}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-lg font-medium mb-4">
          {action} {stock.name} ({stock.symbol})
        </h3>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Quantity</label>
          <input
            type="number"
            value={qty}
            min="1"
            onChange={(e) => setQty(Number(e.target.value))}
            className="w-full border rounded-md p-2"
          />
        </div>

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setAction("BUY")}
            className={`px-4 py-2 rounded-md ${
              action === "BUY" ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
          >
            Buy
          </button>
          <button
            onClick={() => setAction("SELL")}
            className={`px-4 py-2 rounded-md ${
              action === "SELL" ? "bg-red-500 text-white" : "bg-gray-200"
            }`}
          >
            Sell
          </button>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
