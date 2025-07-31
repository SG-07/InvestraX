import TopBar from "./TopBar";
import Dashboard from "./Dashboard";
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