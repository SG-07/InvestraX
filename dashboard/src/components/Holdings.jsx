import { useGeneralContext } from "./GeneralContext";

const Holdings = () => {
  const { holdings } = useGeneralContext();
  const holdingsArray = Array.isArray(holdings) ? holdings : [];

  if (!holdingsArray.length)
    return <p className="text-center mt-10 text-gray-500">No holdings yet</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">📊 Your Holdings</h2>
      <div className="w-full border border-gray-300 px-4 py-5">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-t border-b border-gray-200 text-sm text-right text-gray-500 font-light">
              <th className="text-left px-2">Product</th>
              <th className="text-left px-2">Instrument</th>
              <th className="px-2">Qty.</th>
              <th className="px-2">Avg.</th>
              <th className="px-2">LTP</th>
              <th className="px-2">P&amp;L</th>
              <th className="px-2">Chg.</th>
            </tr>
          </thead>
          <tbody>
            {holdingsArray.map((h, idx) => {
              const qty = h.qty ?? 0;
              const avg = h.avg ?? 0;
              const ltp = h.price ?? 0;
              const curValue = ltp * qty;
              const invValue = avg * qty;

              const isProfit = curValue - invValue >= 0;
              const profClass = isProfit ? "text-green-600" : "text-red-400";
              const dayClass = h.isLoss ? "text-red-400" : "text-green-600";

              return (
                <tr
                  key={idx}
                  className="border-t border-b border-gray-200 text-sm text-right text-gray-700"
                >
                  <td className="text-left px-2">CNC</td>
                  <td className="text-left px-2">{h.name || h.symbol}</td>
                  <td className="px-2">{qty}</td>
                  <td className="px-2">{avg.toFixed(2)}</td>
                  <td className="px-2">{ltp.toFixed(2)}</td>
                  <td className={`px-2 ${profClass}`}>
                    {(curValue - invValue).toFixed(2)}
                  </td>
                  <td className={`px-2 ${dayClass}`}>
                    {(h.day ?? 0).toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Holdings;
