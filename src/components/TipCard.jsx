import React from 'react';
import { FaArrowUp, FaRegClock, FaUser } from 'react-icons/fa';
import moment from 'moment';

const TipCard = ({ tip }) => {
  return (
    <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-300 flex justify-between items-center">
      <div className="flex-grow">
        <h4 className="text-lg font-semibold text-gray-800 line-clamp-1">{tip.title}</h4>
        <div className="flex items-center space-x-3 text-sm text-gray-500 mt-1">
          <span className="flex items-center space-x-1">
            <FaUser className="text-green-500 w-3 h-3" />
            <span className="font-medium">{tip.authorName}</span>
          </span>
          <span className="flex items-center space-x-1">
            <FaRegClock className="w-3 h-3" />
            <span>{moment(tip.createdAt).fromNow()}</span>
          </span>
        </div>
      </div>
      
      {/* Upvotes Counter */}
      <div className="flex items-center space-x-1 ml-4 shrink-0 text-right">
        <FaArrowUp className="text-green-600 w-4 h-4" />
        <span className="text-xl font-bold text-green-700">{tip.upvotes}</span>
      </div>
    </div>
  );
};

export default TipCard;