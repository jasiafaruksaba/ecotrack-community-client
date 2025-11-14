import React from 'react';
import useFetch from '../hooks/useFetch'; // You need to create this hook
import ChallengeCard from '../components/challengeCard';
import TipCard from '../components/TipCard';
import EventCard from '../components/EventCard';
import SkeletonLoader from '../components/SkeletonLoader'; // You need to create this component

const Home = () => {
    const { data: challenges, loading: loadingChallenges } = useFetch('/api/challenges?limit=4');
    const { data: tips, loading: loadingTips } = useFetch('/api/tips');
    const { data: events, loading: loadingEvents } = useFetch('/api/events');
    const { data: stats, loading: loadingStats } = useFetch('/api/stats'); // Assuming a stats endpoint

    // --- Static Sections ---
    const renderWhyGoGreen = () => (
        <section className="py-12 bg-gray-50">
            <h2 className="text-3xl font-bold text-center mb-6 text-green-700">Why Go Green? 🌿</h2>
            <div className="max-w-4xl mx-auto px-4">
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>**Reduce your Carbon Footprint:** Direct impact on climate change mitigation.</li>
                    <li>**Save Money:** Lower energy and water bills by adopting sustainable habits.</li>
                    <li>**Support Local Ecosystems:** Reduce pollution and waste in your community.</li>
                    <li>**Inspire Others:** Community-driven progress fosters collective action.</li>
                    <li>**Improve Health:** Cleaner air and less exposure to toxins.</li>
                </ul>
            </div>
        </section>
    );

    const renderHowItWorks = () => (
        <section className="py-12">
            <h2 className="text-3xl font-bold text-center mb-10 text-green-700">How EcoTrack Works</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 text-center">
                <div className="p-6 border rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-3">1. Join a Challenge</h3>
                    <p>Select from various sustainability challenges like "Plastic-Free July" or "30 Days of Cycling."</p>
                </div>
                <div className="p-6 border rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-3">2. Track Progress</h3>
                    <p>Log your daily activities and see your environmental impact (e.g., CO₂ saved) grow!</p>
                </div>
                <div className="p-6 border rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-3">3. Share Tips</h3>
                    <p>Post practical eco-tips and get upvotes from the community to become a green leader.</p>
                </div>
            </div>
        </section>
    );

    return (
        <div className="min-h-screen">
            {/* 1. Hero Banner & Live Statistics */}
            <section className="bg-green-100 p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Hero Banner/Carousel (requires implementation) */}
                    <h1 className="text-4xl font-extrabold text-green-800 mb-6">Track Your Green Impact!</h1>
                    <p className="text-lg mb-8">Join the EcoTrack community to make measurable, collective progress toward a sustainable future.</p>

                    {/* Live Statistics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        {loadingStats ? <SkeletonLoader count={4} type="stat" /> : (
                            <>
                                <div className="p-4 bg-white rounded shadow">
                                    <p className="text-3xl font-bold text-green-600">{stats?.co2Saved || '12,500'}</p>
                                    <p className="text-sm text-gray-500">Total CO₂ Saved (kg)</p>
                                </div>
                                {/* ... other stats ... */}
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* 2. Active Challenges */}
            <section className="py-12 max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8 text-green-700">Active Challenges</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {loadingChallenges
                        ? <SkeletonLoader count={4} type="card" />
                        : challenges.map(challenge => (
                            <ChallengeCard key={challenge._id} challenge={challenge} />
                        ))
                    }
                </div>
            </section>

            <hr className="my-8"/>

            {/* Static: Why Go Green? */}
            {renderWhyGoGreen()}

            <hr className="my-8"/>

            {/* 3. Recent Tips & 4. Upcoming Events */}
            <section className="py-12 max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12">
                <div>
                    <h2 className="text-3xl font-bold mb-6 text-green-700">Recent Tips</h2>
                    <div className="space-y-4">
                        {loadingTips
                            ? <SkeletonLoader count={5} type="list" />
                            : tips.map(tip => (
                                <TipCard key={tip._id} tip={tip} />
                            ))
                        }
                    </div>
                </div>
                <div>
                    <h2 className="text-3xl font-bold mb-6 text-green-700">Upcoming Events</h2>
                    <div className="space-y-4">
                        {loadingEvents
                            ? <SkeletonLoader count={4} type="list" />
                            : events.map(event => (
                                <EventCard key={event._id} event={event} />
                            ))
                        }
                    </div>
                </div>
            </section>

            <hr className="my-8"/>

            {/* Static: How It Works */}
            {renderHowItWorks()}
        </div>
    );
};

export default Home;