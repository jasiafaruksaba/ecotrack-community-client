// src/components/TipCard.jsx
import React from 'react';
import { motion } from 'framer-motion'; // অ্যানিমেশনের জন্য

export default function TipCard({ tip, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }} // শুরুতে অদৃশ্য + নিচে
      animate={{ opacity: 1, y: 0 }}   // উপরে উঠবে
      transition={{
        duration: 0.6,
        delay: index * 0.1, // প্রতিটি কার্ড আলাদা সময়ে উঠবে
        ease: 'easeOut',
      }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl shadow-sm hover:shadow-md transition-all"
    >
      {/* Icon */}
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-700 font-bold text-lg">
        {tip.category?.[0] || 'T'}
      </div>

      {/* Content */}
      <div className="flex-1">
        <h4 className="text-base font-semibold text-gray-800 mb-1 line-clamp-1">
          {tip.title}
        </h4>
        <p className="text-xs text-gray-500">
          {tip.authorName} • {new Date(tip.createdAt).toLocaleDateString('en-GB')}
        </p>
      </div>

      {/* Upvotes */}
      <div className="text-right">
        <span className="text-sm font-medium text-green-600">
          {tip.upvotes || 0} <span className="text-lg">Upvote</span>
        </span>
      </div>
    </motion.article>
  );
}