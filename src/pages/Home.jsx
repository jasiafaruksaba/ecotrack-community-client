// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router'; // <-- যোগ করো
import axios from 'axios';
import ChallengeCard from '../components/challengeCard';
import TipCard from '../components/TipCard';
import EventCard from '../components/EventCard';
import SkeletonLoader from '../components/SkeletonLoader';
import { toast } from 'react-toastify';

const API = import.meta.env.VITE_SERVER_BASE_URL || 'http://localhost:3000/api';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [challenges, setChallenges] = useState([]);
  const [tips, setTips] = useState([]);
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({ totalCO2: 0, totalPlastic: 0 });

  useEffect(() => {
    setLoading(true);
    Promise.all([
      axios.get(`${API}/challenges`), // সব চ্যালেঞ্জ নিয়ে আসবে
      axios.get(`${API}/tips?limit=5`),
      axios.get(`${API}/events?limit=4`),
    ])
      .then(([c, t, e]) => {
        const allChallenges = c.data || [];
        // শুধু প্রথম ৬টা চ্যালেঞ্জ দেখাবে
        setChallenges(allChallenges.slice(0, 6));

        setTips(t.data || []);
        setEvents(e.data || []);

        // CO2 & Plastic stats (যদি ফিল্ড থাকে)
        const totalCO2 = allChallenges.reduce((s, i) => s + (i.co2Saved || 0), 0);
        const totalPlastic = allChallenges.reduce((s, i) => s + (i.plasticSaved || 0), 0);
        setStats({ totalCO2, totalPlastic });
      })
      .catch((err) => {
        console.error(err);
        toast.error('Could not load home data');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero" aria-label="hero">
        <div className="left">
          <h1 style={{ margin: 0 }}>Join hands for a greener tomorrow</h1>
         <div className="flex flex-col gap-6 max-w-md">
  <p className="text-muted-foreground text-lg leading-relaxed">
    Find local challenges, track your impact, and share tips.
  </p>

  {/* Explore Challenges Button */}
  <Link
    to="/challenges"
    className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary/90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
  >
    Explore Challenges
  </Link>
</div>
</div>

        {/* Community Stats */}
        <div style={{ width: 260, textAlign: 'center' }}>
          <div
            style={{
              background: '#fff',
              padding: 12,
              borderRadius: 10,
              boxShadow: 'var(--shadow)',
            }}
          >
            <h4 style={{ margin: '8px 0' }}>Community Stats</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div>
                <strong>{stats.totalCO2} kg</strong> CO₂ saved
              </div>
              <div>
                <strong>{stats.totalPlastic} kg</strong> Plastic reduced
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Active Challenges Section */}
      <section style={{ marginTop: 32 }}>
        <h2>Active Challenges</h2>
        {loading ? (
          <SkeletonLoader count={6} />
        ) : (
          <div className="grid">
            {challenges.map((c) => (
              <ChallengeCard key={c._id} challenge={c} />
            ))}
          </div>
        )}

        {/* All Challenges Button */}
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Link
            to="/challenges"
            style={{
              display: 'inline-block',
              padding: '12px 32px',
              background: 'transparent',
              color: 'var(--primary)',
              border: '2px solid var(--primary)',
              borderRadius: 8,
              fontWeight: 'bold',
              textDecoration: 'none',
              fontSize: '1.1rem',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'var(--primary)';
              e.target.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = 'var(--primary)';
            }}
          >
            All Challenges
          </Link>
        </div>
      </section>

      {/* Recent Tips */}
      <section style={{ marginTop: 32 }}>
        <h2>Recent Tips</h2>
        {loading ? (
          <SkeletonLoader count={3} />
        ) : (
          <div style={{ display: 'grid', gap: 12 }}>
            {tips.map((t) => (
              <TipCard key={t._id} tip={t} />
            ))}
          </div>
        )}
      </section>

      {/* Upcoming Events */}
      <section style={{ marginTop: 32 }}>
        <h2>Upcoming Events</h2>
        {loading ? (
          <SkeletonLoader count={4} />
        ) : (
          <div className="grid">
            {events.map((e) => (
              <EventCard key={e._id} event={e} />
            ))}
          </div>
        )}
      </section>

      {/* Why Go Green */}
      <section
        style={{
          marginTop: 40,
          background: '#fff',
          padding: 20,
          borderRadius: 12,
          boxShadow: 'var(--shadow)',
        }}
      >
        <h3 className='text-2xl, text-blue-600'>Why Go Green?</h3>
       <ul className="space-y-4">
  <li className="flex items-start gap-3">
    <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shadow-sm">
      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <span className="text-gray-700 text-base leading-relaxed">
      Reduce waste and save money
    </span>
  </li>

  <li className="flex items-start gap-3">
    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shadow-sm">
      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    </div>
    <span className="text-gray-700 text-base leading-relaxed">
      Improve air and water quality locally
    </span>
  </li>

  <li className="flex items-start gap-3">
    <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center shadow-sm">
      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    </div>
    <span className="text-gray-700 text-base leading-relaxed">
      Join community-driven measurable impact
    </span>
  </li>
</ul>
      </section>
    </div>
  );
}