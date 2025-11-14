// client/src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router';
import { FaChartLine, FaUserCircle, FaPlusSquare } from 'react-icons/fa';

const Sidebar = ({ className }) => {
  const navItems = [
    { to: "/my-activities", icon: FaChartLine, label: "My Activities" },
    { to: "/challenges/add", icon: FaPlusSquare, label: "Add Challenge" },
    { to: "/profile", icon: FaUserCircle, label: "Profile Settings" },
  ];

  const activeStyle = "bg-green-100 text-green-700 font-semibold border-l-4 border-green-500";
  const defaultStyle = "text-gray-600 hover:bg-gray-100 hover:text-green-700";

  return (
    <aside className={`${className} bg-white rounded-xl shadow-lg p-4`}>
      <h3 className="text-lg font-bold mb-4 border-b pb-2 hidden md:block">Dashboard Menu</h3>
      
      {/* Navigation List - Responsive Flex/Column Change */}
      <nav>
        <ul className="flex flex-row md:flex-col space-x-4 md:space-x-0 md:space-y-2 overflow-x-auto pb-2 md:pb-0">
          {navItems.map((item) => (
            <li key={item.to} className="shrink-0">
              <NavLink
                to={item.to}
                className={({ isActive }) => 
                  `flex items-center space-x-3 p-3 rounded-lg transition duration-150 ${
                    isActive ? activeStyle : defaultStyle
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;