import { useState, useEffect } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";
import { holdings } from "../data/data";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3002/allHoldings").then((res) => {
      setAllHoldings(res.data);
    });
  }, []);

  const labels = allHoldings.map((subArray) => subArray["name"]);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };


  return (
    <>
      <h3 className="text-xl font-light text-gray-700 mb-2">
        Holdings ({allHoldings.length})
      </h3>

      <div className="w-full overflow-x-auto border border-gray-300 px-10 py-5">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-y border-gray-200">
              <th className="text-right px-2 py-3 text-gray-500 font-light">Instrument</th>
              <th className="text-right px-2 py-3 text-gray-500 font-light">Qty.</th>
              <th className="text-right px-2 py-3 text-gray-500 font-light">Avg. cost</th>
              <th className="text-right px-2 py-3 text-gray-500 font-light">LTP</th>
              <th className="text-right px-2 py-3 text-gray-500 font-light">Cur. val</th>
              <th className="text-right px-2 py-3 text-gray-500 font-light">P&L</th>
              <th className="text-right px-2 py-3 text-gray-500 font-light">Net chg.</th>
              <th className="text-right px-2 py-3 text-gray-500 font-light">Day chg.</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const isProfit = curValue - stock.avg * stock.qty >= 0.0;
              const profClass = isProfit ? "text-green-500" : "text-orange-400";
              const dayClass = stock.isLoss ? "text-orange-400" : "text-green-500";

              return (
                <tr key={index} className="border-y border-gray-200">
                  <td className="text-left px-2 py-2">{stock.name}</td>
                  <td className="text-right px-2 py-2">{stock.qty}</td>
                  <td className="text-right px-2 py-2">{stock.avg.toFixed(2)}</td>
                  <td className="text-right px-2 py-2">{stock.price.toFixed(2)}</td>
                  <td className="text-right px-2 py-2">{curValue.toFixed(2)}</td>
                  <td className={`text-right px-2 py-2 ${profClass}`}>
                    {(curValue - stock.avg * stock.qty).toFixed(2)}
                  </td>
                  <td className={`text-right px-2 py-2 ${profClass}`}>{stock.net}</td>
                  <td className={`text-right px-2 py-2 ${dayClass}`}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6">
        <div className="basis-1/3">
          <h5 className="text-2xl font-light text-gray-700">
            29,875.<span className="text-base font-light">55</span>
          </h5>
          <p className="text-sm text-gray-400 font-light mt-1">Total investment</p>
        </div>
        <div className="basis-1/3">
          <h5 className="text-2xl font-light text-gray-700">
            31,428.<span className="text-base font-light">95</span>
          </h5>
          <p className="text-sm text-gray-400 font-light mt-1">Current value</p>
        </div>
        <div className="basis-1/3">
          <h5 className="text-2xl font-light text-green-500">1,553.40 (+5.20%)</h5>
          <p className="text-sm text-gray-400 font-light mt-1">P&L</p>
        </div>
      </div>

      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;