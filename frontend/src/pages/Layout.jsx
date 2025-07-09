import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="pt-20 px-4 flex-grow">
          <Outlet />
        </main>
        <div className="mt-12">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Layout;
