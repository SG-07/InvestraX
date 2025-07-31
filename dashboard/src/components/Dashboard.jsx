import WatchList from "./WatchList";
import { GeneralContextProvider } from "./GeneralContext";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="w-full h-[90vh] flex items-center box-border">
      <GeneralContextProvider>
        <WatchList />
      </GeneralContextProvider>
      <div className="basis-[68%] h-full box-border overflow-y-auto px-[2%] py-[3%]">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;