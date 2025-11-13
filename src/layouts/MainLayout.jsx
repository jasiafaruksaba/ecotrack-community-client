// import { Outlet } from "react-router-dom";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF9] text-[#1A1C1B]">
      <Navbar />
       <Sidebar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
