import React from 'react';
import { Routes, Route } from 'react-router';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import Home from './pages/Home';
import Challenges from './pages/Challenges';
import ChallengeDetails from './pages/ChallengeDetails';
import AddChallenge from './pages/AddChallenge';
import JoinChallenge from './pages/JoinChallenge';
import MyActivities from './pages/MyActivities';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import PagesError from './pages/PagesError';
import ProtectedRoute from './components/ProtectedRoute';
import Participants from'./pages/Participants'


export default function App(){
  return (
    <Routes>
      <Route element={<MainLayout/>}>
        <Route path="/" element={<Home/>} />
        <Route path="/challenges" element={<Challenges/>} />
        <Route path="/challenges/:id" element={<ChallengeDetails/>} />
        <Route path="/challenges/:id/participants" element={<Participants />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="*" element={<PagesError/>} />
      </Route>

      <Route element={<DashboardLayout/>}>
        <Route path="/challenges/add" element={<ProtectedRoute><AddChallenge/></ProtectedRoute>} />
        <Route path="/challenges/join/:id" element={<ProtectedRoute><JoinChallenge/></ProtectedRoute>} />
        <Route path="/my-activities" element={<ProtectedRoute><MyActivities/></ProtectedRoute>} />
        <Route path="/my-activities/:id" element={<ProtectedRoute><MyActivities/></ProtectedRoute>} />
      </Route>
    </Routes>
  );
}
