import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import WatchList from "./WatchList";
import { GeneralContextProvider, useGeneralContext } from "./GeneralContext";
import { getHoldings, getWallet, getPortfolio } from "../services/api";

// This wrapper loads data and updates context
const DashboardLoader = () => {
  const { setHoldings, setWallet, setPortfolio } = useGeneralContext();

  useEffect(() => {
    console.log("📊 Dashboard mounted, fetching initial data...");

    async function fetchData() {
      try {
        const [holdingsRes, walletRes, portfolioRes] = await Promise.all([
          getHoldings(),
          getWallet(),
          getPortfolio(),
        ]);

        setHoldings(holdingsRes.data);
        setWallet(walletRes.data);
        setPortfolio(portfolioRes.data);

        console.log("✅ Dashboard data loaded");
      } catch (err) {
        console.error("❌ Error fetching dashboard data:", err);
      }
    }

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

const Dashboard = () => {
  return (
    <GeneralContextProvider>
      <DashboardLoader />
    </GeneralContextProvider>
  );
};

export default Dashboard;
