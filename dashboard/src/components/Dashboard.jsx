import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import WatchList from "./WatchList";
import { useGeneralContext } from "./GeneralContext";
import { getHoldings, getWallet, getPortfolio } from "../services/api";

const Dashboard = () => {
  const { setHoldings, setWallet, setPortfolio } = useGeneralContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("📊 Dashboard mounted, fetching initial data...");

        const [holdingsRes, walletRes, portfolioRes] = await Promise.all([
          getHoldings(),
          getWallet(),
          getPortfolio(),
        ]);

        setHoldings(holdingsRes.data || []);

        const balance =
          (walletRes.data && (walletRes.data.balance ?? walletRes.data)) ?? 0;
        setWallet(balance);

        setPortfolio(portfolioRes.data || null);

        console.log("✅ Dashboard data loaded", {
          holdings: holdingsRes.data,
          wallet: balance,
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