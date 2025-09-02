import { useEffect, useState } from "react";
import { PortfolioAPI } from "../services/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await PortfolioAPI.transactions();

        // assuming backend returns { orders: [...] } or just an array
        const data = res.data?.orders || res.data || [];

        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("❌ Failed to fetch orders:", err);
        setOrders([]);
      }
    };

    fetchOrders();
  }, []);

  // --- helpers ---

  const parseDate = (val) => {
    if (val === null || val === undefined) return null;

    if (typeof val === "object") {
      if (val.$date) return parseDate(val.$date);
      if (val.date) return parseDate(val.date);
      console.warn("⚠️ Unknown date object format:", val);
      return null;
    }

    const str = String(val).trim();

    if (/^[0-9]+$/.test(str)) {
      if (str.length === 10) return new Date(Number(str) * 1000);
      return new Date(Number(str));
    }

    const d = new Date(str);
    if (!isNaN(d.getTime())) return d;

    const parsed = Date.parse(str);
    if (!isNaN(parsed)) return new Date(parsed);

    console.warn("⚠️ Could not parse date:", val);
    return null;
  };

  const formatDateToIST = (rawDate) => {
    const d = parseDate(rawDate);
    if (!d) return "-";
    return d.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatCategory = (txn) => {
    const raw =
      txn?.category ||
      txn?.cat ||
      txn?.categoryCode ||
      txn?.typeCategory ||
      txn?.mode ||
      txn?.type ||
      "";
    const s = String(raw).trim();

    if (!s) {
      console.warn("⚠️ No category found in txn:", txn);
      return "-";
    }

    const up = s.toUpperCase();
    if (up === "L") return "Long-Term (L)";
    if (up === "S") return "Intraday (S)";
    if (up === "LONG" || up === "LONGTERM" || up === "LONG-TERM")
      return "Long-Term";
    if (up === "SHORT" || up === "INTRADAY") return "Intraday";

    return s;
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-3">Transaction History</h2>

      {orders.length === 0 ? (
        <p>No transactions yet</p>
      ) : (
        <div className="overflow-auto">
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Date (IST)</th>
                <th className="border p-2 text-left">Type</th>
                <th className="border p-2 text-left">Symbol</th>
                <th className="border p-2 text-right">Qty</th>
                <th className="border p-2 text-right">Price</th>
                <th className="border p-2 text-right">Amount</th>
                <th className="border p-2 text-left">Category</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((txn, i) => {
                console.log(`🔎 Transaction [${i}]`, txn);
                return (
                  <tr key={i} className="odd:bg-white even:bg-gray-50">
                    <td className="border p-2">
                      {txn?.date
                        ? formatDateToIST(txn.date)
                        : formatDateToIST(txn.createdAt) || "-"}
                    </td>
                    <td className="border p-2">{txn.type || "-"}</td>
                    <td className="border p-2">{txn.symbol || "-"}</td>
                    <td className="border p-2 text-right">
                      {txn.qty ?? txn.quantity ?? 0}
                    </td>
                    <td className="border p-2 text-right">₹{txn.price ?? 0}</td>
                    <td className="border p-2 text-right">₹{txn.amount ?? 0}</td>
                    <td className="border p-2">{formatCategory(txn)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
