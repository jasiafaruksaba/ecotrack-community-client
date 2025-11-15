// src/pages/JoinChallenge.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const API = import.meta.env.VITE_SERVER_BASE_URL || 'http://localhost:3000/api';

export default function JoinChallenge() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [challenge, setChallenge] = useState(null);

  

  // Fetch challenge details (optional, for better UX)
  useEffect(() => {
    if (!id) return;
    axios
      .get(`${API}/challenges/${id}`)
      .then((res) => setChallenge(res.data))
      .catch(() => toast.error('Challenge not found'));
  }, [id]);

  const handleJoin = async () => {
    if (!user) {
      toast.info('Please log in to join');
      return navigate('/login');
    }

    setLoading(true);
    try {
      const token = await user.getIdToken();
      await axios.post(
        `${API}/userChallenges/join`,
        { challengeId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success('Successfully joined the challenge!');
      navigate('/my-activities');
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to join challenge';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-blue-100">
          {/* Challenge Title (if loaded) */}
          {challenge && (
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {challenge.title}
            </h2>
          )}

          <h3 className="text-xl font-semibold text-blue-700 mb-3">
            Join Challenge
          </h3>

          <p className="text-gray-600 mb-8 leading-relaxed">
            Click to join and start tracking your progress.
          </p>

         <button
  onClick={handleJoin}
  disabled={loading}
  className={`
    w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300
    focus:outline-none focus:ring-4 focus:ring-blue-300
    ${loading 
      ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
      : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 hover:shadow-lg transform hover:-translate-y-1 shadow-md'
    }
  `}
>
  {loading ? (
    <span className="flex items-center justify-center gap-2">
      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">...</svg>
      Redirecting...
    </span>
  ) : (
    'Join Now'
  )}
</button>

          {/* Optional: Back Link */}
          <button
            onClick={() => navigate(-1)}
            className="mt-6 text-sm text-blue-600 hover:text-blue-800 underline-offset-2 hover:underline transition"
          >
            ← Go Back
          </button>
        </div>
      </div>
    </div>
  );
}