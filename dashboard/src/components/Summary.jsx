import { useEffect, useState } from "react";
import { useGeneralContext } from "./GeneralContext";
import { PortfolioAPI } from "../services/api";

const Summary = () => {
  const { portfolio, setPortfolio } = useGeneralContext();
  const [loading, setLoading] = useState(true);

  // Pagination
  const [holdingsPage, setHoldingsPage] = useState(0);
  const [positionsPage, setPositionsPage] = useState(0);
  const [transactionsPage, setTransactionsPage] = useState(0);
  const rowsPerPage = 10;

  // Table filter state
  const [filter, setFilter] = useState("all"); // "all", "holdings", "positions"

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const { data } = await PortfolioAPI.summary();
        console.log("📥 Portfolio data received:", data);
        setPortfolio(data); // update context with backend data
      } catch (err) {
        console.error("❌ Error fetching portfolio summary:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [setPortfolio]);

  if (loading) return <p className="text-center mt-20 text-gray-500">Loading portfolio...</p>;
  if (!portfolio) return <p className="text-center mt-20 text-red-500">Failed to load portfolio</p>;

  const paginate = (data, page) => {
    const start = page * rowsPerPage;
    return data?.slice(start, start + rowsPerPage) || [];
  };

  const Table = ({ title, columns, data, page, setPage, isActive }) => (
    <div
      className={`rounded-lg p-4 overflow-hidden transition-shadow ${
        isActive ? "bg-white shadow-lg border-2 border-blue-400" : "bg-white shadow"
      }`}
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="overflow-x-auto">
        <div className="max-h-[300px] overflow-y-auto">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                {columns.map((col, idx) => (
                  <th key={idx} className="px-2 py-1 text-left text-gray-600 border-b">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="text-center py-4 text-gray-500">
                    No data
                  </td>
                </tr>
              ) : (
                data.map((row, idx) => (
                  <tr key={idx} className="border-b text-gray-700">
                    {columns.map((col, cidx) => {
                      // Net P&L
                      if (col === "Net") {
                        const netPL = row.net ?? ((row.current ?? 0) - (row.invested ?? 0));
                        return (
                          <td key={cidx} className={`px-2 py-1 ${netPL >= 0 ? "text-green-600" : "text-red-500"}`}>
                            {netPL.toFixed(2)}
                          </td>
                        );
                      }

                      // Day P&L
                      if (col === "Day") {
                        const dayPL = row.day ?? 0;
                        return (
                          <td key={cidx} className={`px-2 py-1 ${dayPL >= 0 ? "text-green-600" : "text-red-500"}`}>
                            {dayPL.toFixed(2)}
                          </td>
                        );
                      }

                      // Price, Avg, Invested, Current
                      if (col === "Price") return <td key={cidx} className="px-2 py-1">₹{(row.LTP ?? 0).toFixed(2)}</td>;
                      if (col === "Avg") return <td key={cidx} className="px-2 py-1">₹{(row.avg ?? 0).toFixed(2)}</td>;
                      if (col === "Invested") return <td key={cidx} className="px-2 py-1">₹{(row.invested ?? 0).toFixed(2)}</td>;
                      if (col === "Current") return <td key={cidx} className="px-2 py-1">₹{(row.current ?? 0).toFixed(2)}</td>;

                      // Company
                      if (col === "Company") return <td key={cidx} className="px-2 py-1">{row.name} ({row.symbol})</td>;

                      // Transaction Type
                      if (col === "Type") return <td key={cidx} className={`px-2 py-1 ${row.type === "BUY" ? "text-green-600" : "text-red-500"}`}>{row.type}</td>;

                      // Category
                      if (col === "Category") {
                        const cat = row.category === "L" ? "Longterm" : row.category === "S" ? "Interday" : "-";
                        const colorClass = row.category === "L" ? "bg-green-100 text-green-800" : row.category === "S" ? "bg-yellow-100 text-yellow-800" : "text-gray-500";
                        return (
                          <td key={cidx} className={`px-2 py-1 text-center rounded-full px-2 ${colorClass}`}>
                            {cat}
                          </td>
                        );
                      }

                      // Date formatting
                      if (col === "Date") return <td key={cidx} className="px-2 py-1">{row.date ? new Date(row.date).toLocaleString() : "-"}</td>;

                      // Qty or Symbol
                      return <td key={cidx} className="px-2 py-1">{row[col.toLowerCase()] ?? "-"}</td>;
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {data.length > rowsPerPage && (
          <div className="flex justify-end mt-2 gap-2">
            <button
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              disabled={(page + 1) * rowsPerPage >= data.length}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // Determine filtered data
  const filteredHoldings = filter === "holdings" || filter === "all" ? portfolio.holdings : [];
  const filteredPositions = filter === "positions" || filter === "all" ? portfolio.positions : [];

  return (
    <div className="flex flex-col gap-6">
      {/* Interactive Portfolio Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          onClick={() => setFilter("all")}
          className={`cursor-pointer bg-white shadow rounded-lg p-4 flex flex-col items-center justify-center hover:shadow-md transition ${
            filter === "all" ? "border-2 border-blue-400 shadow-lg" : ""
          }`}
        >
          <span className="text-gray-500 text-sm">Funds Left</span>
          <span className="text-2xl font-semibold">₹{(portfolio.balance ?? 0).toFixed(2)}</span>
        </div>
        <div
          onClick={() => setFilter("holdings")}
          className={`cursor-pointer bg-white shadow rounded-lg p-4 flex flex-col items-center justify-center hover:shadow-md transition ${
            filter === "holdings" ? "border-2 border-blue-400 shadow-lg" : ""
          }`}
        >
          <span className="text-gray-500 text-sm">Invested</span>
          <span className="text-2xl font-semibold">₹{(portfolio.investedValue ?? 0).toFixed(2)}</span>
        </div>
        <div
          onClick={() => setFilter("positions")}
          className={`cursor-pointer bg-white shadow rounded-lg p-4 flex flex-col items-center justify-center hover:shadow-md transition ${
            filter === "positions" ? "border-2 border-blue-400 shadow-lg" : ""
          }`}
        >
          <span className="text-gray-500 text-sm">Total Value / Today P&L</span>
          <span className="text-2xl font-semibold">
            ₹{(portfolio.totalValue ?? 0).toFixed(2)} / ₹{(portfolio.todayPL ?? 0).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Tables */}
      <Table
        title="Holdings"
        columns={["Company", "Qty", "Avg", "Price", "Invested", "Current", "Net", "Day"]}
        data={paginate(filteredHoldings, holdingsPage)}
        page={holdingsPage}
        setPage={setHoldingsPage}
        isActive={filter === "holdings" || filter === "all"}
      />
      <Table
        title="Positions"
        columns={["Company", "Qty", "Avg", "Price", "Invested", "Current", "Net", "Day"]}
        data={paginate(filteredPositions, positionsPage)}
        page={positionsPage}
        setPage={setPositionsPage}
        isActive={filter === "positions" || filter === "all"}
      />
      <Table
        title="Recent Transactions"
        columns={["Type", "Symbol", "Qty", "Price", "Category", "Date"]}
        data={paginate(portfolio.transactions, transactionsPage)}
        page={transactionsPage}
        setPage={setTransactionsPage}
        isActive={true} // Transactions always visible
      />
    </div>
  );
};

export default Summary;
