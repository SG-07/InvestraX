import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import WatchList from "./WatchList";
import { useGeneralContext } from "./GeneralContext";
import { getHoldings, getWallet, getPortfolio } from "../services/api";

const Dashboard = () => {
  const { setUser, setHoldings, setWallet, setPortfolio } = useGeneralContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("📊 Dashboard mounted, fetching initial data...");

        // Fetch dashboard data
        const [holdingsRes, walletRes, portfolioRes] = await Promise.all([
          getHoldings(),
          getWallet(),
          getPortfolio(),
        ]);

        setHoldings(holdingsRes.data);
        setWallet(walletRes.data);
        setPortfolio(portfolioRes.data);

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
      <WatchList />
      <div className="basis-[68%] h-full box-border overflow-y-auto px-[2%] py-[3%]">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;