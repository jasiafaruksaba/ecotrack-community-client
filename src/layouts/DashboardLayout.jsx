// client/src/layouts/DashboardLayout.jsx
import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar'; // Needs to be created
import { Toaster } from 'react-hot-toast';

const DashboardLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-col md:flex-row flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Sidebar (Hidden on mobile, appears on MD+) */}
        <Sidebar className="w-full md:w-64 md:shrink-0 mb-6 md:mb-0 md:mr-8" />
        
        {/* Main Content Area */}
        <main className="flex-grow">
          <Outlet />
        </main>
      </div>
      <Footer />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default DashboardLayout;