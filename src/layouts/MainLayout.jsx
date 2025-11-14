// client/src/layouts/MainLayout.jsx
import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Toaster } from 'react-hot-toast'; // Required for toast messages

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      {/* Toast Notification Container */}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default MainLayout;