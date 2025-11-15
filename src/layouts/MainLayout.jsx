import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MainLayout(){
  return (
    <>
      <div className="app-shell">
        <Navbar />
        <main style={{marginTop:12}}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
