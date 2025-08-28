import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import WatchList from "./WatchList";
import { useGeneralContext } from "./GeneralContext";
import { HoldingsAPI, WalletAPI, PortfolioAPI } from "../services/api"; 

const Dashboard = () => {
  const { setHoldings, setWallet, setPortfolio } = useGeneralContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("📊 Dashboard mounted, fetching initial data...");
        const [holdingsRes, walletRes, portfolioRes] = await Promise.all([
          HoldingsAPI.list(),      // ✅ updated usage
          WalletAPI.get(),         // ✅ updated usage
          PortfolioAPI.summary(),  // ✅ updated usage
        ]);

        setHoldings(Array.isArray(holdingsRes.data) ? holdingsRes.data : []);
        setWallet(walletRes.data?.balance ?? 0);
        setPortfolio(portfolioRes.data ?? {});

        console.log("✅ Dashboard data loaded", {
          holdings: holdingsRes.data,
          wallet: walletRes.data,
          portfolio: portfolioRes.data,
        });
      } catch (err) {
        console.error("❌ Error fetching dashboard data:", err);
      }
    };

    fetchData();
  }, [setHoldings, setWallet, setPortfolio]);

  return (
    <div className="w-full h-[90vh] flex items-center box-border">
      <div className="flex-[0_0_32%] h-full">
        <WatchList />
      </div>
      <div className="basis-[68%] h-full box-border overflow-y-auto px-[2%] py-[3%]">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
