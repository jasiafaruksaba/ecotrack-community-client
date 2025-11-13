import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowRight } from "lucide-react";
import ChallengeCard from "../components/challengeCard";
import TipCard from "../components/TipCard";
import EventCard from "../components/EventCard";

const Home = () => {
  const [challenges, setChallenges] = useState([]);
  const [tips, setTips] = useState([]);
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({ co2: 0, plastic: 0 });
useEffect(() => {
  const fetchData = async () => {
    try {
      const [chRes, tipsRes, eventsRes, statsRes] = await Promise.all([
        axios.get("/api/challenges?limit=6"),
        axios.get("/api/tips?limit=5"),
        axios.get("/api/events?limit=4"),
        axios.get("/api/stats")
      ]);

      console.log("Challenges:", chRes.data);
      console.log("Tips:", tipsRes.data);
      console.log("Events:", eventsRes.data);
      console.log("Stats:", statsRes.data);

      // Safe array assignment
      setChallenges(Array.isArray(chRes.data) ? chRes.data : chRes.data.challenges || []);
      setTips(Array.isArray(tipsRes.data) ? tipsRes.data : tipsRes.data.tips || []);
      setEvents(Array.isArray(eventsRes.data) ? eventsRes.data : eventsRes.data.events || []);
      setStats(statsRes.data || { co2: 0, plastic: 0 });

    } catch (err) {
      console.error("API Error:", err.response?.data || err.message);
    }
  };
  fetchData();
}, []);

  return (
    <div className="space-y-12">
      {/* Hero Banner */}
      <section className="bg-green-50 rounded-lg p-8 relative">
        <h1 className="text-4xl font-bold text-green-700 mb-4">Join Sustainability Challenges</h1>
        <p className="text-gray-700 mb-6">Track your impact, share tips, and grow a greener community.</p>
        <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 flex items-center gap-2">
          View Challenges <ArrowRight size={18} />
        </button>
      </section>

      {/* Live Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white rounded p-4 shadow text-center">
          <h2 className="text-2xl font-bold">{stats.co2} kg</h2>
          <p className="text-gray-600">CO₂ Saved</p>
        </div>
        <div className="bg-white rounded p-4 shadow text-center">
          <h2 className="text-2xl font-bold">{stats.plastic} kg</h2>
          <p className="text-gray-600">Plastic Reduced</p>
        </div>
      </section>

      {/* Active Challenges */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Active Challenges</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {Array.isArray(challenges) && challenges.length > 0 ? (
            challenges.map(ch => (
              <ChallengeCard key={ch._id} challenge={ch} />
            ))
          ) : (
            <p className="text-gray-500">No challenges available</p>
          )}
        </div>
      </section>

     {/* Recent Tips */}
<section>
  <h2 className="text-2xl font-semibold mb-4">Recent Tips</h2>
  <div className="grid md:grid-cols-2 gap-6">
    {Array.isArray(tips) && tips.length > 0 ? (
      tips.map(tip => <TipCard key={tip._id} tip={tip} />)
    ) : (
      <p className="text-gray-500 col-span-full text-center">No tips available</p>
    )}
  </div>
</section>

{/* Upcoming Events */}
<section>
  <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
  <div className="grid md:grid-cols-2 gap-6">
    {Array.isArray(events) && events.length > 0 ? (
      events.map(event => <EventCard key={event._id} event={event} />)
    ) : (
      <p className="text-gray-500 col-span-full text-center">No upcoming events</p>
    )}
  </div>
</section>
{/* Static Sections */}
      <section className="bg-green-50 rounded p-6 space-y-4">
        <h2 className="text-2xl font-semibold">Why Go Green?</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Reduce environmental pollution</li>
          <li>Save natural resources</li>
          <li>Promote sustainable lifestyle</li>
        </ul>
      </section>

      <section className="bg-green-50 rounded p-6 space-y-4">
        <h2 className="text-2xl font-semibold">How It Works</h2>
        <ol className="list-decimal list-inside text-gray-700">
          <li>Join a challenge</li>
          <li>Track your progress</li>
          <li>Share tips with the community</li>
        </ol>
      </section>
    </div>
  );
};

export default Home;