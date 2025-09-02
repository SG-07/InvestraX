import { useEffect } from "react";
import { useGeneralContext } from "./GeneralContext";
import { PortfolioAPI, TradeAPI } from "../services/api";

const Funds = () => {
  const { wallet, setWallet, setHoldings, setTransactions } = useGeneralContext();

  useEffect(() => {
    async function fetchWallet() {
      try {
        const res = await PortfolioAPI.summary();
        setWallet(res.data.totalValue ?? 0);
      } catch (err) {
        console.error("❌ Error fetching wallet:", err);
      }
    }
    fetchWallet();
  }, [setWallet]);

  const handleReset = async () => {
    if (!window.confirm("⚠️ Are you sure you want to reset your portfolio?")) return;
    try {
      const res = await TradeAPI.reset();
      setWallet(res.data.balance ?? 0);
      setHoldings([]);
      setTransactions([]);
      alert("✅ Portfolio reset successfully!");
    } catch (err) {
      console.error("❌ Reset failed:", err);
      alert("Something went wrong while resetting.");
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-3">💰 Funds</h2>
      <p className="text-lg mb-2">Available Balance: ₹{wallet.toLocaleString()}</p>
      <button
        onClick={handleReset}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Reset Portfolio
      </button>
    </div>
  );
};

export default Funds;
