import { Home, Activity, Award, LogOut, Menu } from "lucide-react";
// import { Link } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`bg-white border-r h-screen p-4 transition-all duration-300 ${collapsed ? "w-20" : "w-64"}`}>
      <button onClick={() => setCollapsed(!collapsed)} className="mb-6">
        <Menu />
      </button>

      <nav className="flex flex-col gap-4">
        <Link className="flex items-center gap-3 hover:text-green-600" to="/">
          <Home /> {!collapsed && "Home"}
        </Link>
        <Link className="flex items-center gap-3 hover:text-green-600" to="/challenges">
          <Activity /> {!collapsed && "Challenges"}
        </Link>
        <Link className="flex items-center gap-3 hover:text-green-600" to="/my-activities">
          <Award /> {!collapsed && "My Activities"}
        </Link>
        <Link className="flex items-center gap-3 hover:text-red-500 mt-auto" to="/logout">
          <LogOut /> {!collapsed && "Logout"}
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
