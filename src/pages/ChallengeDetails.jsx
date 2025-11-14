// client/src/pages/ChallengeDetails.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import useFetch from '../hooks/useFetch';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { FaUserFriends, FaRegClock, FaCalendarAlt, FaLeaf } from 'react-icons/fa';
import moment from 'moment';
import Spinner from '../components/Spinner'; // Assume you have a Spinner component

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const ChallengeDetails = () => {
    const { id } = useParams();
    const { token, user, successToast, errorToast } = useAuth();
    const navigate = useNavigate();
    
    const { data: challenge, loading, error } = useFetch(`/challenges/${id}`, null);
    const [joinLoading, setJoinLoading] = useState(false);

    // If challenge is null (404/not loaded) but not loading
    if (loading) {
        return <div className="min-h-screen flex items-center justify-center"><Spinner /></div>;
    }

    if (error || !challenge) {
        return <div className="max-w-4xl mx-auto p-8 text-center text-red-600">Challenge not found.</div>;
    }

    const handleJoinChallenge = async () => {
        if (!user) {
            errorToast("Please log in to join this challenge.");
            navigate('/login', { state: { from: `/challenges/join/${id}` } });
            return;
        }
        
        setJoinLoading(true);
        try {
            await axios.post(`${API_BASE_URL}/challenges/join/${id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            successToast(`Successfully joined "${challenge.title}"!`);
            setJoinLoading(false);
            navigate('/my-activities'); 

        } catch (err) {
            console.error('Join error:', err);
            errorToast(err.response?.data?.message || 'Failed to join challenge.');
            setJoinLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 my-8">
            {/* Header Section */}
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                <div className="h-64 md:h-96 w-full relative">
                    <img 
                        src={challenge.imageUrl || 'https://via.placeholder.com/1200x400/10B981/FFFFFF?text=EcoTrack+Challenge'} 
                        alt={challenge.title} 
                        className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-6">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white">{challenge.title}</h1>
                    </div>
                </div>

                <div className="p-6 md:p-8">
                    
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 border-b pb-4">
                        {/* Metrics and Info */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center md:text-left text-sm font-medium">
                            <InfoBox icon={FaRegClock} label="Duration" value={`${challenge.duration} Days`} />
                            <InfoBox icon={FaUserFriends} label="Participants" value={challenge.participants} />
                            <InfoBox icon={FaCalendarAlt} label="Starts" value={moment(challenge.startDate).format('MMM DD, YY')} />
                            <InfoBox icon={FaLeaf} label="Category" value={challenge.category} />
                        </div>

                        {/* Join Button */}
                        <button 
                            onClick={handleJoinChallenge}
                            disabled={joinLoading}
                            className={`mt-4 md:mt-0 px-6 py-3 rounded-lg font-bold transition w-full md:w-auto shrink-0 ${
                                joinLoading ? 'bg-green-300 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'
                            }`}
                        >
                            {joinLoading ? 'Joining...' : 'Join Challenge Now'}
                        </button>
                    </div>

                    {/* Description and Details */}
                    <div className="space-y-6">
                        <section>
                            <h2 className="text-2xl font-bold text-green-700 mb-3">About the Challenge</h2>
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{challenge.description}</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-green-700 mb-3">Target & Impact</h2>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                <li>**Goal:** {challenge.target}</li>
                                <li>**Impact Tracked:** {challenge.impactMetric}</li>
                                <li>**End Date:** {moment(challenge.endDate).format('LL')}</li>
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper Component for Info Boxes
const InfoBox = ({ icon: Icon, label, value }) => (
    <div className="flex flex-col items-center md:items-start space-y-1">
        <Icon className="text-green-500 w-5 h-5" />
        <span className="text-gray-500">{label}</span>
        <span className="text-gray-800 font-bold">{value}</span>
    </div>
);

export default ChallengeDetails;