import { useGeneralContext } from "./GeneralContext";

const Summary = () => {
  const { portfolio } = useGeneralContext();

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">📈 Portfolio Summary</h2>
      <p>Invested Value: ₹{portfolio?.investedValue?.toLocaleString() || 0}</p>
      <p>Total Value: ₹{portfolio?.totalValue?.toLocaleString() || 0}</p>
      <p>Today’s P&L: ₹{portfolio?.todayPL?.toLocaleString() || 0}</p>
    </div>
  );
};

export default Summary;
