// client/src/pages/AddChallenge.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';

const categories = [
    "Waste Reduction", "Energy Conservation", "Water Conservation",
    "Sustainable Transport", "Green Living", "Food Sustainability"
];

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const AddChallenge = () => {
    const { token, successToast, errorToast } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '', category: categories[0], description: '',
        duration: 30, target: '', impactMetric: 'kg plastic saved',
        startDate: '', endDate: '', imageUrl: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!token) {
            errorToast("You must be logged in to add a challenge.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/challenges`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            successToast('Challenge added successfully!');
            setLoading(false);
            navigate(`/challenges/${response.data.challenge._id}`);
            
        } catch (error) {
            console.error('Error adding challenge:', error);
            errorToast(error.response?.data?.message || 'Failed to add challenge.');
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white shadow-2xl rounded-xl my-10">
            <h1 className="text-3xl font-bold text-center mb-6 text-green-700">Create a New Challenge 🚀</h1>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Challenge Title */}
                <div className="md:col-span-2">
                    <label className="input-label" htmlFor="title">Title <span className="text-red-500">*</span></label>
                    <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required className="input-field" />
                </div>

                {/* Category */}
                <div>
                    <label className="input-label" htmlFor="category">Category <span className="text-red-500">*</span></label>
                    <select id="category" name="category" value={formData.category} onChange={handleChange} required className="input-field">
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>

                {/* Impact Metric */}
                <div>
                    <label className="input-label" htmlFor="impactMetric">Impact Metric</label>
                    <input type="text" id="impactMetric" name="impactMetric" value={formData.impactMetric} onChange={handleChange} placeholder="e.g., kg plastic saved" className="input-field" />
                </div>

                {/* Duration */}
                <div>
                    <label className="input-label" htmlFor="duration">Duration (Days)</label>
                    <input type="number" id="duration" name="duration" value={formData.duration} onChange={handleChange} min="1" className="input-field" />
                </div>

                {/* Target */}
                <div>
                    <label className="input-label" htmlFor="target">Target Goal</label>
                    <input type="text" id="target" name="target" value={formData.target} onChange={handleChange} placeholder="e.g., Avoid 100 single-use items" className="input-field" />
                </div>

                {/* Start Date */}
                <div>
                    <label className="input-label" htmlFor="startDate">Start Date <span className="text-red-500">*</span></label>
                    <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} required className="input-field" />
                </div>

                {/* End Date */}
                <div>
                    <label className="input-label" htmlFor="endDate">End Date <span className="text-red-500">*</span></label>
                    <input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} required className="input-field" />
                </div>

                {/* Image URL */}
                <div className="md:col-span-2">
                    <label className="input-label" htmlFor="imageUrl">Image URL</label>
                    <input type="url" id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://example.com/image.jpg" className="input-field" />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                    <label className="input-label" htmlFor="description">Description <span className="text-red-500">*</span></label>
                    <textarea id="description" name="description" rows="4" value={formData.description} onChange={handleChange} required className="input-field"></textarea>
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2 mt-4">
                    <button 
                        type="submit" 
                        disabled={loading}
                        className={`w-full py-3 rounded-lg font-bold transition flex items-center justify-center space-x-2 ${
                            loading ? 'bg-green-300 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'
                        }`}
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">...</svg>
                                <span>Adding Challenge...</span>
                            </>
                        ) : (
                            <span>Create Challenge</span>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddChallenge;

// **Helper CSS Classes (Assume defined in index.css)**
// .input-label { @apply block text-sm font-semibold text-gray-700 mb-1; }
// .input-field { @apply w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500; }