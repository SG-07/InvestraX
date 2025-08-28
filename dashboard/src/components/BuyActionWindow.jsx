import { useState } from "react";
import { TradeAPI } from "../services/api";
import { useGeneralContext } from "./GeneralContext";

const BuyActionWindow = ({ symbol, price, onClose }) => {
  const { setHoldings, setWallet, transactions, setTransactions } = useGeneralContext();
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleAction = async (type) => {
    setLoading(true);
    try {
      const payload = { symbol, qty, price };
      const res = type === "BUY"
        ? await TradeAPI.buy(payload)
        : await TradeAPI.sell(payload);

      setHoldings(res.data?.holdings || []);
      if (res.data?.wallet) setWallet(res.data.wallet.balance ?? res.data.wallet);
      if (res.data?.transaction) setTransactions([res.data.transaction, ...(transactions || [])]);

      console.log(`✅ ${type} successful`, res.data);
      onClose?.();
    } catch (err) {
      console.error(`❌ ${type} failed:`, err);
      alert(err?.response?.data?.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  if (!symbol) return null;

  return (
    <div className="fixed bottom-5 right-5 w-80 p-4 bg-white rounded shadow-lg border">
      <h2 className="text-lg font-semibold mb-2">{symbol}</h2>
      <p className="mb-3">Price: ₹{Number(price ?? 0).toLocaleString()}</p>

      <label className="block text-sm mb-1">Quantity</label>
      <input
        type="number"
        min="1"
        value={qty}
        onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
        className="border p-2 w-full mb-4 rounded"
      />

      <div className="flex gap-2 justify-end">
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
        <button onClick={onClose} className="px-3 py-1 border rounded">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default BuyActionWindow;

