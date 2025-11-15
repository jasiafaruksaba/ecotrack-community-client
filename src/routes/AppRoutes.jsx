import { Routes, Route } from 'react-router';
import Home from '../pages/Home';
import Challenges from '../pages/Challenges';
import ChallengeDetails from '../pages/ChallengeDetails';
import AddChallenge from '../pages/AddChallenge';
import MyActivities from '../pages/MyActivities';
import Login from '../pages/Login';
import Register from '../pages/Register';
import PagesError from '../pages/PagesError';
import PrivateRoute from './PrivateRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/challenges" element={<Challenges />} />
      <Route path="/challenges/:id" element={<ChallengeDetails />} />
      <Route path="/challenges/add" element={<PrivateRoute><AddChallenge /></PrivateRoute>} />
      <Route path="/my-activities" element={<PrivateRoute><MyActivities /></PrivateRoute>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<div>Forgot Password Page (Link only, no impl)</div>} />
      <Route path="*" element={<PagesError />} />
    </Routes>
  );
};

export default AppRoutes;