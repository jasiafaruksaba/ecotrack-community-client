// pages/ChallengeDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import axios from 'axios';
import SkeletonLoader from '../components/SkeletonLoader';
import { toast } from 'react-toastify';

const API = import.meta.env.VITE_SERVER_BASE_URL || 'http://localhost:3000/api';

export default function ChallengeDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState(null);

  useEffect(() => {
    axios
      .get(`${API}/challenges/${id}`)
      .then((r) => setItem(r.data))
      .catch((e) => {
        console.error(e);
        toast.error('Challenge not found');
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <SkeletonLoader count={1} />;
  if (!item) return <div className="text-center">Challenge not found</div>;

  return (
    <div className="container" style={{ maxWidth: 600, margin: '2rem auto' }}>
      <div className="card">
        {item.imageUrl && <img src={item.imageUrl} alt={item.title} style={{ width: '100%', borderRadius: 8 }} />}
        <h2>{item.title}</h2>
        <p style={{ color: 'var(--muted)' }}>
          {item.category} • {item.duration} days
        </p>
        <p>{item.description}</p>
        <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
          <Link to={`/challenges/join/${id}`}>
  Join Challenge
</Link>
          <span style={{ alignSelf: 'center' }}>
            {item.participants || 0} joined
          </span>
        </div>
      </div>
    </div>
  );
}