import { useGeneralContext } from "./GeneralContext";

const Summary = () => {
  const { portfolio } = useGeneralContext();
  const investedValue = portfolio?.investedValue ?? 0;
  const totalValue = portfolio?.totalValue ?? 0;
  const todayPL = portfolio?.todayPL ?? 0;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">📈 Portfolio Summary</h2>
      <p>Invested Value: ₹{investedValue.toLocaleString()}</p>
      <p>Total Value: ₹{totalValue.toLocaleString()}</p>
      <p>Today’s P&L: ₹{todayPL.toLocaleString()}</p>
    </div>
  );
};

export default Summary;
