// src/components/EventCard.jsx
import React from 'react';
import { motion } from 'framer-motion';

export default function EventCard({ event, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: 'easeOut',
      }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      className="flex flex-col h-full p-5 bg-blue-50 border border-blue-200 rounded-xl shadow-sm hover:shadow-lg transition-all"
    >
      {/* Title */}
      <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
        {event.title}
      </h3>

      {/* Date & Location */}
      <p className="text-sm text-blue-600 mb-3">
        {new Date(event.date).toLocaleString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}{' '}
        • {event.location}
      </p>

      {/* Description (truncated) */}
      <p className="text-sm text-gray-700 flex-1 line-clamp-3 mb-4">
        {event.description}
      </p>

      {/* Footer: Organizer + Participants */}
      <div className="flex justify-between items-center mt-auto text-xs">
        <span className="text-gray-500 font-medium">{event.organizer}</span>
        <span className="font-semibold text-blue-700">
          {event.currentParticipants || 0}/{event.maxParticipants}
        </span>
      </div>
    </motion.article>
  );
}