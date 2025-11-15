// src/pages/Participants.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import axios from 'axios';
import { toast } from 'react-toastify';

const API = import.meta.env.VITE_SERVER_BASE_URL || 'http://localhost:3000/api';

export default function Participants() {
  const { id } = useParams();
  const [participants, setParticipants] = useState([]);
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [chalRes, partRes] = await Promise.all([
          axios.get(`${API}/challenges/${id}`),
          axios.get(`${API}/userChallenges/participants/${id}`),
        ]);
        setChallenge(chalRes.data);
        setParticipants(partRes.data);
      } catch (err) {
        toast.error('Failed to load participants');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <p className="text-center py-10">Loading participants...</p>;

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="bg-white rounded-xl shadow-lg p-8">
        {/* Back + Title */}
        <div className="flex items-center gap-4 mb-6">
          <Link
            to={`/challenges/${id}`}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Challenge
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">
            {challenge?.title} – Participants
          </h1>
        </div>

        {/* Count */}
        <p className="text-lg text-green-600 font-semibold mb-6">
          {participants.length} people joined
        </p>

        {/* List */}
        <div className="grid gap-4 md:grid-cols-2">
          {participants.map((p) => (
            <div
              key={p._id}
              className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border border-blue-100"
            >
              <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-bold text-lg">
                {p.displayName?.[0] || p.email[0].toUpperCase()}
              </div>
              <div>
                <p className="font-medium text-gray-800">{p.displayName || 'Anonymous'}</p>
                <p className="text-sm text-gray-500">{p.email}</p>
                <p className="text-xs text-green-600 mt-1">
                  Joined: {new Date(p.joinedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {participants.length === 0 && (
          <p className="text-center text-gray-500 py-10">No one has joined yet.</p>
        )}
      </div>
    </div>
  );
}