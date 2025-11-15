// src/components/ChallengeCard.jsx
import React from 'react';
import { Link } from 'react-router'; // সঠিক ইমপোর্ট
import { motion } from 'framer-motion';

export default function ChallengeCard({ challenge, index = 0 }) {
  const participants = challenge.participants || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: 'easeOut',
      }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      className="flex flex-col h-full bg-blue-50 border border-blue-200 rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden"
    >
      {/* Image */}
      {challenge.imageUrl && (
        <div className="h-48 w-full overflow-hidden">
          <img
            src={challenge.imageUrl}
            alt={challenge.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex-1 p-5 flex flex-col">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
          {challenge.title}
        </h3>

        <p className="text-sm text-blue-600 mb-3 font-medium">
          {challenge.category} • {challenge.duration} days
        </p>

        <p className="text-sm text-gray-700 flex-1 line-clamp-3 mb-4">
          {challenge.description}
        </p>

        {/* Footer: View + Participants Link */}
        <div className="flex items-center justify-between mt2 mt-auto">
          {/* View Challenge */}
          <Link
            to={`/challenges/${challenge._id}`}
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
          >
            View Challenge
          </Link>

          {/* Participants Link */}
          <Link
            to={`/challenges/${challenge._id}/participants`}
            className="text-sm font-bold text-green-600 hover:text-green-700 hover:underline transition-all flex items-center gap-1"
            title={`See who joined ${challenge.title}`}
          >
            <span className="text-lg">People</span> {participants} joined
          </Link>
        </div>
      </div>
    </motion.div>
  );
}