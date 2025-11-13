// src/App.jsx
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Challenges from "./pages/Challenges";
import ChallengeDetails from "./pages/ChallengeDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddChallenge from "./pages/AddChallenge";
import JoinChallenge from "./pages/JoinChallenge";
import MyActivities from "./pages/MyActivities";
import { BrowserRouter, Route, Routes } from "react-router";
import PagesError from "./pages/PagesError";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes - MainLayout */}
       <Route element={<MainLayout />}>
  <Route path="/" element={<Home />} />
  <Route path="/challenges" element={<Challenges />} />
  <Route path="/challenge/:id" element={<ChallengeDetails />} />  
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
</Route>

        {/* Protected Routes - DashboardLayout */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/challenges/add" element={<AddChallenge />} />
          <Route path="/challenges/join/:id" element={<JoinChallenge />} />
          <Route path="/my-activities" element={<MyActivities />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<PagesError />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;