// client/src/components/ChallengeCard.jsx
import React from 'react';
import { Link } from 'react-router';
import { FaUserFriends, FaRegClock } from 'react-icons/fa';

const ChallengeCard = ({ challenge }) => {
  const { _id, title, category, description, duration, participants, imageUrl } = challenge;
  
  // Ensure all cards are equal height and width using Tailwind utilities
  return (
    <div className="bg-white border rounded-xl shadow-lg hover:shadow-xl transition duration-300 flex flex-col h-full overflow-hidden">
      
      {/* Image (Uniform size) */}
      <div className="w-full h-48 overflow-hidden">
        <img 
          src={imageUrl || 'https://via.placeholder.com/600x400/10B981/FFFFFF?text=EcoTrack'} 
          alt={title} 
          className="w-full h-full object-cover" 
        />
      </div>

      <div className="p-5 flex flex-col flex-grow">
        {/* Category Tag */}
        <span className="text-xs font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full mb-2 self-start">
          {category}
        </span>

        {/* Title (Consistent Heading Style) */}
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
          {title}
        </h3>

        {/* Short Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
          {description}
        </p>

        {/* Metrics */}
        <div className="flex justify-between items-center text-sm text-gray-500 border-t pt-3 mt-auto">
          <div className="flex items-center space-x-1">
            <FaRegClock className="text-green-500" />
            <span>{duration} Days</span>
          </div>
          <div className="flex items-center space-x-1">
            <FaUserFriends className="text-green-500" />
            <span>{participants} Joined</span>
          </div>
        </div>
      </div>
      
      {/* CTA Button (Same style as on home page) */}
      <Link 
        to={`/challenges/${_id}`}
        className="block text-center w-full py-3 bg-green-600 text-white font-semibold hover:bg-green-700 transition rounded-b-xl"
      >
        View Challenge
      </Link>
    </div>
  );
};

export default ChallengeCard;