import { useGeneralContext } from "./GeneralContext";

const Holdings = () => {
  const { holdings } = useGeneralContext();

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">📊 Your Holdings</h2>
      {(!holdings || holdings.length === 0) ? (
        <p>No holdings yet</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Symbol</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Avg. Price</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((h, idx) => (
              <tr key={idx}>
                <td className="border p-2">{h.symbol}</td>
                <td className="border p-2">{h.qty}</td>
                <td className="border p-2">₹{h.avg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Holdings;
