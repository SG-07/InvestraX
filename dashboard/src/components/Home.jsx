import TopBar from "./TopBar";
import Dashboard from "./Dashboard";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    console.log("🏠 Home loaded");
    console.log("📍 Current path:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <TopBar />
      <Dashboard />
      <Outlet />
    </>
  );
};

export default Home;
