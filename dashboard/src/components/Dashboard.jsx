import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import WatchList from "./WatchList";
import { useGeneralContext } from "./GeneralContext";
import { PortfolioAPI, StocksAPI } from "../services/api";

const Dashboard = () => {
  const { setHoldings, setWallet, setPortfolio, setTransactions } = useGeneralContext();
  const [allStocks, setAllStocks] = useState([]);
  const [watchlist, setWatchlist] = useState([]); // ✅ reactive watchlist

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("📊 Dashboard mounted, fetching summary + stocks...");

        const [summaryRes, stocksRes, watchlistRes] = await Promise.all([
          PortfolioAPI.summary(),
          StocksAPI.list(),
          PortfolioAPI.getWatchlist(), // fetch initial watchlist
        ]);

        const summary = summaryRes.data ?? {};
        setWallet(summary.totalValue ?? 0);
        setPortfolio(summary);
        setHoldings(summary.holdings || []);
        setTransactions(summary.transactions || []);

        let stocksArr = [];
        if (Array.isArray(stocksRes.data)) {
          stocksArr = stocksRes.data;
        } else if (Array.isArray(stocksRes.data?.data)) {
          stocksArr = stocksRes.data.data;
        }
        setAllStocks(stocksArr);

        setWatchlist(watchlistRes.data?.watchlist || []);
      } catch (err) {
        console.error("❌ Error fetching dashboard data:", err);
      }
    };

    fetchData();
  }, [setHoldings, setWallet, setPortfolio, setTransactions]);

  return (
    <div className="w-full h-[90vh] flex items-center box-border">
      <div className="flex-[0_0_32%] h-full">
        <WatchList
          allStocks={allStocks}
          watchlist={watchlist}
          setWatchlist={setWatchlist} // pass setter
        />
      </div>
      <div className="basis-[68%] h-full box-border overflow-y-auto px-[2%] py-[3%]">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
