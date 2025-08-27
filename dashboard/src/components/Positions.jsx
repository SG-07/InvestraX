import { useEffect, useState } from "react";
import { getPositions } from "../services/api";

const Positions = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const res = await getPositions();
        setPositions(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("❌ Failed to fetch positions:", err);
        setPositions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPositions();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading positions...</p>;
  if (positions.length === 0) return <p className="text-center mt-10 text-gray-500">No positions found</p>;

  return (
    <>
      <h3 className="text-[1.3rem] font-light text-gray-700 mb-2">
        Positions ({positions.length})
      </h3>

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
            {positions.map((stock, index) => {
              const curValue = (stock.price ?? 0) * (stock.qty ?? 0);
              const isProfit = curValue - (stock.avg ?? 0) * (stock.qty ?? 0) >= 0.0;
              const profClass = isProfit ? "text-green-600" : "text-red-400";
              const dayClass = stock.isLoss ? "text-red-400" : "text-green-600";

              return (
                <tr
                  key={index}
                  className="border-t border-b border-gray-200 text-sm text-right text-gray-700"
                >
                  <td className="text-left px-2">{stock.product}</td>
                  <td className="text-left px-2">{stock.name}</td>
                  <td className="px-2">{stock.qty ?? 0}</td>
                  <td className="px-2">{(stock.avg ?? 0).toFixed(2)}</td>
                  <td className="px-2">{(stock.price ?? 0).toFixed(2)}</td>
                  <td className={`px-2 ${profClass}`}>
                    {(curValue - (stock.avg ?? 0) * (stock.qty ?? 0)).toFixed(2)}
                  </td>
                  <td className={`px-2 ${dayClass}`}>{(stock.day ?? 0).toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;
