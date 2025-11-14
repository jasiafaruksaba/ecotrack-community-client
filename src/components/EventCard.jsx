import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import moment from 'moment';

const EventCard = ({ event }) => {
  return (
    <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-300 flex space-x-4">
      
      {/* Date Block */}
      <div className="flex flex-col items-center justify-center text-center p-2 bg-green-100 text-green-700 rounded-md shrink-0 w-16 h-16">
        <span className="text-xl font-bold leading-none">{moment(event.date).format('DD')}</span>
        <span className="text-xs uppercase">{moment(event.date).format('MMM')}</span>
      </div>

      <div className="flex-grow">
        <h4 className="text-lg font-bold text-gray-800 line-clamp-1">{event.title}</h4>
        <p className="text-sm text-gray-600 line-clamp-2 mb-1">{event.description}</p>
        
        {/* Details */}
        <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
          <span className="flex items-center space-x-1">
            <FaMapMarkerAlt className="w-3 h-3 text-green-500" />
            <span>{event.location}</span>
          </span>
          <span className="flex items-center space-x-1">
            <FaCalendarAlt className="w-3 h-3 text-green-500" />
            <span>{moment(event.date).format('h:mm A')}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;