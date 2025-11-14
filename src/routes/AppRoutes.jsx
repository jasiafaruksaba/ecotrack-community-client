// client/src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router';

// Layouts
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';

// Pages
import Home from '../pages/Home';
import Challenges from '../pages/Challenges';
import ChallengeDetails from '../pages/ChallengeDetails';
import Login from '../pages/Login';
import Register from '../pages/Register';
import MyActivities from '../pages/MyActivities';
import AddChallenge from '../pages/AddChallenge';
import PagesError from '../pages/PagesError'; // 404
// Note: ForgotPassword is link only, so no page implementation needed now.

// Custom Routes
import PrivateRoute from './PrivateRoute'; // Protected route wrapper

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Layout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="challenges" element={<Challenges />} />
        <Route path="challenges/:id" element={<ChallengeDetails />} />

        {/* Auth Routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<Login />} /> {/* Link only, redirect to login */}

        {/* Protected Routes (Using PrivateRoute component) */}
        <Route
          path="challenges/add"
          element={<PrivateRoute><AddChallenge /></PrivateRoute>}
        />
        <Route
          path="challenges/join/:id"
          element={
            <PrivateRoute>
              {/* This page would handle the join logic and redirect */}
              <ChallengeDetails isJoining={true} />
            </PrivateRoute>
          }
        />
        
        {/* Dashboard/Activities Layout (Can use MainLayout or a different one) */}
        {/* If My Activities uses a sidebar, use DashboardLayout */}
        <Route path="/" element={<DashboardLayout />}> 
            <Route
                path="my-activities"
                element={<PrivateRoute><MyActivities /></PrivateRoute>}
            />
             <Route
                path="my-activities/:id"
                element={<PrivateRoute><MyActivities /></PrivateRoute>}
            />
            {/* Optional Profile route */}
            <Route
                path="profile"
                element={<PrivateRoute><div>Profile Page (Optional)</div></PrivateRoute>}
            />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<PagesError />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;