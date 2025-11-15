import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChallengeCard from '../components/challengeCard';
import SkeletonLoader from '../components/SkeletonLoader';
import { toast } from 'react-toastify';

// Vite-এ process.env নেই → import.meta.env ব্যবহার করো
const API = import.meta.env.VITE_SERVER_BASE_URL || 'http://localhost:3000/api';

export default function Challenges() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/challenges`)
      .then((r) => setItems(r.data))
      .catch((e) => {
        console.error(e);
        toast.error('Failed to load challenges');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2>All Challenges</h2>
      {loading ? (
        <SkeletonLoader count={6} />
      ) : (
        <div className="grid">
          {items.map((i) => (
            <ChallengeCard key={i._id} challenge={i} />
          ))}
        </div>
      )}
    </div>
  );
}