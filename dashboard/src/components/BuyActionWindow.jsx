import { useState } from "react";
import { buyStock, sellStock } from "../services/api";
import { useGeneralContext } from "./GeneralContext";

const BuyActionWindow = ({ symbol, price, onClose }) => {
  const { holdings, setHoldings, wallet, setWallet, transactions, setTransactions } =
    useGeneralContext();
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleAction = async (type) => {
    setLoading(true);
    try {
      const payload = { symbol, qty, price };
      const res = type === "BUY" ? await buyStock(payload) : await sellStock(payload);

      // ✅ Update context instantly
      setHoldings(res.data.holdings);
      setWallet(res.data.wallet);
      setTransactions([res.data.transaction, ...transactions]);

      console.log(`✅ ${type} successful`, res.data);
      onClose();
    } catch (err) {
      console.error(`❌ ${type} failed:`, err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-lg font-bold mb-2">{symbol}</h2>
      <p className="mb-2">Price: ₹{price}</p>
      <input
        type="number"
        min="1"
        value={qty}
        onChange={(e) => setQty(Number(e.target.value))}
        className="border p-1 w-full mb-3"
      />
      <div className="flex gap-2">
        <button
          onClick={() => handleAction("BUY")}
          disabled={loading}
          className="px-3 py-1 bg-green-600 text-white rounded"
        >
          Buy
        </button>
        <button
          onClick={() => handleAction("SELL")}
          disabled={loading}
          className="px-3 py-1 bg-red-600 text-white rounded"
        >
          Sell
        </button>
        <button
          onClick={onClose}
          className="px-3 py-1 border rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default BuyActionWindow;
