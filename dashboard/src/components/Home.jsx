import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <>
      <TopBar />
      <Dashboard />
      <Outlet />
    </>
  );
};

export default Home;
