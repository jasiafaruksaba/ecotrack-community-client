// src/layouts/DashboardLayout.jsx
import React from 'react';
import { Outlet, Link, useLocation } from 'react-router'; // useLocation যোগ করো
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function DashboardLayout() {
  const location = useLocation(); // বর্তমান পাথ চেক করতে

  const navItems = [
    { to: '/my-activities', label: 'My Activities' },
    { to: '/challenges/add', label: 'Add Challenge' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className="md:w-64">
            <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100">
              <h4 className="text-xl font-bold text-gray-800 mb-5 tracking-tight">
                Dashboard
              </h4>

              <nav className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`
                      block px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200
                      ${
                        isActive(item.to)
                          ? 'bg-blue-100 text-blue-800 underline underline-offset-4 decoration-2'
                          : 'text-blue-600 hover:bg-blue-50 hover:text-blue-800 hover:underline hover:underline-offset-4 hover:decoration-2'
                      }
                    `}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="bg-white rounded-xl shadow-md p-6 min-h-[500px] border border-gray-100">
              <Outlet />
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}