import { positions } from "../data/data";

const Positions = () => {
  return (
    <>
      <h3 className="text-[1.3rem] font-light text-gray-700 mb-2">
        Positions ({positions.length})
      </h3>

      <div className="w-full border border-gray-300 px-[8%] py-[5%]">
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
              const curValue = stock.price * stock.qty;
              const isProfit = curValue - stock.avg * stock.qty >= 0.0;
              const profClass = isProfit ? "text-green-600" : "text-red-400";
              const dayClass = stock.isLoss ? "text-red-400" : "text-green-600";

              return (
                <tr
                  key={index}
                  className="border-t border-b border-gray-200 text-sm text-right text-gray-700"
                >
                  <td className="text-left px-2">{stock.product}</td>
                  <td className="text-left px-2">{stock.name}</td>
                  <td className="px-2">{stock.qty}</td>
                  <td className="px-2">{stock.avg.toFixed(2)}</td>
                  <td className="px-2">{stock.price.toFixed(2)}</td>
                  <td className={`px-2 ${profClass}`}>
                    {(curValue - stock.avg * stock.qty).toFixed(2)}
                  </td>
                  <td className={`px-2 ${dayClass}`}>{stock.day}</td>
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
