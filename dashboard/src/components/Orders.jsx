import { useGeneralContext } from "./GeneralContext";

const Orders = () => {
  const { transactions } = useGeneralContext();
  const txns = Array.isArray(transactions) ? transactions : [];

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-3">Transaction History</h2>
      {txns.length === 0 ? (
        <p>No transactions yet</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Date</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Symbol</th>
              <th className="border p-2">Qty</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {txns.map((txn, i) => (
              <tr key={i}>
                <td className="border p-2">
                  {txn.date ? new Date(txn.date).toLocaleString() : "-"}
                </td>
                <td className="border p-2">{txn.type}</td>
                <td className="border p-2">{txn.symbol || "-"}</td>
                <td className="border p-2">{txn.qty || 0}</td>
                <td className="border p-2">₹{txn.price || 0}</td>
                <td className="border p-2">₹{txn.amount || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;
