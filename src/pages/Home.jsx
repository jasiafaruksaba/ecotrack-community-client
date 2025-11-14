// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ধরে নিচ্ছি তুমি কোনো API থেকে ডাটা আনছো
    const fetchChallenges = async () => {
      try {
        // const res = await fetch('/api/challenges');
        // const data = await res.json();
        const data = [
          { id: 1, title: "Plant 10 Trees", points: 100 },
          { id: 2, title: "Reduce Plastic Use", points: 80 },
        ];
        setChallenges(data);
      } catch (error) {
        console.error("Failed to load challenges:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Welcome, {user?.displayName || 'Explorer'}!</h1>

      <h2 className="text-2xl font-semibold mb-4">Active Challenges</h2>

      {loading ? (
        <p>Loading challenges...</p>
      ) : challenges.length === 0 ? (
        <p>No challenges available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge) => (
            <div key={challenge.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-green-600">{challenge.title}</h3>
              <p className="text-gray-600 mt-2">Earn {challenge.points} points</p>
              <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Join Challenge
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;