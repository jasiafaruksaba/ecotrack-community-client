// client/src/pages/Challenge.jsx
import React, { useState } from 'react';
import useFetch from '../hooks/useFetch';
import ChallengeCard from '../components/challengeCard';
import SkeletonLoader from '../components/SkeletonLoader';
import { FaFilter, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router';

const categories = [
  "Waste Reduction", "Energy Conservation", "Water Conservation",
  "Sustainable Transport", "Green Living"
];

const Challenges = () => {
  const [filters, setFilters] = useState({
    category: '',
    search: ''
  });

  // Construct query string based on state
  const queryString = new URLSearchParams(filters).toString();
  const { data: challenges, loading } = useFetch(`/challenges?${queryString}`, []);

  const handleChange = (e) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleReset = () => {
    setFilters({ category: '', search: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Page Header and Add Button */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-green-700">Explore Challenges</h1>
        <Link to="/challenges/add" className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
          <FaPlus />
          <span className="hidden sm:inline">Add New</span>
        </Link>
      </div>

      {/* Filter and Search Section (Responsive Grid) */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        
        {/* Category Filter */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            id="category"
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Search Input */}
        <div className="md:col-span-2">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search Title/Description</label>
          <input
            type="text"
            id="search"
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="Search by keyword..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button 
            onClick={handleReset} 
            className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            Reset
          </button>
          <button 
            // Submitting the form or just rely on useFetch hook dependency update
            className="w-full md:w-auto px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition flex items-center justify-center space-x-2"
          >
            <FaFilter />
            <span>Apply</span>
          </button>
        </div>
      </div>

      {/* Challenge Grid (Responsive layout) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {loading ? (
          <SkeletonLoader count={8} type="card" />
        ) : challenges.length > 0 ? (
          challenges.map(challenge => (
            <ChallengeCard key={challenge._id} challenge={challenge} />
          ))
        ) : (
          <div className="md:col-span-4 text-center py-10 bg-gray-100 rounded-xl">
            <p className="text-xl text-gray-600">No challenges found matching your criteria.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Challenges;